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
                      colsHeaders={[ 'Tipo Documento','Documento','Nombre','Email','Direccion','Telefono' ]}
                      colsData={[ 'tipo_documento','documento','nombre','email','direccion','telefono' ]} 
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
                                    }
                                ]}                     
                      apiField = {'users'}
                      mainContainer='Users'/>

        )
    } 
}

export default Users
