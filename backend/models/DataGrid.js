var connection = require('../bd/bd');  

//creamos un objeto para ir almacenando todo lo que necesitemos
var DataGridModel = {};

//obtenemos todas las compras
DataGridModel.getData = function(userData, callback) {    
    if (connection) {
        var searchWord   = userData.searchWord;
        var showRecords  = userData.showRecords; 
        var offsetRecord = userData.offsetRecord;
        var filtroFecha1 = userData.date1; 
        var filtroFecha2 = userData.date2;
        var tabla        = userData.tabla;
        var sqlParams = userData.sqlParams;
        if(filtroFecha1 == ''){
            filtroFecha1 = '0000-00-00';
        }
        if(filtroFecha2 == ''){
            filtroFecha2 = '9999-99-99';
        }
        var andFechas = '';
        if(sqlParams.filtroFechas == true){
            andFechas = ' AND '+sqlParams.filtroFechas+' BETWEEN \''+filtroFecha1+'\' AND \''+filtroFecha2+'\'';
        }
        console.log(sqlParams);
        var sql = `SELECT                        
                        `+sqlParams.sqlCols+` 
                   FROM `+tabla+` AS T1  
                   `+sqlParams.sqlJoin+`
                   WHERE 
                        T1.activo = 1
                        `+andFechas+`
                        AND T1.id_empresa = `+userData.id_empresa+`
                        AND (
                            PT.nombre LIKE \'%`+searchWord+`%\' 
                            OR R.nombre LIKE \'%`+searchWord+`%\'                                                 
                            OR P.peso LIKE \'%`+searchWord+`%\')                         
                   ORDER BY T1.id LIMIT `+offsetRecord+','+showRecords;

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

//almacenar un usuario
DataGridModel.insertData = function(userData,tabla, callback) {
	console.log(userData+'-->'+tabla);
    if (connection) {  
        connection.query('INSERT INTO '+tabla+' SET ?', userData, function(error, result) {
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

//actualizar un registro
DataGridModel.updateData = function(userData,tabla, callback) {     
    if (connection) {
        var strUpdate = '';
        for(let i in userData){            
            if(i!='id'){
                strUpdate += i+'='+connection.escape(userData[i])+',';
            }            
        }
        strUpdate = strUpdate.slice(0,-1);  

        var sql = 'UPDATE '+tabla+' SET ' + strUpdate + ' WHERE id = ' + userData.id;  
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

//eliminar un registro pasando la id a eliminar
DataGridModel.deleteData = function(id,tabla, callback) {    
    if (connection) {        
        var sql = 'UPDATE '+tabla+' SET activo = 0 WHERE id = ' + connection.escape(id);                
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

//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = DataGridModel;