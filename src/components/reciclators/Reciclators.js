/**
* CLASS Reciclators
*
* Contiene el contenedor principal de los Recicladores
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import DataGrid from '../data_grid/DataGrid';

class Reciclators extends Component {  	
  	render() {
        let sqlParams = {
                            sqlCols : [
                                'T1.id',
                                'T1.id_tipo_documento',
                                'DT.nombre AS tipo_documento',
                                'T1.documento',
                                'T1.nombre',
                                'T1.direccion',
                                'T1.telefono',
                                'T1.celular',
                                'T1.id_tipo_producto',
                                'T1.id_empresa',
                                'PT.nombre AS caracterizacion'
                            ],
                            sqlJoin : [
                                'INNER JOIN product_types AS PT ON (PT.id = T1.id_tipo_producto)', 
                                'INNER JOIN document_types AS DT ON (DT.id = T1.id_tipo_documento)'                                
                            ],
                            fieldSearch : [
                                'T1.documento',
                                'T1.nombre',
                                'T1.direccion',
                                'T1.telefono',
                                'T1.celular'
                            ],
                            sqlEmpresa : "true",                                                
                        }; 
  	  	return (  	  		  
  	  		<DataGrid titulo='Recicladores' 
                      funcionClick={this.props.funcionClick}  
                      parametro={this.props.parametro}
                      colsData={[ 
                                    {
                                        type  : 'bd',
                                        label : 'Tipo Documento',
                                        field : 'tipo_documento'
                                    },
                                    {
                                        type  : 'bd',
                                        label : 'Documento',
                                        field : 'documento'
                                    },
                                    {
                                        type  : 'bd',
                                        label : 'Nombre',
                                        field : 'nombre'
                                    },
                                    {
                                        type  : 'bd',
                                        label : 'Direccion',
                                        field : 'direccion'
                                    },
                                    {
                                        type  : 'bd',
                                        label : 'Telefono',
                                        field : 'telefono'
                                    },
                                    {
                                        type  : 'bd',
                                        label : 'Celular',
                                        field : 'celular'
                                    },                                    
                                    {
                                        type  : 'bd',
                                        label : 'Caracterizacion',
                                        field : 'caracterizacion'
                                    },
                                ]}
                      sqlParams = { sqlParams } 
                      automatica="true"
                      botonNuevo="true" 
                      botonesExportar="true"
                      formFields={[
                                    {
                                        label : 'Tipo de Documento',
                                        field : 'id_tipo_documento',
                                        type  : 'select',
                                        validation : '',
                                        required : 'true',
                                        dinamic : 'true',
                                        apiField : 'document_types',
                                        valueName : 'nombre',
                                        sqlParams : {
                                                        sqlCols : [
                                                            'id',
                                                            'nombre'                                
                                                        ],                                                                                                       
                                                    } 
                                    },                                    
                                    {
                                        label : 'Documento',
                                        field : 'documento',
                                        type  : 'text',
                                        validation : 'entero',
                                        required : 'true'                                        
                                    },
                                    {
                                        label : 'Nombre Completo',
                                        field : 'nombre',
                                        type  : 'text',
                                        validation : 'mayusculas',
                                        required : 'true'
                                    },                                                                      
                                    {
                                        label : 'Direccion',
                                        field : 'direccion',
                                        type  : 'text',
                                        validation : 'mayusculas',
                                        required : 'true'
                                    },
                                    {
                                        label : 'Telefono',
                                        field : 'telefono',
                                        type  : 'text',
                                        validation : 'mayusculas',
                                        required : 'true'
                                    },
                                    {
                                        label : 'Celular',
                                        field : 'celular',
                                        type  : 'text',
                                        validation : 'mayusculas',
                                        required : 'true'
                                    },
                                    {
                                        label : 'Caracterizacion',
                                        field : 'id_tipo_producto',
                                        type  : 'select',
                                        validation : '',
                                        required : 'true',
                                        dinamic : 'true',
                                        apiField : 'product_types',
                                        valueName : 'nombre',
                                        sqlParams : {
                                                        sqlCols : [
                                                            'id',
                                                            'nombre'                                
                                                        ], 
                                                        andEmpresa : 'true'                                                                                                      
                                                    }
                                    },
                                    {
                                        label : '',
                                        field : 'id_empresa',
                                        type  : 'campo_empresa',
                                        validation : '',
                                        required : 'true'                                        
                                    },
                                ]}                     
                      apiField = {'reciclators'}
                      mainContainer='Reciclators'/> 	
  	  	);
  	}
}

export default Reciclators
