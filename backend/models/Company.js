//llamamos la conexion
var connection = require('../bd/bd');  
var md5 = require('md5');

//creamos un objeto para ir almacenando todo lo que necesitemos
var CompanyModel = {};

//AUTENTICACION DEL USUARIO
CompanyModel.getCompany = function(userData, callback) {
    if (connection) {
        var sql = 'SELECT * FROM companies WHERE documento = \''+userData+'\'';
        connection.query(sql, function(error, row) {
            if (error) {                
                callback(null, {
                    "msg": "error",
                    "detail": error.code
                });
            } else {                           
                callback(null, row);                
            }
        });
    }
}

//obtenemos todos los usuarios
CompanyModel.getCompanies = function(userData, callback) {    
    if (connection) {
        var searchWord   = userData.searchWord;
        var showRecords  = userData.showRecords; 
        var offsetRecord = userData.offsetRecord;       
        connection.query('SELECT * FROM users WHERE '
                        +' nombre LIKE \'%'+searchWord+'%\' '
                        +' OR email LIKE \'%'+searchWord+'%\' '
                        +' OR username LIKE \'%'+searchWord+'%\' '
                        +' OR direccion LIKE \'%'+searchWord+'%\' '
                        +' OR telefono LIKE \'%'+searchWord+'%\' '
                        +' ORDER BY id LIMIT '+offsetRecord+','+showRecords, function(error, rows) {
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

//obtenemos la cuenta de los tipos de compra
CompanyModel.getCompaniesRows = function(userData, callback) {
    if (connection) {
        var searchWord   = userData.searchWord;          
        connection.query('SELECT COUNT(*) AS total FROM users WHERE '
                        +' nombre LIKE \'%'+searchWord+'%\' '
                        +' OR email LIKE \'%'+searchWord+'%\' '
                        +' OR username LIKE \'%'+searchWord+'%\' '
                        +' OR direccion LIKE \'%'+searchWord+'%\' '
                        +' OR telefono LIKE \'%'+searchWord+'%\' ', function(error, rows) {
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
CompanyModel.insertCompany = function(userData, callback) {
    if (connection) {         

        var username = userData.primer_nombre.substr(0,1)+userData.segundo_nombre.substr(0,1)+userData.primer_apellido+userData.segundo_apellido.substr(0,1);    
               
        connection.query('INSERT INTO users SET ?', userData, function(error, result) {
            if (error) {
                callback(null, {
                    "msg": "error",
                    "detail": error.code
                });
            } else {
                var id = result.insertId;
                var sql = 'UPDATE users SET'+ 
                          ' password = \''+md5('123456')+'\''+
                          ',username = \''+username.toLowerCase()+'\''+
                          ',nombre = \''+userData.primer_nombre+' '+userData.segundo_nombre+' '+userData.primer_apellido+' '+userData.segundo_apellido+'\'WHERE id = ' + result.insertId;
                console.log(sql); 
                connection.query(sql , function(error, result) {   
                    if (error) {
                        callback(null, {
                            "msg": "error",
                            "detail": error.code
                        });
                    } else { 
                        //devolvemos la última id insertada
                        callback(null, {
                            "insertId": id
                        });
                    }
                });
            }
        });
    }
}

//actualizar un usuario
CompanyModel.updateCompany = function(userData, callback) {     
    if (connection) {
        var primer_nombre = connection.escape(userData.primer_nombre)
        ,   segundo_nombre = connection.escape(userData.segundo_nombre)
        ,   primer_apellido = connection.escape(userData.primer_apellido)
        ,   segundo_apellido = connection.escape(userData.segundo_apellido);  

        var username = userData.primer_nombre.substr(0,1)+userData.segundo_nombre.substr(0,1)+userData.primer_apellido+userData.segundo_apellido.substr(0,1);    

        var sql = 'UPDATE users SET id_tipo_documento = ' + connection.escape(userData.id_tipo_documento) + 
               ', documento = ' + connection.escape(userData.documento) + 
               ', primer_nombre = ' + primer_nombre + 
               ', segundo_nombre = ' + segundo_nombre + 
               ', primer_apellido = ' + primer_apellido + 
               ', segundo_apellido = ' + segundo_apellido + 
               ', email = ' + connection.escape(userData.email) + 
               ', direccion = ' + connection.escape(userData.direccion) + 
               ', telefono = ' + connection.escape(userData.telefono) + 
               ', nombre = \''+userData.primer_nombre+' '+userData.segundo_nombre+' '+userData.primer_apellido+' '+userData.segundo_apellido+'\''+
               ', username = \''+username.toLowerCase()+'\''+                             
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

//eliminar un usuario pasando la id a eliminar
CompanyModel.deleteCompany = function(id, callback) {    
    if (connection) {
        var sqlExists = 'SELECT COUNT(*) AS cuenta FROM users WHERE id = ' + connection.escape(id);
        connection.query(sqlExists, function(err, row) {       
            //si existe la id del usuario a eliminar  
            if (row[0].cuenta > 0) {
                var sql = 'DELETE FROM users WHERE id = ' + connection.escape(id);                
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
module.exports = CompanyModel;