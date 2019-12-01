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