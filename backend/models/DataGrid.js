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

//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = DataGridModel;