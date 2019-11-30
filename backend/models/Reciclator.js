//llamamos la conexion
var connection = require('../bd/bd');  
//creamos un objeto para ir almacenando todo lo que necesitemos
var ReciclatorModel = {};

//obtenemos todos los usuarios
ReciclatorModel.getReciclators = function(userData, callback) {    
    if (connection) {
        var searchWord   = userData.searchWord;
        var showRecords  = userData.showRecords; 
        var offsetRecord = userData.offsetRecord;       
        connection.query(`SELECT 
                                R.id,
                                R.id_tipo_documento,
                                DT.nombre AS tipo_documento,
                                R.documento,
                                R.nombre,
                                R.direccion,
                                R.telefono,
                                R.celular,
                                R.id_tipo_producto,
                                R.id_empresa,
                                PT.nombre AS caracterizacion 
                          FROM reciclators AS R  
                          INNER JOIN product_types AS PT ON (PT.id = R.id_tipo_producto) 
                          INNER JOIN document_types AS DT ON (DT.id = R.id_tipo_documento) WHERE 
                                R.activo = 1
                                AND R.id_empresa = `+userData.id_empresa+`
                                AND (
                                    R.documento LIKE \'%`+searchWord+`%\' 
                                    OR R.nombre LIKE \'%`+searchWord+`%\'                                                 
                                    OR R.direccion LIKE \'%`+searchWord+`%\' 
                                    OR R.telefono LIKE \'%`+searchWord+`%\' 
                                    OR R.celular LIKE \'%`+searchWord+`%\' 
                                )
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
ReciclatorModel.getReciclatorsReport = function(userData, callback) {    
    if (connection) {
        var searchWord   = userData.searchWord;
       // var showRecords  = userData.showRecords; 
        //var offsetRecord = userData.offsetRecord;       
        connection.query('SELECT * FROM reciclators WHERE '
                        +' documento LIKE \'%'+searchWord+'%\' '
                        +' OR nombre LIKE \'%'+searchWord+'%\' '                                                
                        +' OR direccion LIKE \'%'+searchWord+'%\' '
                        +' OR telefono LIKE \'%'+searchWord+'%\' '
                        +' OR celular LIKE \'%'+searchWord+'%\' '
                        +' ORDER BY id', function(error, rows) {
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
ReciclatorModel.getReciclatorsRows = function(userData, callback) {
    if (connection) {
        var searchWord   = userData.searchWord;          
        connection.query(`SELECT 
                                COUNT(R.id) AS total                                 
                          FROM reciclators AS R  
                          INNER JOIN product_types AS PT ON (PT.id = R.id_tipo_producto) 
                          INNER JOIN document_types AS DT ON (DT.id = R.id_tipo_documento) 
                          WHERE
                                R.activo = 1
                                AND R.id_empresa = `+userData.id_empresa+`
                                AND (
                                    R.documento LIKE \'%`+searchWord+`%\' 
                                    OR R.nombre LIKE \'%`+searchWord+`%\'                                                 
                                    OR R.direccion LIKE \'%`+searchWord+`%\' 
                                    OR R.telefono LIKE \'%`+searchWord+`%\' 
                                    OR R.celular LIKE \'%`+searchWord+`%\' 
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

//actualizar un usuario
ReciclatorModel.updateReciclator = function(userData, callback) {     
    if (connection) { 
        var sql = 'UPDATE reciclators SET id_tipo_documento = ' + connection.escape(userData.id_tipo_documento) + 
               ', documento = ' + connection.escape(userData.documento) + 
               ', nombre = ' + connection.escape(userData.nombre) + 
               ', celular = ' + connection.escape(userData.celular) + 
               ', direccion = ' + connection.escape(userData.direccion) + 
               ', telefono = ' + connection.escape(userData.telefono) + 
               ', id_tipo_producto = ' + connection.escape(userData.id_tipo_producto) +              
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
ReciclatorModel.deleteReciclator = function(id, callback) {    
    if (connection) {
        var sqlExists = 'SELECT COUNT(*) AS cuenta FROM reciclators WHERE activo = 1 AND id = ' + connection.escape(id);
        connection.query(sqlExists, function(err, row) {       
            //si existe la id del usuario a eliminar  
            if (row[0].cuenta > 0) {
                var sql = 'UPDATE reciclators SET activo = 0 WHERE id = ' + connection.escape(id);                
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
module.exports = ReciclatorModel;