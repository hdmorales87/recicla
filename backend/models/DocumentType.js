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
        connection.query('SELECT * FROM document_types WHERE activo = 1 AND nombre LIKE \'%'+searchWord+'%\' ORDER BY id LIMIT '+offsetRecord+','+showRecords, function(error, rows) {
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
        connection.query('SELECT COUNT(*) AS total FROM document_types WHERE activo = 1 AND nombre LIKE \'%'+searchWord+'%\'', function(error, rows) {
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
module.exports = DocumentTypeModel;