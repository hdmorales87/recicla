//llamamos la conexion
var connection = require('../bd/bd');  
//creamos un objeto para ir almacenando todo lo que necesitemos
var SaleModel = {};

//obtenemos todas las ventas
SaleModel.getSales = function(userData, callback) {    
    if (connection) {
        var searchWord   = userData.searchWord;
        var showRecords  = userData.showRecords; 
        var offsetRecord = userData.offsetRecord; 
        var filtroFecha1 = userData.date1; 
        var filtroFecha2 = userData.date2;
        if(filtroFecha1 == ''){
            filtroFecha1 = '0000-00-00';
        }
        if(filtroFecha2 == ''){
            filtroFecha2 = '9999-99-99';
        }   
        var sql = `SELECT 
                        P.id,
                        P.factura_venta,
                        (P.peso * PT.precio_venta) AS valor_venta,
                        DATE_FORMAT(P.fecha_venta,"%Y-%m-%d") AS fecha_venta,
                        PT.id AS id_tipo_producto,
                        PT.nombre AS tipo_producto,
                        R.id AS id_cliente,
                        R.razon_social AS cliente,
                        P.peso,
                        P.id_empresa
                   FROM sales AS P  
                   INNER JOIN product_types AS PT ON (PT.id = P.id_tipo_producto) 
                   INNER JOIN customers AS R ON (R.id = P.id_cliente) 
                   WHERE 
                        P.activo = 1
                        AND P.fecha_venta BETWEEN \'`+filtroFecha1+`\' AND \'`+filtroFecha2+`\'
                        AND P.id_empresa = `+userData.id_empresa+`
                        AND (    
                            PT.nombre LIKE \'%`+searchWord+`%\' 
                            OR R.razon_social LIKE \'%`+searchWord+`%\'                                                
                            OR P.peso LIKE \'%`+searchWord+`%\' 
                        )                        
                   ORDER BY P.id LIMIT `+offsetRecord+','+showRecords;

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

//obtenemos todas las ventas
SaleModel.getSalesReport = function(userData, callback) {    
    if (connection) {
        var fecha1   = userData.fecha1;
        var fecha2   = userData.fecha2;

        connection.query(`SELECT 
                                P.id,
                                P.factura_venta,
                                (P.peso * PT.precio_venta) AS valor_venta,
                                DATE_FORMAT(P.fecha_venta,"%Y-%m-%d") AS fecha_venta,
                                PT.id AS id_tipo_producto,
                                PT.nombre AS tipo_producto,
                                R.id AS id_cliente,
                                R.razon_social AS cliente,
                                P.peso,
                                P.id_empresa 
                           FROM sales AS P  
                           INNER JOIN product_types AS PT ON (PT.id = P.id_tipo_producto) 
                           INNER JOIN customers AS R ON (R.id = P.id_cliente) 
                           WHERE 
                                P.activo = 1
                                AND P.fecha_venta BETWEEN \'`+fecha1+`\' AND \'`+fecha2+`\'
                                AND P.id_empresa = `+userData.id_empresa+`                                                
                           ORDER BY P.fecha_venta`, function(error, rows) {
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

//obtenemos la cuenta de las ventas
SaleModel.getSalesRows = function(userData, callback) {
    if (connection) {
        var searchWord   = userData.searchWord; 
        var filtroFecha1 = userData.date1; 
        var filtroFecha2 = userData.date2;
        if(filtroFecha1 == ''){
            filtroFecha1 = '0000-00-00';
        }
        if(filtroFecha2 == ''){
            filtroFecha2 = '9999-99-99';
        }
        var sql = `SELECT 
                        COUNT(P.id) AS total                         
                   FROM sales AS P  
                   INNER JOIN product_types AS PT ON (PT.id = P.id_tipo_producto) 
                   INNER JOIN customers AS R ON (R.id = P.id_cliente) 
                   WHERE
                        P.activo = 1 
                        AND P.fecha_venta BETWEEN \'`+filtroFecha1+`\' AND \'`+filtroFecha2+`\'
                        AND P.id_empresa = `+userData.id_empresa+`
                        AND (    
                            PT.nombre LIKE \'%`+searchWord+`%\' 
                            OR R.razon_social LIKE \'%`+searchWord+`%\'                                                
                            OR P.peso LIKE \'%`+searchWord+`%\' 
                        )`;

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

//almacenar una venta
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

//actualizar una venta
SaleModel.updateSale = function(userData, callback) {     
    if (connection) { 
        var sql = 'UPDATE sales SET id_tipo_producto = ' + connection.escape(userData.id_tipo_producto) + 
               ', fecha_venta = ' + connection.escape(userData.fecha_venta) + 
               ', factura_venta = ' + connection.escape(userData.factura_venta) + 
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

//eliminar una venta pasando la id a eliminar
SaleModel.deleteSale = function(id, callback) {    
    if (connection) {
        var sqlExists = 'SELECT COUNT(*) AS cuenta FROM sales WHERE activo = 1 AND id = ' + connection.escape(id);
        connection.query(sqlExists, function(err, row) {       
            //si existe la id dela venta a eliminar  
            if (row[0].cuenta > 0) {
                var sql = 'UPDATE sales SET activo = 0 WHERE id = ' + connection.escape(id);                
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

//obtener el indicador de ventas
SaleModel.indicadorVentas1 = function(userData, callback) {
    if (connection) {         
        var filtroFecha1 = userData.date1; 
        var filtroFecha2 = userData.date2;

        if(filtroFecha1 == ''){
            filtroFecha1 = '0000-00-00';
        }
        if(filtroFecha2 == ''){
            filtroFecha2 = '9999-99-99';
        }

        var sql = `SELECT 
                        COUNT(P.id) AS total                         
                   FROM sales AS P                     
                   WHERE
                        P.activo = 1
                        AND P.fecha_venta BETWEEN \'`+filtroFecha1+`\' AND \'`+filtroFecha2+`\'
                        AND P.id_empresa = `+userData.id_empresa;

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

//obtener el grafico de ventas
SaleModel.indicadorGraficoVentas1 = function(userData, callback) {
    if (connection) {         
        var filtroFecha1 = userData.date1; 
        var filtroFecha2 = userData.date2;

        if(filtroFecha1 == ''){
            filtroFecha1 = '0000-00-00';
        }
        if(filtroFecha2 == ''){
            filtroFecha2 = '9999-99-99';
        }

        var sql = `SELECT 
                        COUNT(P.id) AS total,
                        PT.nombre AS tipo_producto                        
                   FROM sales AS P     
                   INNER JOIN product_types AS PT ON (PT.id = P.id_tipo_producto)                 
                   WHERE 
                        P.activo = 1
                        AND P.fecha_venta BETWEEN \'`+filtroFecha1+`\' AND \'`+filtroFecha2+`\'
                        AND P.id_empresa = `+userData.id_empresa+`
                   GROUP BY P.id_tipo_producto`;

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

//obtener el indicador de ventas
SaleModel.indicadorVentas2 = function(userData, callback) {
    if (connection) {         
        var filtroFecha1 = userData.date1; 
        var filtroFecha2 = userData.date2;

        if(filtroFecha1 == ''){
            filtroFecha1 = '0000-00-00';
        }
        if(filtroFecha2 == ''){
            filtroFecha2 = '9999-99-99';
        }

        var sql = `SELECT 
                        SUM(P.peso * PT.precio_venta) AS total                      
                   FROM sales AS P 
                   INNER JOIN product_types AS PT ON (PT.id = P.id_tipo_producto)                    
                   WHERE
                        P.activo = 1
                        AND P.fecha_venta BETWEEN \'`+filtroFecha1+`\' AND \'`+filtroFecha2+`\'
                        AND P.id_empresa = `+userData.id_empresa;

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

//obtener el grafico de ventas
SaleModel.indicadorGraficoVentas2 = function(userData, callback) {
    if (connection) {         
        var filtroFecha1 = userData.date1; 
        var filtroFecha2 = userData.date2;

        if(filtroFecha1 == ''){
            filtroFecha1 = '0000-00-00';
        }
        if(filtroFecha2 == ''){
            filtroFecha2 = '9999-99-99';
        }

        var sql = `SELECT 
                        SUM(P.peso * PT.precio_venta) AS total,
                        PT.nombre AS tipo_producto                        
                   FROM sales AS P     
                   INNER JOIN product_types AS PT ON (PT.id = P.id_tipo_producto)                 
                   WHERE
                        P.activo = 1
                        AND P.fecha_venta BETWEEN \'`+filtroFecha1+`\' AND \'`+filtroFecha2+`\'
                        AND P.id_empresa = `+userData.id_empresa+`
                   GROUP BY P.id_tipo_producto`;

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

//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = SaleModel;