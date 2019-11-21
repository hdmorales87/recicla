var UserModel = require('../models/User');
var CustomerModel = require('../models/Customer');
var ReciclatorModel = require('../models/Reciclator');
var ProductTypeModel = require('../models/ProductType');
var PurchaseModel = require('../models/Purchase');
var SaleModel = require('../models/Sale');
var DocumentTypeModel = require('../models/DocumentType');
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
   		//res.send("Hello World!");
   		//console.log("hola mundo");
   		res.send("Por default!!!");
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
                    //req.session.id_usuario=id_usuario; 
                    //req.session.save(); 
                    //req.session.save(function(err) {
                        //console.log(req.session.id_usuario);                 
                    res.status(200).json(data);
                    //});
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
                
                if(data.msg == 'error'){
                    res.status(200).json({
                        "msg": "error",
                        "detail": data.detail
                    }); 
                }
                //si el usuario existe lo mostramos en formato json
                else if (typeof data !== 'undefined' && data.length > 0) {                  
                    var id_usuario = data[0].id;                    
                    req.session.id_usuario=id_usuario; 
                    //req.session.save(); 
                    req.session.save(function(err) {
                        console.log(req.session.id_usuario);                 
                        res.status(200).json(data);
                    });
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

    /*
     * metodo: checkSession
     * chequea si la sesion esta activa 
     */

    app.get('/checkSession', function(req, res) {        
        //console.log(req.session);
        //console.log(req.session.id_usuario);

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
     * metodo: product_types
     * tipo: GET
     * devuelve todos los tipos de producto 
     */

    app.get("/product_types", function(req, res) {
        ProductTypeModel.getProductTypes(req.query, function(error, data) {
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
     * metodo: product_typesRows
     * tipo: GET
     * devuelve el total de filas de los tipos de producto 
     */

    app.get("/product_typesRows", function(req, res) {
        ProductTypeModel.getProductTypesRows(req.query,function(error, data) {
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
     * metodo: product_types
     * tipo: POST
     * inserta un nuevo tipo de producto
     */

    app.post("/product_types", function(req, res) {
        //console.log(req.body);
        //creamos un objeto con los datos a insertar
        var formData = {            
            nombre: req.body.nombre,
            precio_compra: req.body.precio_compra,
            precio_venta: req.body.precio_venta                     
        };
        ProductTypeModel.insertProductType(formData, function(error, data) {
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


    app.put("/product_types", function(req, res) {
        //almacenamos los datos del formulario en un objeto
        var formData = {
            id: req.body.id,
            nombre: req.body.nombre,            
            precio_compra: req.body.precio_compra,
            precio_venta: req.body.precio_venta                      
        };
        ProductTypeModel.updateProductType(formData, function(error, data) {
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

    //utilizamos el verbo delete para eliminar un tipo de producto
    app.delete("/product_types", function(req, res) {
        //id del usuario a eliminar        
        var id = req.body.id;       
        ProductTypeModel.deleteProductType(id, function(error, data) {
            if(data.msg == 'success'){
                res.status(200).json({
                    "msg": "success"
                });
            } else if(data.msg == 'notExist') {
                res.status(200).json({
                    "msg": "notExist",                    
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
     * metodo: document_types
     * tipo: GET
     * devuelve todos los tipos de documento 
     */

    app.get("/document_types", function(req, res) {
        DocumentTypeModel.getDocumentTypes(req.query,function(error, data) {
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
     * metodo: document_typesRows
     * tipo: GET
     * devuelve el total de filas los tipos de documento 
     */

    app.get("/document_typesRows", function(req, res) {
        DocumentTypeModel.getDocumentTypesRows(req.query,function(error, data) {
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
     * metodo: document_types
     * tipo: POST
     * inserta un nuevo tipo de documento
     */

    app.post("/document_types", function(req, res) {
        //console.log(req.body);
        //creamos un objeto con los datos a insertar
        var formData = {            
            nombre: req.body.nombre                                
        };
        DocumentTypeModel.insertDocumentType(formData, function(error, data) {
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


    app.put("/document_types", function(req, res) {
        //almacenamos los datos del formulario en un objeto
        var formData = {
            id: req.body.id,
            nombre: req.body.nombre
        };
        DocumentTypeModel.updateDocumentType(formData, function(error, data) {
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

    //utilizamos el verbo delete para eliminar un usuario
    app.delete("/document_types", function(req, res) {
        //id del usuario a eliminar        
        var id = req.body.id;       
        DocumentTypeModel.deleteDocumentType(id, function(error, data) {
            if(data.msg == 'success'){
                res.status(200).json({
                    "msg": "success"
                });
            } else if(data.msg == 'notExist') {
                res.status(200).json({
                    "msg": "notExist",                    
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
     * metodo: users
     * tipo: GET
     * devuelve todos los tipos de documento 
     */

    app.get("/users", function(req, res) {              
        UserModel.getUsers(req.query, function(error, data) {
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

    app.get("/usersReport", function(req, res) {              
        UserModel.getUsersReport(req.query, function(error, data) {
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
     * metodo: usersRows
     * tipo: GET
     * devuelve el total de filas de los usuarios
     */

    app.get("/usersRows", function(req, res) {              
        UserModel.getUsersRows(req.query, function(error, data) {
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
     * metodo: users
     * tipo: POST
     * inserta un nuevo tipo de documento
     */

    app.post("/users", function(req, res) {
        //console.log(req.body);
        //creamos un objeto con los datos a insertar
        var formData = req.body;          
          
        UserModel.insertUser(formData, function(error, data) {
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


    app.put("/users", function(req, res) {
        //almacenamos los datos del formulario en un objeto
        var formData = req.body;
        UserModel.updateUser(formData, function(error, data) {
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

    //utilizamos el verbo delete para eliminar un usuario
    app.delete("/users", function(req, res) {
        //id del usuario a eliminar        
        var id = req.body.id;       
        UserModel.deleteUser(id, function(error, data) {
            if(data.msg == 'success'){
                res.status(200).json({
                    "msg": "success"
                });
            } else if(data.msg == 'notExist') {
                res.status(200).json({
                    "msg": "notExist",                    
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
     * metodo: customers
     * tipo: GET
     * devuelve todos los clientes
     */

    app.get("/customers", function(req, res) {              
        CustomerModel.getCustomers(req.query, function(error, data) {
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

    app.get("/customersReport", function(req, res) {              
        CustomerModel.getCustomersReport(req.query, function(error, data) {
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
     * metodo: customersRows
     * tipo: GET
     * devuelve el total de filas de los clientes
     */

    app.get("/customersRows", function(req, res) {              
        CustomerModel.getCustomersRows(req.query, function(error, data) {
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
     * metodo: customers
     * tipo: POST
     * inserta un nuevo cliente
     */

    app.post("/customers", function(req, res) {
        //console.log(req.body);
        //creamos un objeto con los datos a insertar
        var formData = req.body;          
          
        CustomerModel.insertCustomer(formData, function(error, data) {
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


    app.put("/customers", function(req, res) {
        //almacenamos los datos del formulario en un objeto
        var formData = req.body;
        CustomerModel.updateCustomer(formData, function(error, data) {
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

    //utilizamos el verbo delete para eliminar un cliente
    app.delete("/customers", function(req, res) {
        //id del usuario a eliminar        
        var id = req.body.id;       
        CustomerModel.deleteCustomer(id, function(error, data) {
            if(data.msg == 'success'){
                res.status(200).json({
                    "msg": "success"
                });
            } else if(data.msg == 'notExist') {
                res.status(200).json({
                    "msg": "notExist",                    
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
     * metodo: reciclators
     * tipo: GET
     * devuelve todos los recicladores
     */

    app.get("/reciclators", function(req, res) {              
        ReciclatorModel.getReciclators(req.query, function(error, data) {
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

    app.get("/reciclatorsReport", function(req, res) {              
        ReciclatorModel.getReciclatorsReport(req.query, function(error, data) {
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
     * metodo: reciclatorsRows
     * tipo: GET
     * devuelve el total de filas de los recicladores
     */

    app.get("/reciclatorsRows", function(req, res) {              
        ReciclatorModel.getReciclatorsRows(req.query, function(error, data) {
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
     * metodo: reciclators
     * tipo: POST
     * inserta un nuevo reciclador
     */

    app.post("/reciclators", function(req, res) {
        //console.log(req.body);
        //creamos un objeto con los datos a insertar
        var formData = req.body;          
          
        ReciclatorModel.insertReciclator(formData, function(error, data) {
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


    app.put("/reciclators", function(req, res) {
        //almacenamos los datos del formulario en un objeto
        var formData = req.body;
        ReciclatorModel.updateReciclator(formData, function(error, data) {
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

    //utilizamos el verbo delete para eliminar un reciclador
    app.delete("/reciclators", function(req, res) {
        //id del usuario a eliminar        
        var id = req.body.id;       
        ReciclatorModel.deleteReciclator(id, function(error, data) {
            if(data.msg == 'success'){
                res.status(200).json({
                    "msg": "success"
                });
            } else if(data.msg == 'notExist') {
                res.status(200).json({
                    "msg": "notExist",                    
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
     * metodo: purchases
     * tipo: GET
     * devuelve todos las compras
     */

    app.get("/purchases", function(req, res) {              
        PurchaseModel.getPurchases(req.query, function(error, data) {
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

    app.get("/purchasesReport", function(req, res) {              
        PurchaseModel.getPurchasesReport(req.query, function(error, data) {
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
     * metodo: purchasesRows
     * tipo: GET
     * devuelve el total de filas de las compras
     */

    app.get("/purchasesRows", function(req, res) {              
        PurchaseModel.getPurchasesRows(req.query, function(error, data) {
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
     * metodo: purchases
     * tipo: POST
     * inserta una nueva compra
     */

    app.post("/purchases", function(req, res) {
        //console.log(req.body);
        //creamos un objeto con los datos a insertar
        var formData = req.body;          
          
        PurchaseModel.insertPurchase(formData, function(error, data) {
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


    app.put("/purchases", function(req, res) {
        //almacenamos los datos del formulario en un objeto
        var formData = req.body;
        PurchaseModel.updatePurchase(formData, function(error, data) {
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

    //utilizamos el verbo delete para eliminar una compra
    app.delete("/purchases", function(req, res) {
        //id del usuario a eliminar        
        var id = req.body.id;       
        PurchaseModel.deletePurchase(id, function(error, data) {
            if(data.msg == 'success'){
                res.status(200).json({
                    "msg": "success"
                });
            } else if(data.msg == 'notExist') {
                res.status(200).json({
                    "msg": "notExist",                    
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
     * metodo: sales
     * tipo: GET
     * devuelve todos las ventas
     */

    app.get("/sales", function(req, res) {              
        SaleModel.getSales(req.query, function(error, data) {
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

    app.get("/salesReport", function(req, res) {              
        SaleModel.getSalesReport(req.query, function(error, data) {
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
     * metodo: salesRows
     * tipo: GET
     * devuelve el total de filas de las ventas
     */

    app.get("/salesRows", function(req, res) {              
        SaleModel.getSalesRows(req.query, function(error, data) {
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
     * metodo: sales
     * tipo: POST
     * inserta una nueva venta
     */

    app.post("/sales", function(req, res) {
        //console.log(req.body);
        //creamos un objeto con los datos a insertar
        var formData = req.body;          
          
        SaleModel.insertSale(formData, function(error, data) {
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


    app.put("/sales", function(req, res) {
        //almacenamos los datos del formulario en un objeto
        var formData = req.body;
        SaleModel.updateSale(formData, function(error, data) {
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

    //utilizamos el verbo delete para eliminar una venta
    app.delete("/sales", function(req, res) {
        //id del usuario a eliminar        
        var id = req.body.id;       
        SaleModel.deleteSale(id, function(error, data) {
            if(data.msg == 'success'){
                res.status(200).json({
                    "msg": "success"
                });
            } else if(data.msg == 'notExist') {
                res.status(200).json({
                    "msg": "notExist",                    
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
     * metodo: companies
     * tipo: GET
     * devuelve todas las empresas
     */

    app.get("/companies", function(req, res) {              
        CompanyModel.getCompanies(req.query, function(error, data) {
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

    app.get("/companiesReport", function(req, res) {              
        CompanyModel.getCompaniesReport(req.query, function(error, data) {
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
     * metodo: companiesRows
     * tipo: GET
     * devuelve el total de filas de las empresas
     */

    app.get("/companiesRows", function(req, res) {              
        CompanyModel.getCompaniesRows(req.query, function(error, data) {
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
     * metodo: companies
     * tipo: POST
     * inserta una nueva empresa
     */

    app.post("/companies", function(req, res) {
        //console.log(req.body);
        //creamos un objeto con los datos a insertar
        var formData = req.body;          
          
        CompanyModel.insertCompany(formData, function(error, data) {
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


    app.put("/companies", function(req, res) {
        //almacenamos los datos del formulario en un objeto
        var formData = req.body;
        CompanyModel.updateCompany(formData, function(error, data) {
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

    //utilizamos el verbo delete para eliminar una empresa
    app.delete("/companies", function(req, res) {
        //id del usuario a eliminar        
        var id = req.body.id;       
        CompanyModel.deleteCompany(id, function(error, data) {
            if(data.msg == 'success'){
                res.status(200).json({
                    "msg": "success"
                });
            } else if(data.msg == 'notExist') {
                res.status(200).json({
                    "msg": "notExist",                    
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
     * metodo: roles
     * tipo: GET
     * devuelve todas los roles
     */

    app.get("/roles", function(req, res) {              
        RoleModel.getRoles(req.query, function(error, data) {
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

    app.get("/rolesReport", function(req, res) {              
        RoleModel.getRolesReport(req.query, function(error, data) {
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
     * metodo: rolesRows
     * tipo: GET
     * devuelve el total de filas de los roles
     */

    app.get("/rolesRows", function(req, res) {              
        RoleModel.getRolesRows(req.query, function(error, data) {
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
     * metodo: roles
     * tipo: POST
     * inserta un nuevo rol
     */

    app.post("/roles", function(req, res) {
        //console.log(req.body);
        //creamos un objeto con los datos a insertar
        var formData = req.body;          
          
        RoleModel.insertRole(formData, function(error, data) {
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


    app.put("/roles", function(req, res) {
        //almacenamos los datos del formulario en un objeto
        var formData = req.body;
        RoleModel.updateRole(formData, function(error, data) {
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

    //utilizamos el verbo delete para eliminar un rol
    app.delete("/roles", function(req, res) {
        //id del usuario a eliminar        
        var id = req.body.id;       
        RoleModel.deleteRole(id, function(error, data) {
            if(data.msg == 'success'){
                res.status(200).json({
                    "msg": "success"
                });
            } else if(data.msg == 'notExist') {
                res.status(200).json({
                    "msg": "notExist",                    
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
        //console.log(req.body);
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

    app.get("/indicadorCompras", function(req, res) {              
        PurchaseModel.indicadorCompras(req.query, function(error, data) {
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

    app.get("/indicadorVentas", function(req, res) {              
        SaleModel.indicadorVentas(req.query, function(error, data) {
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

        //console.log(req.session);
        //console.log(req.session.email);

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