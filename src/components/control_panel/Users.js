import React, { Component } from 'react';
import DataGrid from '../data_grid/DataGrid';
import Button from 'react-bootstrap/Button';

class Users extends Component {    
  	handleNewButton(){
        this.props.funcionClick('FormUsers');
        //console.log(this.props.funcionClick);
    }    
  	render() {
        const path = 'http://localhost:5000/';        
        //if (this.state.empleados.length > 0) {
        return (            
            <DataGrid titulo='Usuarios' 
                      funcionClick={this.props.funcionClick}  
                      parametro={this.props.parametro}                     
                      colsHeaders={[ 'Tipo Documento','Documento','Nombre','Email','Username','Direccion','Telefono' ]}
                      colsData={[ 'tipo_documento','documento','nombre','email','username','direccion','telefono' ]} 
                      formFields={[
                                    {
                                        label : 'Tipo de Documento',
                                        field : 'id_tipo_documento',
                                        type  : 'select',
                                        validation : '',
                                        required : 'true',
                                        dinamic : 'true',
                                        apiUrl : path+'document_types',
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
                                    }
                                ]}                     
                      apiUrl = {path+'users'}
                      mainContainer='Users'/>

        )
    } 
}

export default Users
