//llamamos la conexion
var connection = require('../bd/bd');  
//creamos un objeto para ir almacenando todo lo que necesitemos
var SaleModel = {};

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