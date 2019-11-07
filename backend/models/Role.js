//llamamos la conexion
var connection = require('../bd/bd');  
var md5 = require('md5');

//creamos un objeto para ir almacenando todo lo que necesitemos
var RoleModel = {};

//TRAER EL ROL
RoleModel.getRole = function(userData, callback) {
    if (connection) {
        var sql = 'SELECT * FROM roles WHERE documento = \''+userData+'\'';
        connection.query(sql, function(error, row) {
            if (error) {                
                callback(null, {
                    "msg": "error",
                    "detail": error.code
                });
            } else {                           
                callback(null, row);                
            }
        });
    }
}

//obtenemos todos los roles
RoleModel.getRoles = function(userData, callback) {    
    if (connection) {
        var searchWord   = userData.searchWord;
        var showRecords  = userData.showRecords; 
        var offsetRecord = userData.offsetRecord;            
        connection.query(`SELECT
                                id,
                                nombre,
                                id_empresa
                          FROM roles                          
                          WHERE 
                                id_empresa = `+userData.id_empresa+`
                                AND (
                                    nombre LIKE \'%`+searchWord+`%\'
                                )                       
                          ORDER BY id LIMIT `+offsetRecord+`,`+showRecords, function(error, rows) {
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

//obtenemos la cuenta de los roles
RoleModel.getRolesRows = function(userData, callback) {
    if (connection) {
        var searchWord   = userData.searchWord; 
        connection.query(`SELECT
                                COUNT(id) AS total                                
                          FROM roles                          
                          WHERE 
                                id_empresa = `+userData.id_empresa+`
                                AND (
                                    nombre LIKE \'%`+searchWord+`%\'
                                )`, function(error, rows) {
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

//almacenar un rol
RoleModel.insertRole = function(userData, callback) {
    if (connection) {                  
        connection.query('INSERT INTO roles SET ?', userData, function(error, result) {
            if (error) {
                callback(null, {
                    "msg": "error",
                    "detail": error.code
                });
            } else {
                var id = result.insertId;                
                //devolvemos la última id insertada
                callback(null, {
                    "insertId": id
                }); 
            }
        });
    }
}

//actualizar un rol
RoleModel.updateRole = function(userData, callback) {     
    if (connection) {
        var nombre = connection.escape(userData.nombre);          

        var sql =  'UPDATE roles SET nombre = '+nombre+         
                   'WHERE id = ' + connection.escape(userData.id);        

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

//eliminar un rol pasando la id a eliminar
RoleModel.deleteRole = function(id, callback) {    
    if (connection) {
        var sqlExists = 'SELECT COUNT(*) AS cuenta FROM roles WHERE id = ' + connection.escape(id);
        connection.query(sqlExists, function(err, row) {       
            //si existe la id del usuario a eliminar  
            if (row[0].cuenta > 0) {
                var sql = 'DELETE FROM roles WHERE id = ' + connection.escape(id);                
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

//obtenemos todos los permisos
RoleModel.getPermisos = function(userData, callback) {    
    if (connection) {                    
        connection.query(`SELECT
                                *
                          FROM permisos      
                          ORDER BY orden`, function(error, rows) {
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

//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = RoleModel;