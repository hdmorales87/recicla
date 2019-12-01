var connection = require('../bd/bd');  

//creamos un objeto para ir almacenando todo lo que necesitemos
var DataGridModel = {};

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