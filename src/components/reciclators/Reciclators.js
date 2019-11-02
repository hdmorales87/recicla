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
  	  	return (  	  		  
  	  		<DataGrid titulo='Recicladores' 
                      funcionClick={this.props.funcionClick}  
                      parametro={this.props.parametro}                     
                      colsHeaders={[ 'Tipo Documento','Documento','Nombre','Direccion','Telefono','Celular','Caracterizacion' ]}
                      colsData={[ 'tipo_documento','documento','nombre','direccion','telefono','celular','caracterizacion' ]} 
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
                                        valueName : 'nombre'
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
