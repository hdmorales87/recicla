//llamamos la conexion
var connection = require('../bd/bd');  
//creamos un objeto para ir almacenando todo lo que necesitemos
var SaleModel = {};

//obtenemos todas las compras
SaleModel.getSales = function(userData, callback) {    
    if (connection) {
        var searchWord   = userData.searchWord;
        var showRecords  = userData.showRecords; 
        var offsetRecord = userData.offsetRecord;    
        var sql = 'SELECT P.id,(P.peso * PT.precio_venta) AS valor_venta,DATE_FORMAT(P.fecha_venta,"%Y-%m-%d") AS fecha_venta,PT.id AS id_tipo_producto,PT.nombre AS tipo_producto,R.id AS id_cliente,R.razon_social AS cliente,P.peso '
                        +' FROM sales AS P  '
                        +' INNER JOIN product_types AS PT ON (PT.id = P.id_tipo_producto) '
                        +' INNER JOIN customers AS R ON (R.id = P.id_cliente) WHERE '
                        +' PT.nombre LIKE \'%'+searchWord+'%\' '
                        +' OR R.razon_social LIKE \'%'+searchWord+'%\' '                                                
                        +' OR P.peso LIKE \'%'+searchWord+'%\' '                        
                        +' ORDER BY P.id LIMIT '+offsetRecord+','+showRecords;

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

//obtenemos todas las compras
SaleModel.getSalesReport = function(userData, callback) {    
    if (connection) {
        var searchWord   = userData.searchWord;
       // var showRecords  = userData.showRecords; 
        //var offsetRecord = userData.offsetRecord;       
        connection.query('SELECT * FROM sales WHERE '
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

//obtenemos la cuenta de las compras
SaleModel.getSalesRows = function(userData, callback) {
    if (connection) {
        var searchWord   = userData.searchWord; 

        var sql = 'SELECT COUNT(P.id) AS total '
                +' FROM sales AS P  '
                +' INNER JOIN product_types AS PT ON (PT.id = P.id_tipo_producto) '
                +' INNER JOIN customers AS R ON (R.id = P.id_cliente) WHERE '
                +' PT.nombre LIKE \'%'+searchWord+'%\' '
                +' OR R.razon_social LIKE \'%'+searchWord+'%\' '                                                
                +' OR P.peso LIKE \'%'+searchWord+'%\' ';

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

//almacenar una compra
SaleModel.insertSale = function(userData, callback) {
    if (connection) {                       
        connection.query('INSERT INTO sales SET ?', userData, function(error, result) {            
            if (error) {
                callback(null, {
                    "msg": "error",
                    "detail": error.code
                });
            } else {
                //devolvemos la última id insertada
                var id = result.insertId;
                callback(null, {
                    "insertId": id
                });                 
            }
        });
    }
}

//actualizar una compra
SaleModel.updateSale = function(userData, callback) {     
    if (connection) { 
        var sql = 'UPDATE sales SET id_tipo_producto = ' + connection.escape(userData.id_tipo_producto) + 
               ', fecha_venta = ' + connection.escape(userData.fecha_venta) + 
               ', id_cliente = ' + connection.escape(userData.id_cliente) + 
               ', peso = ' + connection.escape(userData.peso) +                             
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

//eliminar una compra pasando la id a eliminar
SaleModel.deleteSale = function(id, callback) {    
    if (connection) {
        var sqlExists = 'SELECT COUNT(*) AS cuenta FROM sales WHERE id = ' + connection.escape(id);
        connection.query(sqlExists, function(err, row) {       
            //si existe la id dela compra a eliminar  
            if (row[0].cuenta > 0) {
                var sql = 'DELETE FROM sales WHERE id = ' + connection.escape(id);                
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
module.exports = SaleModel;