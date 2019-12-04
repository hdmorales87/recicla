/**
* CLASS DocumentTypes
*
* Contiene el contenedor principal de tipos de documento
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import DataGrid from '../data_grid/DataGrid';

class DocumentTypes extends Component {
  	render() {     
        let sqlParams = { 
                            fieldSearch : [
                                'nombre',                                
                            ],
                            sqlEmpresa : "false",                            
                            filtroFechas : "false",                                                 
                        };                 
        return (//carga el componente que contiene la grilla de datos            
            <DataGrid titulo='Típos de Documento' 
                      funcionClick={this.props.funcionClick} 
                      parametro={this.props.parametro}
                      colsData={[ 
                                    {
                                        type  : 'bd',
                                        label : 'Nombre',
                                        field : 'nombre'
                                    },
                                ]} 
                      sqlParams = { sqlParams }
                      automatica="true"
                      botonNuevo="true"
                      formFields={[
                                    {
                                        label : 'Nombre',
                                        field : 'nombre',
                                        type  : 'text',
                                        validation : 'mayusculas',
                                        required : 'true'
                                    }                                    
                                ]}                     
                      apiField={'document_types'}
                      mainContainer='DocumentTypes'/>              
        )
    } 
}

export default DocumentTypes