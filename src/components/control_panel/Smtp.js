/**
* CLASS Smtp
*
* Contiene el contenedor principal de la configuracion SMTP
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import FormDataGrid from '../data_grid/FormDataGrid';
import TBar from '../tbar/TBar';
import {cargarFilas,checkSMTP} from '../api_calls/ApiCalls';
import {modalLoading} from '../configuration/GlobalFunctions';
import alertify from 'alertifyjs';
import globalState from '../configuration/GlobalState';
import '../../css/alertify.css';

class Smtp extends Component {

    constructor(props){
        super(props);
        this.state={
            idRow : 0,
            btnCheck : 'none'
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
                let display = 'none';
                if(response.length > 0){
                    idRow = response[0];
                    display = 'block';
                }
                this.setState({ idRow: idRow,btnCheck: display });
            }
        })
        .catch( err => {            
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+err);                            
        });     
    }
    validaConfiguracion(){
        var email = globalState.getState().userData[0].email;
        var id_empresa = globalState.getState().companyData[0].id;
        modalLoading(true);
        checkSMTP(email,id_empresa)
        .then(response => {
            modalLoading(false);
            response = response.data;
            if(response.msg === 'error'){
                alertify.alert('Configuracion Incorrecta!', 'Ha ocurrido un error enviando el correo a '+email+'!<br />Codigo de Error: '+response.detail); 
            }           
            else {                    
                alertify.alert('Prueba Exitosa!', 'Se ha enviado un correo a '+email+'!');                               
            }
        })
        .catch( err => { 
            modalLoading(false);           
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+err);                            
        });     

    }
  	render() {          
        return (//carga el componente que contiene el formulario
            <div>
                <TBar
                    items={[
                              {
                                  type : 'boton',
                                  icon : 'done',
                                  width : '100px',
                                  height : '60px',
                                  title : 'Validar',
                                  display : this.state.btnCheck,
                                  function : this.validaConfiguracion.bind(this)
                              },
                          ]}
                    length = '1'
                />            
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
                                                                        }]                                        
                                                        },                                  
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
            </div>              
        )
    } 
}

export default Smtp