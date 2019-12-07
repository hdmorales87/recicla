var UserModel = require('../models/User');
var DataGridModel = require('../models/DataGrid');
var PurchaseModel = require('../models/Purchase');
var SaleModel = require('../models/Sale');
var RoleModel = require('../models/Role');
var MailerModel = require('../models/Mailer');
var CompanyModel = require('../models/Company');
var formidable = require('formidable');

//creamos el ruteo de la aplicación
module.exports = function(app) {
    
    /*
     * metodo: /
     * prueba de la API
     */

    app.get('/', function(req, res) {   		
   		res.send("API trabajando!");
	});

    /*
     * metodo: login
     * inicia la sesion del usuario 
     */

     //valida si la empresa existe
    app.get("/validaEmpresa/:empresa", function(req, res) {
        //id del usuario       
        var empresa = req.params.empresa;      
      
        //continuamos si la id es un número
        if (empresa != undefined) {
            CompanyModel.getCompany(empresa, function(error, data) {
                
                if(data.msg == 'error'){
                    res.status(200).json({
                        "msg": "error",
                        "detail": data.detail
                    }); 
                }
                //si el usuario existe lo mostramos en formato json
                else if (typeof data !== 'undefined' && data.length > 0) {                  
                    var id_empresa = data[0].id;  
                    res.status(200).json(data);                    
                }                
                //en otro caso mostramos una respuesta conforme no existe
                else {
                    res.status(200).json({
                        "msg": "notExist"
                    });
                }
            });
        }
        //si hay algún error
        else {
            res.json(500, {
                "msg": "Error"
            });
        }
    });

    //obtiene un usuario por su id
    app.get("/login/:empresa/:username/:password", function(req, res) {
        //id del usuario
        var empresa  = req.params.empresa;
        var username = req.params.username;
        var password = req.params.password;

        var user = {
            empresa  : empresa,
            username : username,
            password : password
        };

        //continuamos si la id es un número
        if (username != undefined) {
            UserModel.getLogin(user, function(error, data) {
                if(data.length > 0 && data.msg != 'error' && data.msg != 'notExist' && data.msg != 'accessDenied'){
                    var id_usuario = data[0].id;                    
                    req.session.id_usuario=id_usuario;                    
                    req.session.save(function(err) {
                        //console.log(req.session.id_usuario); 
                    });
                }
                res.status(200).json(data);
            });
        }
        //si hay algún error
        else {
            res.json(500, {
                "msg": "Error"
            });
        }
    });

    /*
     * metodo: checkSession
     * chequea si la sesion esta activa 
     */

    app.get('/checkSession', function(req, res) { 
        if(req.session.id_usuario) {
            res.status(200).json({
                "session": "true"
            });
        }
        else{
            res.status(200).json({
                "session": "false"
            });
        }
    });

    /*
     * metodo: logout
     * cierra la sesion activa 
     */

    app.get('/logout',function(req,res){
        req.session.destroy(function(err) {
            if(err) {
                res.status(200).json({
                    "msg": "error", 
                    "detail" : err.code                  
                });
            } else {
                res.status(200).json({
                    "msg": "success"
                });
            }
        })
    });    

     /*
     * metodo: dataGrid
     * tipo: GET
     * devuelve todos los registros 
     */

    app.get("/dataGrid", function(req, res) {              
        DataGridModel.getData(req.query, function(error, data) {
            if(error) {
                res.status(200).json({
                    "msg": "error", 
                    "detail" : error.code                  
                });
            } else {
                if(data.msg == 'error'){
                    res.status(200).json({
                        "msg": "error",
                        "detail": data.detail
                    }); 
                }
                else{
                    res.status(200).json(data);
                }                
            }            
        });
    });   

    /*
     * metodo: dataGrid
     * tipo: POST
     * inserta un nuevo tipo de documento
     */

    app.post("/dataGrid", function(req, res) {        
        //creamos un objeto con los datos a insertar        
        var arrayData = req.body.arrayData;  
        var tabla = req.body.tabla;      
        DataGridModel.insertData(arrayData,tabla, function(error, data) {
            //si el usuario se ha insertado correctamente mostramos su info
            if (data && data.insertId) {
                res.status(200).json({
                    "msg": "success"
                });
            } else {
                res.status(200).json({
                    "msg": "error",
                    "detail": data.detail
                });
            }
        });
    });


    app.put("/dataGrid", function(req, res) {
        //almacenamos los datos del formulario en un objeto
        var arrayData = req.body.arrayData;  
        var tabla = req.body.tabla; 
        DataGridModel.updateData(arrayData,tabla,function(error, data) {
            //si el usuario se ha actualizado correctamente mostramos un mensaje            
            if(data.msg == 'success'){
                res.status(200).json({
                    "msg": "success"
                });
            } else {
                res.status(200).json({
                    "msg": "error",
                    "detail": data.detail
                });
            }
        });
    });

    //utilizamos el verbo delete para eliminar un registro
    app.delete("/dataGrid", function(req, res) {
        //id del registro a eliminar        
        var id = req.body.id;
        var tabla = req.body.tabla;       
        DataGridModel.deleteData(id,tabla, function(error, data) {
            if(data.msg == 'success'){
                res.status(200).json({
                    "msg": "success"
                });
            } 
            else {
                res.status(200).json({
                    "msg": "error",
                    "detail": data.detail
                });
            }
        });
    });       

    /*
     *  emailPassword
     *  tipo: POST
     *  envia el mail del password     
     */

    //utilizamos el verbo post para enviar un correo
    app.post("/emailPassword", function(req, res) {
        //email del usuario a enviar correo
        var email = req.body.email;  

        MailerModel.sendEmailPassword(email, function(error, data) {
            if(data.msg == 'success'){
                res.status(200).json({
                    "msg": "success"
                });
            }
            else if(data.msg == 'not_found'){
                res.status(200).json({
                    "msg": "not_found"
                });
            } else if(data.msg == 'error') {
                res.status(200).json({
                    "msg": "error",
                    "detail": data.detail
                });
            }            
        });
    });

    /*
     *  checkToken
     *  tipo: POST
     *  chequea si el token del usuario es valido   
     */

    //utilizamos el verbo post para consultar
    app.post("/checkToken", function(req, res) {
        //email del usuario a enviar correo
        var email = req.body.email; 
        var token = req.body.token;  

        UserModel.checkToken(email,token, function(error, data) {
            if(data.msg == 'error') {
                res.status(200).json({
                    "msg": "error",
                    "detail": data.detail
                });
            }
            else {
                res.status(200).json({
                    "msg": data.msg
                });
            }            
        });
    });

    /*
     *  updatePassword
     *  tipo: POST
     *  actualiza el password del usuario   
     */

    //utilizamos el verbo post para consultar
    app.post("/updatePassword", function(req, res) {
        //email del usuario y password
        var email = req.body.email; 
        var pass  = req.body.password;  

        UserModel.updatePassword(email,pass, function(error, data) {
            if(data.msg == 'error') {
                res.status(200).json({
                    "msg": "error",
                    "detail": data.detail
                });
            }
            else {
                res.status(200).json({
                    "msg": data.msg
                });
            }            
        });
    });

    /*
     *  uploadImageUser
     *  tipo: POST
     *  actualiza la foto del usuario   
     */

    //utilizamos el verbo post para enviar
    app.post("/uploaderFile", function(req, res) {
        var entrada=new formidable.IncomingForm();              
        //manejo del envio de imagen
        UserModel.uploaderFile(entrada, req, function(error, data) {
            if(error) {
                res.status(200).json({
                    "msg": "error", 
                    "detail" : error.code                  
                });
            } 
            else{                
                res.status(200).json({
                    "msg"    : data.msg,
                    "detail" : data.detail
                });                 
            }        
        });
    });       

    /*
     * metodo: listadoPermisos
     * tipo: GET
     * devuelve el listado de permisos del aplicativo
     */

    app.get("/listadoPermisos", function(req, res) {              
        RoleModel.getPermisos(req.query, function(error, data) {
            if(error) {
                res.status(200).json({
                    "msg": "error", 
                    "detail" : error.code                  
                });
            } else {
                if(data.msg == 'error'){
                    res.status(200).json({
                        "msg": "error",
                        "detail": data.detail
                    }); 
                }                
                else{
                    res.status(200).json(data);
                }                
            }            
        });
    });

    /*
     * metodo: guardaPermisos
     * tipo: GET
     * guarda los permisos para el rol
     */

    app.post("/guardaPermisos", function(req, res) {        
        //creamos un objeto con los datos a insertar
        var formData = req.body;
          
        RoleModel.guardaPermisos(formData, function(error, data) {
            //si el usuario se ha insertado correctamente mostramos su info
            if (data && data.insertId) {
                res.status(200).json({
                    "msg": "success"
                });
            } else {
                res.status(200).json({
                    "msg": "error",
                    "detail": data.detail
                });
            }
        });
    });

    /*
     * metodo: validarPermiso
     * tipo: GET
     * valida si el funcionario tiene el permiso
     */

    app.get("/validarPermiso", function(req, res) {              
        RoleModel.validarPermiso(req.query, function(error, data) {
            if(error) {
                res.status(200).json({
                    "msg": "error", 
                    "detail" : error.code                  
                });
            } else {
                if(data.msg == 'error'){
                    res.status(200).json({
                        "msg": "error",
                        "detail": data.detail
                    }); 
                }                
                else{
                    res.status(200).json(data);
                }                
            }            
        });
    });  

    /*
     * metodo: indicadorCompras
     * tipo: GET
     * trae el indicador de compras
     */

    app.get("/indicadorCompras1", function(req, res) {              
        PurchaseModel.indicadorCompras1(req.query, function(error, data) {
            if(error) {
                res.status(200).json({
                    "msg": "error", 
                    "detail" : error.code                  
                });
            } else {
                if(data.msg == 'error'){
                    res.status(200).json({
                        "msg": "error",
                        "detail": data.detail
                    }); 
                }                
                else{
                    res.status(200).json(data);
                }                
            }            
        });
    });

    /*
     * metodo: indicadorVentas
     * tipo: GET
     * trae el indicador de ventas
     */

    app.get("/indicadorVentas1", function(req, res) {              
        SaleModel.indicadorVentas1(req.query, function(error, data) {
            if(error) {
                res.status(200).json({
                    "msg": "error", 
                    "detail" : error.code                  
                });
            } else {
                if(data.msg == 'error'){
                    res.status(200).json({
                        "msg": "error",
                        "detail": data.detail
                    }); 
                }                
                else{
                    res.status(200).json(data);
                }                
            }            
        });
    });

    /*
     * metodo: indicadorGraficoCompras
     * tipo: GET
     * trae el indicador de compras
     */

    app.get("/indicadorGraficoCompras1", function(req, res) {              
        PurchaseModel.indicadorGraficoCompras1(req.query, function(error, data) {
            if(error) {
                res.status(200).json({
                    "msg": "error", 
                    "detail" : error.code                  
                });
            } else {
                if(data.msg == 'error'){
                    res.status(200).json({
                        "msg": "error",
                        "detail": data.detail
                    }); 
                }                
                else{
                    res.status(200).json(data);
                }                
            }            
        });
    });

    /*
     * metodo: indicadorGraficoVentas
     * tipo: GET
     * trae el indicador de ventas
     */

    app.get("/indicadorGraficoVentas1", function(req, res) {              
        SaleModel.indicadorGraficoVentas1(req.query, function(error, data) {
            if(error) {
                res.status(200).json({
                    "msg": "error", 
                    "detail" : error.code                  
                });
            } else {
                if(data.msg == 'error'){
                    res.status(200).json({
                        "msg": "error",
                        "detail": data.detail
                    }); 
                }                
                else{
                    res.status(200).json(data);
                }                
            }            
        });
    });    

    /*
     * metodo: indicadorCompras
     * tipo: GET
     * trae el indicador de compras
     */

    app.get("/indicadorCompras2", function(req, res) {              
        PurchaseModel.indicadorCompras2(req.query, function(error, data) {
            if(error) {
                res.status(200).json({
                    "msg": "error", 
                    "detail" : error.code                  
                });
            } else {
                if(data.msg == 'error'){
                    res.status(200).json({
                        "msg": "error",
                        "detail": data.detail
                    }); 
                }                
                else{
                    res.status(200).json(data);
                }                
            }            
        });
    });

    /*
     * metodo: indicadorVentas
     * tipo: GET
     * trae el indicador de ventas
     */

    app.get("/indicadorVentas2", function(req, res) {              
        SaleModel.indicadorVentas2(req.query, function(error, data) {
            if(error) {
                res.status(200).json({
                    "msg": "error", 
                    "detail" : error.code                  
                });
            } else {
                if(data.msg == 'error'){
                    res.status(200).json({
                        "msg": "error",
                        "detail": data.detail
                    }); 
                }                
                else{
                    res.status(200).json(data);
                }                
            }            
        });
    });

    /*
     * metodo: indicadorGraficoCompras
     * tipo: GET
     * trae el indicador de compras
     */

    app.get("/indicadorGraficoCompras2", function(req, res) {              
        PurchaseModel.indicadorGraficoCompras2(req.query, function(error, data) {
            if(error) {
                res.status(200).json({
                    "msg": "error", 
                    "detail" : error.code                  
                });
            } else {
                if(data.msg == 'error'){
                    res.status(200).json({
                        "msg": "error",
                        "detail": data.detail
                    }); 
                }                
                else{
                    res.status(200).json(data);
                }                
            }            
        });
    });

    /*
     * metodo: indicadorGraficoVentas
     * tipo: GET
     * trae el indicador de ventas
     */

    app.get("/indicadorGraficoVentas2", function(req, res) {              
        SaleModel.indicadorGraficoVentas2(req.query, function(error, data) {
            if(error) {
                res.status(200).json({
                    "msg": "error", 
                    "detail" : error.code                  
                });
            } else {
                if(data.msg == 'error'){
                    res.status(200).json({
                        "msg": "error",
                        "detail": data.detail
                    }); 
                }                
                else{
                    res.status(200).json(data);
                }                
            }            
        });
    }); 

    /*
     * metodo: listadoAccesoEmpresas
     * tipo: GET
     * devuelve el listado de permisos del aplicativo
     */

    app.get("/listadoAccesoEmpresas", function(req, res) {              
        CompanyModel.listadoAccesoEmpresas(req.query, function(error, data) {
            if(error) {
                res.status(200).json({
                    "msg": "error", 
                    "detail" : error.code                  
                });
            } else {
                if(data.msg == 'error'){
                    res.status(200).json({
                        "msg": "error",
                        "detail": data.detail
                    }); 
                }                
                else{
                    res.status(200).json(data);
                }                
            }            
        });
    });      

    /*
     * metodo: guardaAccesoEmpresas
     * tipo: GET
     * guarda los accesos a las empresas para el usuario
     */

    app.post("/guardaAccesoEmpresas", function(req, res) {        
        //creamos un objeto con los datos a insertar
        var formData = req.body;
          
        CompanyModel.guardaAccesoEmpresas(formData, function(error, data) {
            //si el acceso se ha insertado correctamente mostramos su info
            if (data && data.insertId) {
                res.status(200).json({
                    "msg": "success"
                });
            } else {
                res.status(200).json({
                    "msg": "error",
                    "detail": data.detail
                });
            }
        });
    });

    /*
     * metodo: validarPermiso
     * tipo: GET
     * valida si el funcionario tiene el permiso
     */

    app.get("/validarPermiso", function(req, res) {              
        RoleModel.validarPermiso(req.query, function(error, data) {
            if(error) {
                res.status(200).json({
                    "msg": "error", 
                    "detail" : error.code                  
                });
            } else {
                if(data.msg == 'error'){
                    res.status(200).json({
                        "msg": "error",
                        "detail": data.detail
                    }); 
                }                
                else{
                    res.status(200).json(data);
                }                
            }            
        });
    }); 

    //***********************************metodos para debug!!!****************************************//

    app.get('/checks', function(req, res) {
        if(req.session.count) {
            req.session.count++;
            //res.end(content);
            res.send("Hola amor aqui hay!!! "+req.session.count+" visitas");
            //res.render("hola mundo:"+req.session.count);
        }
        else{
            req.session.count = 1;            
            res.send("Hola amor aqui hay!!! "+req.session.count+" visitas");
        }
    });

    app.get('/removeChecks', function(req, res) {

        req.session.destroy();       

        res.send("Hola amor aqui hay!!! "+req.session.count+" visitas");
        
       
    });

}    