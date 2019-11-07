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
import globalState from '../configuration/GlobalState';

class Roles extends Component {
    colFuncion(idRow){
        console.log(idRow);
        globalState.dispatch({
                type   : "windowRolesPermisos",
                params : {
                              visible : true,
                              params  : {
                                            email : '',
                                            idWin : "windowRolesPermisos"//identificador de la ventana
                                        }
                         }
            }); 
    }
    guardaPermisos(){
        
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
                        width='300px' 
                        height='240px'
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