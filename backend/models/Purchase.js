//llamamos la conexion
var connection = require('../bd/bd');  
//creamos un objeto para ir almacenando todo lo que necesitemos
var PurchaseModel = {};

//obtenemos todas las compras
PurchaseModel.getPurchasesReport = function(userData, callback) {    
    if (connection) {
        var fecha1   = userData.fecha1;
        var fecha2   = userData.fecha2;

        connection.query(`SELECT 
                                P.id,
                                (P.peso * PT.precio_compra) AS valor_compra,
                                DATE_FORMAT(P.fecha_compra,"%Y-%m-%d") AS fecha_compra,
                                PT.id AS id_tipo_producto,
                                PT.nombre AS tipo_producto,
                                R.id AS id_reciclador,
                                R.nombre AS reciclador,
                                P.peso,
                                P.id_empresa 
                           FROM purchases AS P  
                           INNER JOIN product_types AS PT ON (PT.id = P.id_tipo_producto) 
                           INNER JOIN reciclators AS R ON (R.id = P.id_reciclador) 
                           WHERE 
                                P.activo = 1
                                AND P.fecha_compra BETWEEN \'`+fecha1+`\' AND \'`+fecha2+`\'
                                AND P.id_empresa = `+userData.id_empresa+`                                                
                           ORDER BY P.fecha_compra`, function(error, rows) {
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

//obtener el indicador de compras
PurchaseModel.indicadorCompras1 = function(userData, callback) {
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
                   FROM purchases AS P                     
                   WHERE
                        P.activo = 1
                        AND P.fecha_compra BETWEEN \'`+filtroFecha1+`\' AND \'`+filtroFecha2+`\'
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

//obtener el grafico de compras
PurchaseModel.indicadorGraficoCompras1 = function(userData, callback) {
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
                   FROM purchases AS P     
                   INNER JOIN product_types AS PT ON (PT.id = P.id_tipo_producto)                 
                   WHERE
                        P.activo = 1
                        AND P.fecha_compra BETWEEN \'`+filtroFecha1+`\' AND \'`+filtroFecha2+`\'
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

//obtener el indicador de compras
PurchaseModel.indicadorCompras2 = function(userData, callback) {
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
                        SUM(P.peso * PT.precio_compra) AS total                         
                   FROM purchases AS P
                   INNER JOIN product_types AS PT ON (PT.id = P.id_tipo_producto)                     
                   WHERE 
                        P.activo = 1
                        AND P.fecha_compra BETWEEN \'`+filtroFecha1+`\' AND \'`+filtroFecha2+`\'
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

//obtener el grafico de compras
PurchaseModel.indicadorGraficoCompras2 = function(userData, callback) {
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
                        SUM(P.peso * PT.precio_compra) AS total,
                        PT.nombre AS tipo_producto                        
                   FROM purchases AS P     
                   INNER JOIN product_types AS PT ON (PT.id = P.id_tipo_producto)                 
                   WHERE
                        P.activo = 1
                        AND P.fecha_compra BETWEEN \'`+filtroFecha1+`\' AND \'`+filtroFecha2+`\'
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
module.exports = PurchaseModel;