/**
* CLASS Smtp
*
* Contiene el contenedor principal de empresas
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import FormDataGrid from '../data_grid/FormDataGrid';
import {cargarFilas} from '../api_calls/ApiCalls';
import alertify from 'alertifyjs';
import '../../css/alertify.css';

class Smtp extends Component {

    constructor(props){
        super(props);
        this.state={
            idRow : 0
        };    
        let sqlParams = {
                            sqlCols : [
                                'id',
                                'correo',
                                'servidor',
                                'puerto',
                                'autenticacion',
                                'password',
                                'seguridad_smtp'                                
                            ],
                            sqlEmpresa : "true",
                            mode : 'rows'                                                 
                        }

        cargarFilas('companies_smtp','',1,0,'','',sqlParams,'rows')
        .then(res => {
            var response = res.data; 
            if (response.msg === "error") {
                alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail);
            } 
            else{
                let idRow = 0;
                if(response.length > 0){
                    idRow = response[0];
                }
                this.setState({ idRow: idRow });
            }
        })
        .catch( err => {            
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+err);                            
        });     
    }
  	render() {       
        return (//carga el componente que contiene la grilla de datos            
            <FormDataGrid 
                funcionClick = {this.props.funcionClick} 
                parametro = {
                                {
                                    idRow : this.state.idRow,
                                    mainContainer : 'ControlPanel',
                                    formulario : true,
                                    titulo : 'Configuracion SMTP',
                                    apiField : 'companies_smtp', 
                                    enableBtnEdit : true,
                                    enableBtnDel : true,
                                    formFields :  [{
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
                                                    }] 
                                }
                            } 
                        
            />             
        )
    } 
}

export default Smtp