//llamamos la conexion
var connection = require('../bd/bd');  
//creamos un objeto para ir almacenando todo lo que necesitemos
var CustomerModel = {};

//obtenemos todos los usuarios
CustomerModel.getCustomers = function(userData, callback) {    
    if (connection) {
        var searchWord   = userData.searchWord;
        var showRecords  = userData.showRecords; 
        var offsetRecord = userData.offsetRecord;       
        connection.query(`SELECT 
                                R.id,
                                R.id_tipo_documento,
                                DT.nombre AS tipo_documento,
                                R.documento,
                                R.nombre_comercial,
                                R.razon_social,
                                R.direccion,
                                R.telefono,
                                R.id_empresa
                          FROM customers AS R                         
                          INNER JOIN document_types AS DT ON (DT.id = R.id_tipo_documento) 
                          WHERE 
                                R.activo=1
                                AND R.id_empresa = `+userData.id_empresa+`
                                AND ( 
                                    R.documento LIKE \'%`+searchWord+`%\' 
                                    OR R.nombre_comercial LIKE \'%`+searchWord+`%\' 
                                    OR R.razon_social LIKE \'%`+searchWord+`%\'                         
                                    OR R.direccion LIKE \'%`+searchWord+`%\' 
                                    OR R.telefono LIKE \'%`+searchWord+`%\') 
                                    ORDER BY R.id LIMIT `+offsetRecord+','+showRecords, function(error, rows) {
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
CustomerModel.getCustomersReport = function(userData, callback) {    
    if (connection) {
        var searchWord   = userData.searchWord;
       // var showRecords  = userData.showRecords; 
        //var offsetRecord = userData.offsetRecord;       
        connection.query(`SELECT COUNT(R.id) AS total 
                          FROM customers AS R                         
                          INNER JOIN document_types AS DT ON (DT.id = R.id_tipo_documento) 
                          WHERE 
                                R.activo=1
                                AND R.id_empresa = `+userData.id_empresa+`
                                AND ( 
                                    R.documento LIKE \'%`+searchWord+`%\' 
                                    OR R.nombre_comercial LIKE \'%`+searchWord+`%\' 
                                    OR R.razon_social LIKE \'%`+searchWord+`%\'                         
                                    OR R.direccion LIKE \'%`+searchWord+`%\' 
                                    OR R.telefono LIKE \'%`+searchWord+`%\') 
                          ORDER BY R.id`, function(error, rows) {
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
CustomerModel.getCustomersRows = function(userData, callback) {
    if (connection) {
        var searchWord   = userData.searchWord;          
        connection.query(`SELECT COUNT(R.id) AS total 
                          FROM customers AS R                         
                          INNER JOIN document_types AS DT ON (DT.id = R.id_tipo_documento) 
                          WHERE 
                                R.activo=1
                                AND R.id_empresa = `+userData.id_empresa+`
                                AND ( 
                                    R.documento LIKE \'%`+searchWord+`%\' 
                                    OR R.nombre_comercial LIKE \'%`+searchWord+`%\' 
                                    OR R.razon_social LIKE \'%`+searchWord+`%\'                         
                                    OR R.direccion LIKE \'%`+searchWord+`%\' 
                                    OR R.telefono LIKE \'%`+searchWord+`%\')`, function(error, rows) {
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

//eliminar un usuario pasando la id a eliminar
CustomerModel.deleteCustomer = function(id, callback) {    
    if (connection) {
        var sqlExists = 'SELECT COUNT(*) AS cuenta FROM customers WHERE activo = 1 AND id = ' + connection.escape(id);
        connection.query(sqlExists, function(err, row) {       
            //si existe la id del usuario a eliminar  
            if (row[0].cuenta > 0) {
                var sql = 'UPDATE customers SET activo = 0 WHERE id = ' + connection.escape(id);                
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

//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = CustomerModel;