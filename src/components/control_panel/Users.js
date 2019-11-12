/**
* CLASS Users
*
* Contiene el contenedor principal de los usuarios
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import DataGrid from '../data_grid/DataGrid';

class Users extends Component {  
  	render() {             
        return (//carga el componente que contiene la grilla de datos             
            <DataGrid titulo='Usuarios' 
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
                                          label : 'Email',
                                          field : 'email'
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
                                        label : 'Primer Nombre',
                                        field : 'primer_nombre',
                                        type  : 'text',
                                        validation : 'mayusculas',
                                        required : 'true'
                                    },
                                    {
                                        label : 'Segundo Nombre',
                                        field : 'segundo_nombre',
                                        type  : 'text',
                                        validation : 'mayusculas',
                                        required : 'false'
                                    },
                                    {
                                        label : 'Primer Apellido',
                                        field : 'primer_apellido',
                                        type  : 'text',
                                        validation : 'mayusculas',
                                        required : 'true'
                                    },
                                    {
                                        label : 'Segundo Apellido',
                                        field : 'segundo_apellido',
                                        type  : 'text',
                                        validation : 'mayusculas',
                                        required : 'false'
                                    },
                                    {
                                        label : 'Rol de Seguridad',
                                        field : 'id_rol',
                                        type  : 'select',
                                        validation : '',
                                        required : 'true',
                                        dinamic : 'true',
                                        apiField : 'roles',
                                        valueName : 'nombre'
                                    },
                                    {
                                        label : 'Correo Electronico',
                                        field : 'email',
                                        type  : 'text',
                                        validation : 'email',
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
                                        label : '',
                                        field : 'id_empresa',
                                        type  : 'campo_empresa',
                                        validation : '',
                                        required : 'true'                                        
                                    },
                                ]}                     
                      apiField = {'users'}
                      mainContainer='Users'/>

        )
    } 
}

export default Users
