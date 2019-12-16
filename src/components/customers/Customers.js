/**
* CLASS Customers
*
* Contiene el contenedor principal de los clientes
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import DataGrid from '../data_grid/DataGrid';

class Customers extends Component {  	
  	render() {
        let sqlParams = {
                            sqlCols : [
                                'T1.id',
                                'T1.id_tipo_documento',
                                'DT.nombre AS tipo_documento',
                                'T1.documento',
                                'T1.nombre_comercial',
                                'T1.razon_social',
                                'T1.direccion',
                                'T1.telefono',
                                'T1.id_empresa'
                            ],
                            sqlJoin : [
                                'INNER JOIN document_types AS DT ON (DT.id = T1.id_tipo_documento)',                                
                            ],
                            fieldSearch : [
                                'T1.documento',
                                'T1.nombre_comercial',
                                'T1.razon_social',
                                'T1.direccion',
                                'T1.telefono',
                            ],
                            sqlEmpresa : "true",                                                
                        };  
  	  	return (  	  		  
  	  		  <DataGrid titulo='Clientes' 
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
                                        label : 'Razon Social',
                                        field : 'razon_social'
                                    },
                                    {
                                        type  : 'bd',
                                        label : 'Nombre Comercial',
                                        field : 'nombre_comercial'
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
                                        label : 'Nombre Comercial',
                                        field : 'nombre_comercial',
                                        type  : 'text',
                                        validation : 'mayusculas',
                                        required : 'true'
                                    },
                                    {
                                        label : 'Razon Social',
                                        field : 'razon_social',
                                        type  : 'text',
                                        validation : 'mayusculas',
                                        required : 'false'
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
                                        label : '',
                                        field : 'id_empresa',
                                        type  : 'campo_empresa',
                                        validation : '',
                                        required : 'true'                                        
                                    },
                                ]}                     
                      apiField = {'customers'}
                      permisoInsertUpdate="9"
                      permisoDelete="10"
                      mainContainer='Customers'/> 	
  	  	);
  	}
}

export default Customers
