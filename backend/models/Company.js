//llamamos la conexion
var connection = require('../bd/bd');  
var md5 = require('md5');

//creamos un objeto para ir almacenando todo lo que necesitemos
var CompanyModel = {};

//TRAER LA EMPRESA
CompanyModel.getCompany = function(userData, callback) {
    if (connection) {
        var sql = 'SELECT * FROM companies WHERE documento = \''+userData+'\' AND activo = 1';
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

//obtenemos todos las compañias
CompanyModel.getCompanies = function(userData, callback) {    
    if (connection) {
        var searchWord   = userData.searchWord;
        var showRecords  = userData.showRecords; 
        var offsetRecord = userData.offsetRecord;            
        connection.query(`SELECT
                                C.id_tipo_documento, 
                                DT.nombre AS tipo_documento,
                                C.documento,
                                C.razon_social,
                                C.nombre_comercial
                          FROM companies AS C
                          INNER JOIN document_types AS DT ON (DT.id = C.id_tipo_documento)
                          WHERE 
                                C.activo = 1
                                AND (C.documento LIKE \'%`+searchWord+`%\'
                                OR C.razon_social LIKE \'%`+searchWord+`%\'
                                OR C.nombre_comercial LIKE \'%`+searchWord+`%\')                       
                          ORDER BY C.id LIMIT `+offsetRecord+`,`+showRecords, function(error, rows) {
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

//obtenemos la cuenta de las empresas
CompanyModel.getCompaniesRows = function(userData, callback) {
    if (connection) {
        var searchWord   = userData.searchWord; 
        connection.query(`SELECT 
                                COUNT(C.id) AS total
                          FROM companies AS C
                          INNER JOIN document_types AS DT ON (DT.id = C.id_tipo_documento)
                          WHERE 
                                C.activo = 1
                                AND (C.documento LIKE \'%`+searchWord+`%\'
                                OR C.razon_social LIKE \'%`+searchWord+`%\'
                                OR C.nombre_comercial LIKE \'%`+searchWord+`%\')                       
                          ORDER BY C.id`, function(error, rows) {
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

//almacenar una empresa
CompanyModel.insertCompany = function(userData, callback) {
    if (connection) {                  
        connection.query('INSERT INTO companies SET ?', userData, function(error, result) {
            if (error) {
                callback(null, {
                    "msg": "error",
                    "detail": error.code
                });
            } else {
                var id = result.insertId;                
                //devolvemos la última id insertada
                callback(null, {
                    "insertId": id
                }); 
            }
        });
    }
}

//actualizar una empresa
CompanyModel.updateCompany = function(userData, callback) {     
    if (connection) {
        var id_tipo_documento = connection.escape(userData.id_tipo_documento)
        ,   documento = connection.escape(userData.documento)
        ,   razon_social = connection.escape(userData.razon_social)
        ,   nombre_comercial = connection.escape(userData.nombre_comercial);          

        var sql =  'UPDATE companies SET id_tipo_documento = ' + connection.escape(userData.id_tipo_documento) + 
                   ', documento = ' + connection.escape(userData.documento) + 
                   ', primer_nombre = ' + primer_nombre + 
                   ', razon_social = ' + razon_social + 
                   ', nombre_comercial = ' + nombre_comercial +                                             
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

//eliminar una empresa pasando la id a eliminar
CompanyModel.deleteCompany = function(id, callback) {    
    if (connection) {
        var sqlExists = 'SELECT COUNT(*) AS cuenta FROM companies WHERE activo = 1 AND id = ' + connection.escape(id);
        connection.query(sqlExists, function(err, row) {       
            //si existe la id del usuario a eliminar  
            if (row[0].cuenta > 0) {
                var sql = 'UPDATE companies SET activo = 0 WHERE id = ' + connection.escape(id);                
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

//obtenemos todas las empresas
CompanyModel.listadoAccesoEmpresas = function(userData, callback) {    
    if (connection) {   
        var sql = `SELECT
                         C.id,
                         C.nombre_comercial,                               
                         U.id AS checked
                   FROM companies  AS C
                   LEFT JOIN users_companies AS U ON(U.id_company = C.id AND U.id_user = `+userData.idUser+`)
                   WHERE C.activo=1
                   ORDER BY C.nombre_comercial`;          
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

//almacenar los accesos del usuario
CompanyModel.guardaAccesoEmpresas = function(userData, callback) {
    if (connection) {
        var arrayEmpresas = userData.arrayEmpresas;
        var idUser = userData.idUser;
        var stringInsert = '';

        arrayEmpresas.forEach(function(element) {
            stringInsert += '('+idUser+','+element+'),';
        });
        stringInsert = stringInsert.slice(0,-1);  
                
        connection.query('DELETE FROM users_companies WHERE id_user = '+idUser, function(error, result) {
            if (error) {
                callback(null, {
                    "msg": "error",
                    "detail": error.code
                });
            } else {
                stringInsert = "INSERT INTO users_companies(id_user,id_company) VALUES "+stringInsert;
                connection.query(stringInsert, function(error, result) {
                    if (error) {
                        callback(null, {
                            "msg": "error",
                            "detail": error.code
                        });
                    } else {
                        callback(null, {
                            "msg": "success"
                        }); 
                    }
                });                
            }
        });
    }
}

//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = CompanyModel;