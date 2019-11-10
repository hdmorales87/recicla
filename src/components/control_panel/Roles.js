/**
* CLASS Roles
*
* Contiene el contenedor principal de empresas
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import DataGrid from '../data_grid/DataGrid';
import Window from '../window/Window';
import {guardaPermisos} from '../api_calls/ApiCalls';
import globalState from '../configuration/GlobalState';
import alertify from 'alertifyjs';

class Roles extends Component {
    colFuncion(idRow){        
        globalState.dispatch({
                type   : "windowRolesPermisos",
                params : {
                              visible : true,
                              params  : {
                                            idRol : idRow,
                                            idWin : "windowRolesPermisos"//identificador de la ventana
                                        }
                         }
            }); 
    }
    guardaPermisos(){//almacena los permisos en un array para enviarlos
        var objPermisos = globalState.getState().configPermisos;
        var objWindow   = globalState.getState().windowRolesPermisos;
        var arrayPermisos = [];
        for(var id in objPermisos){
            if(objPermisos[id] === true){
                arrayPermisos.push(id);                
            }
        }
        
        guardaPermisos(objWindow.params.idRol,arrayPermisos).then(response => { 
            
        })
        .catch(function (error) {
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+error);
        });
    }
  	render() {                     
        return (//carga el componente que contiene la grilla de datos            
            <div>
                <DataGrid titulo='Roles' 
                          funcionClick={this.props.funcionClick} 
                          parametro={this.props.parametro} 
                          colsData={[ 
                                      {
                                          type  : 'bd',
                                          label : 'Nombre',
                                          field : 'nombre'
                                      },
                                      {
                                          type  : 'manual',
                                          label : '',
                                          icon  : 'settings',
                                          colFuncion : this.colFuncion.bind(this)
                                      }
                                   ]} 
                          automatica="true"
                          botonNuevo="true"
                          formFields={[
                                        {
                                            label : 'Nombre',
                                            field : 'nombre',
                                            type  : 'text',
                                            validation : 'mayusculas',
                                            required : 'true'
                                        },
                                        {
                                            label : '',
                                            field : 'id_empresa',
                                            type  : 'campo_empresa',
                                            validation : '',
                                            required : 'true'                                        
                                        },                                                                        
                                    ]}                     
                          apiField={'roles'}
                          mainContainer='Roles'/>  
                <Window 
                        id = "windowRolesPermisos"                      
                        title='Configurar Permisos'
                        width='315px' 
                        height='80%'
                        tbar={[
                                  {
                                      type : 'boton',
                                      icon : 'save',
                                      width : '100px',
                                      height : '60px',
                                      title : 'Guardar',
                                      function : this.guardaPermisos.bind(this)
                                  },
                              ]}
                        componente="WindowRolesPermisos"
                        params="" 
                    />
            </div>        
        )
    } 
}

export default Roles