//llamamos la conexion
var connection = require('../bd/bd');

//creamos un objeto para ir almacenando todo lo que necesitemos
var DocumentTypeModel = {};

//obtenemos todos los tipos de documento
DocumentTypeModel.getDocumentTypes = function(userData, callback) {
    if (connection) {
        var searchWord   = '';
        var showRecords  = 100;   
        var offsetRecord = 0; 
        if(userData.hasOwnProperty('searchWord')){
            searchWord   = userData.searchWord;
            showRecords  = userData.showRecords;   
            offsetRecord = userData.offsetRecord; 
        }                
        connection.query('SELECT * FROM document_types WHERE nombre LIKE \'%'+searchWord+'%\' ORDER BY id LIMIT '+offsetRecord+','+showRecords, function(error, rows) {
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

//obtenemos la cuenta de los tipos de documento
DocumentTypeModel.getDocumentTypesRows = function(userData, callback) {
    if (connection) {
        var searchWord   = userData.searchWord;        
        connection.query('SELECT COUNT(*) AS total FROM document_types WHERE nombre LIKE \'%'+searchWord+'%\'', function(error, rows) {
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

//almacenar un tipo de documento
DocumentTypeModel.insertDocumentType = function(userData, callback) {
    if (connection) {        
        connection.query('INSERT INTO document_types SET ?', userData, function(error, result) {
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

//actualizar un tipo de documento
DocumentTypeModel.updateDocumentType = function(userData, callback) {     
    if (connection) {
        var sql = 'UPDATE document_types SET nombre = ' + connection.escape(userData.nombre) + 
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

//eliminar un tipo de documento pasando la id a eliminar
DocumentTypeModel.deleteDocumentType = function(id, callback) {    
    if (connection) {
        var sqlExists = 'SELECT COUNT(*) AS cuenta FROM document_types WHERE id = ' + connection.escape(id);
        connection.query(sqlExists, function(err, row) {       
            //si existe la id del tipo de documento a eliminar  
            if (row[0].cuenta > 0) {
                var sql = 'DELETE FROM document_types WHERE id = ' + connection.escape(id);                
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
module.exports = DocumentTypeModel;