//llamamos la conexion

var UserModel  = require('./User');
var configJSON = require('./configJSON.json');
var nodemailer = require('nodemailer');
var connection = require('../bd/bd');
var base64     = require('base-64');
var os         = require("os");

const urlPath  = configJSON.urlLinks;

const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'warrior1987@gmail.com',
            pass: 'erika1987'
        }
    }); 

const from = 'Hector Morales <warrior1987@gmail.com>';

//creamos un objeto para ir almacenando todo lo que necesitemos
var MailerModel = {};


//AUTENTICACION DEL USUARIO
MailerModel.sendEmailPassword = function(userData, callback) {

    var date  = new Date();
    var token = base64.encode(date);
    var user  = base64.encode(userData);

    UserModel.checkUsername(userData, function(error, data) {        
        if(error) {
            callback(null, {
                "msg": "error",
                "detail": error.code
            });           
        } else {
            if(data.msg == 'false'){                
                callback(null, {
                    "msg": "not_found",                        
                });                 
            } 
            else{
                UserModel.updateToken(userData,token, function(error, data) { 
                    if(error) {
                        callback(null, {
                            "msg": "error",
                            "detail": error.code
                        });  
                    }         
                    else {
                        // Definimos el transporter
                        var cuerpoMail = `<div style="background:#efefef;width:100%;height:100%;overflow:hidden">
                                             <div class="adM">
                                             </div>
                                             <div style="width:calc(100% - 40px);max-width:600px;height:45px;padding:20px;margin:0 auto">
                                                <div class="adM">
                                                </div>
                                                <img src="cid:uniq-logoMailer.png" style="width:250px" class="CToWUd">
                                             </div>
                                             <div style="width:calc(100% - 60px);max-width:600px;height:auto;padding:20px;margin:20px auto;background-color:#fff;border-radius:5px">
                                                <h1 style="font-family:'Roboto',sans-serif;font-size:30px">Restablecer su password</h1>
                                                <hr style="margin:0 0 20px 0">
                                                <div style="font-family:'Roboto',sans-serif;font-size:14px;color:#666">Está recibiendo este correo electrónico porque solicitó un restablecimiento de password para su cuenta.<br><br>Por favor, de click en el botón de abajo para elegir un nuevo password.</div>
                                                <div style="margin-top:40px">
                                                    <a href="`+urlPath+`/resetPassword/`+token+`/`+user+`" style="text-decoration:none;font-family:'Roboto',sans-serif;background-color:`+configJSON.btnRstPasswdColor+`;padding:10px 20px;color:#fff;font-size:16px;border-radius:5px" target="_blank">
                                                        Nuevo Password
                                                    </a>
                                                    <div class="yj6qo"></div>
                                                    <div class="adL">
                                                    </div>
                                                </div>
                                                <div class="adL">
                                                </div>
                                             </div>
                                             <div class="adL">
                                             </div>
                                         </div>`;
                        
                        // Definimos el email
                        var mailOptions = {
                            from: from,
                            to: userData,
                            subject: 'Solicitud de restauracion de password',
                            html: cuerpoMail,
                            attachments: [
                                {
                                    filename: 'logoMailer.png',
                                    path: 'images/logoMailer.png',
                                    cid: 'uniq-logoMailer.png' 
                                }
                            ]
                        };
                        // Enviamos el email
                        transporter.sendMail(mailOptions, function(error, info){
                            if (error){            
                                callback(null, {
                                    "msg": "error",
                                    "detail": error.code
                                });            
                            } else {            
                                callback(null, {
                                    "msg": "success"
                                });           
                            }
                        });
                    }
                });
            }           
        }            
    });
    
    
};

//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = MailerModel;