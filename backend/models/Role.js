//llamamos la conexion
var connection = require('../bd/bd');  
var md5 = require('md5');

//creamos un objeto para ir almacenando todo lo que necesitemos
var RoleModel = {};

//TRAER EL ROL
RoleModel.getRole = function(userData, callback) {
    if (connection) {
        var sql = 'SELECT * FROM roles WHERE documento = \''+userData+'\'';
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

//obtenemos todos los permisos
RoleModel.getPermisos = function(userData, callback) {    
    if (connection) {     
        connection.query(`SELECT
                                P.id,
                                P.nombre,
                                P.nivel,
                                R.id AS checked
                          FROM permisos  AS P
                          LEFT JOIN roles_permisos AS R ON(R.id_permiso = P.id AND R.id_rol = `+userData.idRol+`)
                          ORDER BY P.id_modulo,P.orden`, function(error, rows) {
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

//almacenar los permisos del rol
RoleModel.guardaPermisos = function(userData, callback) {
    if (connection) {
        var arrayPermisos = userData.arrayPermisos;
        var idRol = userData.idRol;
        var stringInsert = '';

        arrayPermisos.forEach(function(element) {
            stringInsert += '('+idRol+','+element+'),';
        });
        stringInsert = stringInsert.slice(0,-1);  
                
        connection.query('DELETE FROM roles_permisos WHERE id_rol = '+idRol, function(error, result) {
            if (error) {
                callback(null, {
                    "msg": "error",
                    "detail": error.code
                });
            } else {
                stringInsert = "INSERT INTO roles_permisos(id_rol,id_permiso) VALUES "+stringInsert;
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

//valida si el usuario tiene el permiso
RoleModel.validarPermiso = function(userData, callback) {    
    if (connection) {
        connection.query(`SELECT
                                COUNT(id) AS total                                
                          FROM roles_permisos
                          WHERE id_rol = `+userData.idRol+`
                                AND id_permiso = `+userData.idPermiso, function(error, rows) {
                                if (error) {
                                    callback(null, {
                                        "msg": "error",
                                        "detail": error.code
                                    });
                                } else {
                                    var permiso = false;                                    
                                    if(rows[0].total > 0 || userData.idRol == 1){
                                        permiso = true;
                                    }
                                    callback(null, {
                                        "msg": permiso                                        
                                    });
                                }
        });
    }
}

//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = RoleModel;