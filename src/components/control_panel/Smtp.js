/**
* CLASS Smtp
*
* Contiene el contenedor principal de empresas
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import DataGrid from '../data_grid/DataGrid';

class Smtp extends Component {
  	render() {      
        let sqlParams = {
                            sqlCols : [
                                'correo', 
                                'servidor',
                                'puerto',
                                'autenticacion',
                                'password',
                                'seguridad_smtp'
                            ],
                            sqlEmpresa : "true",  
                            fieldSearch : [
                                'correo'                        
                            ],                                                                                                       
                        }                 
        return (//carga el componente que contiene la grilla de datos            
            <DataGrid titulo='Configuracion SMTP' 
                      funcionClick={this.props.funcionClick} 
                      parametro={this.props.parametro}
                      colsData={[ 
                                    {
                                        type  : 'bd',
                                        label : 'Servidor SMTP',
                                        field : 'servidor'
                                    },
                                    {
                                        type  : 'bd',
                                        label : 'Usuario',
                                        field : 'correo'
                                    },
                                    {
                                        type  : 'bd',
                                        label : 'Password',
                                        field : 'password'
                                    },
                                    {
                                        type  : 'bd',
                                        label : 'Puerto',
                                        field : 'puerto',                                        
                                    },
                                    {
                                        type  : 'bd',
                                        label : 'Seguridad',
                                        field : 'seguridad_smtp',                                        
                                    },
                                    {
                                        type  : 'bd',
                                        label : 'Autenticacion',
                                        field : 'autenticacion',                                        
                                    },
                                ]} 
                      sqlParams = { sqlParams } 
                      automatica="true"
                      botonNuevo="true"
                      formFields={[
                                    {
                                        label : 'Servidor SMTP',
                                        field : 'servidor',
                                        type  : 'text',
                                        validation : '',
                                        required : 'true'                                        
                                    },
                                    {
                                        label : 'Usuario',
                                        field : 'correo',
                                        type  : 'text',
                                        validation : 'email',
                                        required : 'true'                                        
                                    },
                                    {
                                        label : 'Password',
                                        field : 'password',
                                        type  : 'text',
                                        validation : '',
                                        required : 'true'                                        
                                    },
                                    {
                                        label : 'Puerto',
                                        field : 'puerto',
                                        type  : 'text',
                                        validation : 'entero',
                                        required : 'true'                                        
                                    },                                    
                                    {
                                        label : 'Seguridad',
                                        field : 'seguridad_smtp',
                                        type  : 'select',
                                        validation : '',
                                        required : 'true',
                                        dinamic : 'false',
                                        valueName : 'nombre',
                                        options :  [{
                                                        id: 'no',
                                                        nombre: 'Ninguna',
                                                    },
                                                    {
                                                        id: 'tls',
                                                        nombre: 'TLS', 
                                                    },
                                                    {
                                                        id: 'ssl',
                                                        nombre: 'SSL', 
                                                    }],                                        
                                    },  
                                    ,                                    
                                    {
                                        label : 'Autenticacion',
                                        field : 'autenticacion',
                                        type  : 'select',
                                        validation : '',
                                        required : 'true',
                                        dinamic : 'false',
                                        valueName : 'nombre',
                                        options :  [{
                                                        id: 'no',
                                                        nombre: 'No',
                                                    },
                                                    {
                                                        id: 'si',
                                                        nombre: 'Si', 
                                                    }],                                        
                                    },
                                    {
                                        label : '',
                                        field : 'id_empresa',
                                        type  : 'campo_empresa',
                                        validation : '',
                                        required : 'true'                                        
                                    },                                                                 
                                ]}                     
                      apiField={'companies_smtp'}
                      mainContainer='Smtp'/>              
        )
    } 
}

export default Smtp