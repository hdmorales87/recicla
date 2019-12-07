//llamamos la conexion
var connection = require('../bd/bd');  
var md5 = require('md5');
var fs = require('fs');

//creamos un objeto para ir almacenando todo lo que necesitemos
var UserModel = {};

//AUTENTICACION DEL USUARIO
UserModel.getLogin = function(userData, callback) {
    if (connection) {//si es la empresa de origen
        var sql = `SELECT * FROM users 
                   WHERE activo = 1
                        AND id_empresa = \'`+userData.empresa+`\' 
                        AND email = \'`+userData.username+`\' 
                        AND password = \'`+md5(userData.password)+'\'';

        connection.query(sql, function(error, row) {
            if (error) {                
                callback(null, {
                    "msg": "error",
                    "detail": error.code
                });
            } else {//si es superusuario podra acceder a todas                                
                if(row.length > 0){
                    callback(null, row);                    
                }
                else{
                    var sql = `SELECT * FROM users 
                               WHERE activo=1
                                   AND email = \'`+userData.username+`\' 
                                   AND password = \'`+md5(userData.password)+'\'';

                    connection.query(sql, function(error, row) {
                        if (error) {                          
                            callback(null, {
                                "msg": "error",
                                "detail": error.code
                            });                
                        }
                        else{
                            if(row.length > 0){
                                if(row[0].id_rol == 1){//superusuario
                                    callback(null, row);
                                }
                                else{// si tiene acceso a la empresa
                                    var sql = `SELECT COUNT(id) AS total
                                               FROM users_companies 
                                               WHERE id_user = \'`+row[0].id+`\' 
                                                   AND id_company = \'`+userData.empresa+'\'';

                                    connection.query(sql, function(error, row2) {
                                        if (error) {                          
                                            callback(null, {
                                                "msg": "error",
                                                "detail": error.code
                                            });                
                                        }
                                        else{
                                            if(row2[0].total > 0){
                                                callback(null, row);
                                            }
                                            else{
                                                callback(null, {
                                                    "msg": "accessDenied",                                   
                                                }); 
                                            }
                                        }
                                    });
                                }
                            }
                            else{
                                callback(null, {
                                    "msg": "notExist",                                   
                                }); 
                            }                            
                        }
                    });
                }                
            }
        });
    }
}

UserModel.checkUsername = function(username, callback) {
    if (connection) {
        var sqlExists = 'SELECT COUNT(*) AS cuenta FROM users WHERE activo = 1 AND email = ' + connection.escape(username);
        connection.query(sqlExists, function(err, row) {
            if(err){
                callback(null, {
                    "msg": "error"
                });
            } 
            else if (row[0].cuenta > 0) {
                callback(null, {
                    "msg": "true"
                });
            } else {
                callback(null, {
                    "msg": "false"
                });
            }
        });
    }
}

UserModel.updateToken = function(username,token, callback) {
    if (connection) {
        var sql = 'UPDATE users SET token = '+ connection.escape(token)+' WHERE activo = 1 AND email = '+ connection.escape(username);
        connection.query(sql, function(err, row) { 
            if(err){
                callback(null, {
                    "msg"  : "error",
                    detail : err.code
                });
            } else {
                callback(null, {
                    "msg": "success"
                });
            }
        });
    }
}

UserModel.checkToken = function(username,token, callback) {
    if (connection) {
        var sqlExists = 'SELECT COUNT(*) AS cuenta FROM users WHERE activo = 1 AND email = ' + connection.escape(username)+' AND token = '+ connection.escape(token);
        connection.query(sqlExists, function(err, row) { 
            if(err){
                callback(null, {
                    "msg"    : "error",
                    "detail" : err.code
                });
            } 
            else if (row[0].cuenta > 0) {
                callback(null, {
                    "msg": "true"
                });
            } else {
                callback(null, {
                    "msg": "false"
                });
            }
        });
    }
}

UserModel.updatePassword = function(username,password, callback) {    
    if (connection) {        
        var sql = 'UPDATE users SET token=\'\',password = \''+md5(password)+'\' WHERE activo = 1 AND email = '+ connection.escape(username);      
        connection.query(sql, function(err, row) { 
            if(err){
                callback(null, {
                    "msg"  : "error",
                    detail : err.code
                });
            } else {
                callback(null, {
                    "msg": "success"
                });
            }
        });
    }
}

UserModel.uploaderFile = function(entrada,req, callback) {    
    if (connection) {    
        var objField = {};
        entrada.parse(req);             
        entrada.uploadDir = "./public/";//directorio de subida  
        entrada.on('fileBegin',(field, file) => {                 
            file.path = "./public/hola"+file.name;//guardado temporal 
            objField['fileName'] = file.name; 
        }); 
        entrada.on('field', function(name, value) {//obtener demas campos del formulario 
            objField[name] = value;  
        });
        entrada.on('file', function(field, file) {//se recibio el archivo
            //renombrar archivo            
            var filename = file.name;
            var i = filename.lastIndexOf('.');
            var ext = (i < 0) ? '' : filename.substr(i); 
            filename = objField.id+ext; 

            fs.rename(file.path, entrada.uploadDir+objField.folder+filename,function(err) {
                if (err) {
                    callback(null, {
                        "msg"  : "error",
                        detail : err.code
                    })
                } else {
                    //guardar datos de la imagen en la base de datos
                    objField['fileName'] = filename;
                    var sql = 'UPDATE '+objField.table+' SET '+objField.field+'=\''+objField.fileName+'\' WHERE id = '+ objField.id;      
                    connection.query(sql, function(err, row) { 
                        if(err){
                            callback(null, {
                                "msg"  : "error",
                                detail : err.code
                            });
                        } else {
                            callback(null, {
                                "msg"    : "success",
                                "detail" : objField.fileName
                            });
                        }
                    });
                }
            });                     
        }); 
        entrada.on('end', function(){          
            //...                       
        });
        entrada.on('error', function(err) {
            callback(null, {
                    "msg"    : "error",
                    "detail" : err.code
                });
        });
    }
}

//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = UserModel;