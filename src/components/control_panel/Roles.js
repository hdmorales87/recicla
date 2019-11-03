/**
* CLASS Roles
*
* Contiene el contenedor principal de empresas
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import DataGrid from '../data_grid/DataGrid';

class Roles extends Component {
  	render() {                     
        return (//carga el componente que contiene la grilla de datos            
            <DataGrid titulo='Roles' 
                      funcionClick={this.props.funcionClick} 
                      parametro={this.props.parametro}                      
                      colsHeaders={[ 'Nombre' ]}
                      colsData={[ 'nombre']} 
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
        )
    } 
}

export default Roles