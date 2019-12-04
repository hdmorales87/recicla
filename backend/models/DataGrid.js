var connection = require('../bd/bd');  

//creamos un objeto para ir almacenando todo lo que necesitemos
var DataGridModel = {};

//obtenemos todas los registros
DataGridModel.getData = function(userData, callback) {    
    if (connection) {
        //campos de la grilla
        var searchWord   = userData.searchWord;
        var showRecords  = userData.showRecords; 
        var offsetRecord = userData.offsetRecord;
        var filtroFecha1 = userData.date1; 
        var filtroFecha2 = userData.date2;
        var tabla        = userData.tabla;
        //parametros
        var sqlParams = JSON.parse(userData.sqlParams);        
        //si valida id de empresa
        var andEmpresa   = ' AND T1.id_empresa = '+userData.id_empresa;
        if(showRecords == 1 || sqlEmpresa != true){
            andEmpresa   = '';
        }
        //si van los campos de fechas
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
        //va el filtro de busqueda
        var strSearch = '';
        if(sqlParams.fieldSearch != undefined){
            var j = 0;
            for(let i in sqlParams.fieldSearch){
                if(j > 0){
                    strSearch += ' OR '; 
                }
                strSearch += sqlParams.fieldSearch[i]+' LIKE \'%'+userData.searchWord+'%\'';
                j++;
            }
        }
        if(strSearch != ''){
            strSearch = 'AND ('+strSearch+')'; 
        }
        //las columnas del query,* por default
        var strCols = '';        
        if(sqlParams.sqlCols != undefined){            
            for(let i in sqlParams.sqlCols){                                        
                strCols += sqlParams.sqlCols[i]+',';
            }
            strCols = strCols.slice(0,-1);  
        }
        if(strCols == ''){
            strCols = '*';
        }
        //los joins
        var strJoin = '';        
        if(sqlParams.sqlJoin != undefined){            
            for(let i in sqlParams.sqlJoin){                
                strJoin += sqlParams.sqlJoin[i]+' ';
            }
            strJoin = strJoin.slice(0,-1);  
        }
        //si tiene where
        var strWhere = '';
        if(sqlParams.sqlWhere != undefined){
            for(let i in sqlParams.sqlWhere){                
                strWhere += sqlParams.sqlWhere[i];
            }              
        }
        var sql = `SELECT                        
                        `+strCols+` 
                   FROM `+tabla+` AS T1  
                   `+strJoin+`
                   WHERE 
                        T1.activo = 1
                        `+strWhere+`
                        `+andFechas+`
                        `+andEmpresa+`
                        `+strSearch+`                     
                   ORDER BY T1.id LIMIT `+offsetRecord+','+showRecords;      

        connection.query(sql, function(error, rows1) {
            if (error) {
                 callback(null, {
                    "msg": "error",
                    "detail": error.code
                });
            } else {// el total de filas
                var sql = `SELECT                        
                                COUNT(T1.id) AS total 
                           FROM `+tabla+` AS T1  
                           `+strJoin+`
                           WHERE 
                                T1.activo = 1
                                `+strWhere+`
                                `+andFechas+`
                                `+andEmpresa+`
                                `+strSearch;      

                connection.query(sql, function(error, rows2) {
                    if (error) {
                         callback(null, {
                            "msg": "error",
                            "detail": error.code
                        });
                    } else {
                        var result = {
                            rows  : rows1,
                            total : rows2
                        }    
                        callback(null, result);
                    }
                });
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