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
                      mainContainer='Customers'/> 	
  	  	);
  	}
}

export default Customers
