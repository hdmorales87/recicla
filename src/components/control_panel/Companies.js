/**
* CLASS Companies
*
* Contiene el contenedor principal de empresas
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import DataGrid from '../data_grid/DataGrid';

class Companies extends Component {
  	render() {                     
        return (//carga el componente que contiene la grilla de datos            
            <DataGrid titulo='Empresas' 
                      funcionClick={this.props.funcionClick} 
                      parametro={this.props.parametro}                      
                      colsHeaders={[ 'Tipo Documento','Documento','razon_social','nombre_comercial' ]}
                      colsData={[ 'tipo_documento','documento','razon_social','nombre_comercial']} 
                      automatica="true"
                      botonNuevo="true"
                      formFields={[
                                    {
                                        label : 'Tipo de Documento',
                                        field : 'id_tipo_documento',
                                        type  : 'select',
                                        validation : '',
                                        required : 'true',
                                        dinamic : 'true',
                                        apiField : 'document_types',
                                        valueName : 'nombre'
                                    },                                    
                                    {
                                        label : 'Documento',
                                        field : 'documento',
                                        type  : 'text',
                                        validation : 'entero',
                                        required : 'true'                                        
                                    },
                                    {
                                        label : 'Razon Social',
                                        field : 'razon_social',
                                        type  : 'text',
                                        validation : 'mayusculas',
                                        required : 'true'
                                    },
                                    {
                                        label : 'Nombre Comercial',
                                        field : 'nombre_comercial',
                                        type  : 'text',
                                        validation : 'mayusculas',
                                        required : 'true'
                                    }                                                                         
                                ]}                     
                      apiField={'companies'}
                      mainContainer='Companies'/>              
        )
    } 
}

export default Companies