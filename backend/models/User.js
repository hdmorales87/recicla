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

//obtenemos todos los usuarios
UserModel.getUsers = function(userData, callback) {    
    if (connection) {
        var searchWord   = userData.searchWord;
        var showRecords  = userData.showRecords; 
        var offsetRecord = userData.offsetRecord; 
        var andEmpresa   = ' AND R.id_empresa = '+userData.id_empresa;
        if(showRecords == 1){
            andEmpresa   = '';
        }
        var sql = `SELECT 
                        R.id,
                        R.id_tipo_documento,
                        DT.nombre AS tipo_documento,
                        R.documento,
                        R.nombre,
                        R.primer_nombre,
                        R.segundo_nombre,
                        R.primer_apellido,
                        R.segundo_apellido,
                        R.email,
                        R.direccion,
                        R.telefono,
                        R.id_rol,
                        RL.nombre AS rol,
                        R.imagen_usuario 
                   FROM users AS R                         
                   INNER JOIN document_types AS DT ON (DT.id = R.id_tipo_documento) 
                   INNER JOIN roles AS RL ON (RL.id = R.id_rol) 
                   WHERE 
                        R.activo = 1 
                        `+andEmpresa+`
                        AND (
                        R.nombre LIKE \'%`+searchWord+`%\' 
                        OR R.documento LIKE \'%`+searchWord+`%\' 
                        OR R.email LIKE \'%`+searchWord+`%\'                         
                        OR R.direccion LIKE \'%`+searchWord+`%\' 
                        OR R.telefono LIKE \'%`+searchWord+`%\') 
                   ORDER BY R.id LIMIT `+offsetRecord+','+showRecords;                
                               
        connection.query(sql, function(error, rows) {
            if (error) {
                 callback(null, {
                    "msg": "error",
                    "detail": error.code
                });
            } else {
                callback(null, rows);
            }
        });
    }
}

//obtenemos todos los usuarios
UserModel.getUsersReport = function(userData, callback) {    
    if (connection) {
        var searchWord   = userData.searchWord;
       // var showRecords  = userData.showRecords; 
        //var offsetRecord = userData.offsetRecord;       
        connection.query(`SELECT * FROM users WHERE 
                          nombre LIKE \'%`+searchWord+`%\' 
                          OR email LIKE \'%`+searchWord+`%\'                         
                          OR direccion LIKE \'%`+searchWord+`%\' 
                          OR telefono LIKE \'%`+searchWord+`%\' 
                          ORDER BY id`, function(error, rows) {
            if (error) {
                 callback(null, {
                    "msg": "error",
                    "detail": error.code
                });
            } else {
                callback(null, rows);
            }
        });
    }
}

//obtenemos la cuenta de los tipos de compra
UserModel.getUsersRows = function(userData, callback) {
    if (connection) {
        var searchWord   = userData.searchWord;          
        connection.query(`SELECT COUNT(U.id) AS total 
                          FROM users AS U 
                          INNER JOIN document_types AS DT ON (DT.id = U.id_tipo_documento) 
                          WHERE
                            U.activo = 1
                            AND U.id_empresa = `+userData.id_empresa+`
                            AND ( 
                            U.nombre LIKE \'%`+searchWord+`%\' 
                            OR U.documento LIKE \'%`+searchWord+`%\' 
                            OR U.email LIKE \'%`+searchWord+`%\'                        
                            OR U.direccion LIKE \'%`+searchWord+`%\' 
                            OR U.telefono LIKE \'%`+searchWord+'%\')', function(error, rows) {
            if (error) {
                 callback(null, {
                    "msg": "error",
                    "detail": error.code
                });
            } else {
                callback(null, rows);
            }
        });
    }
}

//actualizar un usuario
UserModel.updateUser = function(userData, callback) {     
    if (connection) {
        var primer_nombre = connection.escape(userData.primer_nombre)
        ,   segundo_nombre = connection.escape(userData.segundo_nombre)
        ,   primer_apellido = connection.escape(userData.primer_apellido)
        ,   segundo_apellido = connection.escape(userData.segundo_apellido);

        var username = userData.primer_nombre.substr(0,1)+userData.segundo_nombre.substr(0,1)+userData.primer_apellido+userData.segundo_apellido.substr(0,1);    

        var sql = 'UPDATE users SET id_tipo_documento = ' + connection.escape(userData.id_tipo_documento) + 
               ', documento = ' + connection.escape(userData.documento) + 
               ', primer_nombre = ' + primer_nombre + 
               ', segundo_nombre = ' + segundo_nombre + 
               ', primer_apellido = ' + primer_apellido + 
               ', segundo_apellido = ' + segundo_apellido + 
               ', email = ' + connection.escape(userData.email) + 
               ', direccion = ' + connection.escape(userData.direccion) + 
               ', telefono = ' + connection.escape(userData.telefono) + 
               ', id_rol = ' + connection.escape(userData.id_rol) + 
               ', nombre = \''+userData.primer_nombre+' '+userData.segundo_nombre+' '+userData.primer_apellido+' '+userData.segundo_apellido+'\''+
               ' WHERE id = ' + connection.escape(userData.id);        

        connection.query(sql, function(error, result) {            
            if (error) {
                callback(null, {
                    "msg": "error",
                    "detail": error.code
                });
            } else {
                //devolvemos la última id insertada
                callback(null, {
                    "msg": "success"
                });
            }            
        });
    }
}

//eliminar un usuario pasando la id a eliminar
UserModel.deleteUser = function(id, callback) {    
    if (connection) {
        var sqlExists = 'SELECT COUNT(*) AS cuenta FROM users WHERE activo = 1 AND id = ' + connection.escape(id);
        connection.query(sqlExists, function(err, row) {       
            //si existe la id del usuario a eliminar  
            if (row[0].cuenta > 0) {
                var sql = 'UPDATE users SET activo = 0 WHERE id = ' + connection.escape(id);                
                connection.query(sql, function(error, result) {
                    if (error) {
                        callback(null, {
                            "msg": "error",
                            "detail": error.code
                        });
                    } else {
                        //devolvemos la última id insertada
                        callback(null, {
                            "msg": "success"
                        });
                    }
                });
            } else {
                callback(null, {
                    "msg": "notExist"
                });
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