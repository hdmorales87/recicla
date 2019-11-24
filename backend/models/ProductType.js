//llamamos la conexion
var connection = require('../bd/bd');

//creamos un objeto para ir almacenando todo lo que necesitemos
var ProductTypeModel = {};

//obtenemos todos los tipos de compra
ProductTypeModel.getProductTypes = function(userData, callback) {
    if (connection) {
        var searchWord   = '';
        var showRecords  = 100;   
        var offsetRecord = 0; 
        if(userData.hasOwnProperty('searchWord')){
            searchWord   = userData.searchWord;
            showRecords  = userData.showRecords;   
            offsetRecord = userData.offsetRecord; 
        } 
        connection.query('SELECT * FROM product_types WHERE activo = 1 AND nombre LIKE \'%'+searchWord+'%\' ORDER BY id LIMIT '+offsetRecord+','+showRecords, function(error, rows) {
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
ProductTypeModel.getProductTypesRows = function(userData, callback) {
    if (connection) {
        var searchWord   = userData.searchWord;          
        connection.query('SELECT COUNT(*) AS total FROM product_types WHERE activo = 1 AND nombre LIKE \'%'+searchWord+'%\'', function(error, rows) {
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

//almacenar un tipo de compra
ProductTypeModel.insertProductType = function(userData, callback) {
    if (connection) {
        connection.query('INSERT INTO product_types SET ?', userData, function(error, result) {
            if (error) {
                callback(null, {
                    "msg": "error",
                    "detail": error.code
                });
            } else {
                //devolvemos la última id insertada
                callback(null, {
                    "insertId": result.insertId
                });
            }
        });
    }
}

//actualizar un tipo de compra
ProductTypeModel.updateProductType = function(userData, callback) {     
    if (connection) {
        var sql = 'UPDATE product_types SET nombre = ' + connection.escape(userData.nombre) + ',' +
            'precio_compra = ' + connection.escape(userData.precio_compra) +   
            ',precio_venta = ' + connection.escape(userData.precio_venta) +           
            ' WHERE id = ' + connection.escape(userData.id);

        console.log(sql);

        connection.query(sql, function(error, result) {
            console.log(error);
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

//eliminar un tipo de compra pasando la id a eliminar
ProductTypeModel.deleteProductType = function(id, callback) {    
    if (connection) {
        var sqlExists = 'SELECT COUNT(*) AS cuenta FROM product_types WHERE activo = 1 AND id = ' + connection.escape(id);
        connection.query(sqlExists, function(err, row) {       
            //si existe la id del tipo de compra a eliminar  
            if (row[0].cuenta > 0) {
                var sql = 'UPDATE product_types SET activo = 0 WHERE id = ' + connection.escape(id);                
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
module.exports = ProductTypeModel;