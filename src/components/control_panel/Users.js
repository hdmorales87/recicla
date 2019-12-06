/**
* CLASS Users
*
* Contiene el contenedor principal de los usuarios
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import DataGrid from '../data_grid/DataGrid';
import globalState from '../configuration/GlobalState';
import {guardaAccesoEmpresas} from '../api_calls/ApiCalls';
import Window from '../window/Window';
import {modalLoading} from '../configuration/GlobalFunctions';
import alertify from 'alertifyjs';

class Users extends Component {    
    colFuncion(idUser){
        globalState.dispatch({
                type   : "windowAccesoEmpresas",
                params : {
                              visible : true,
                              params  : {
                                            idUser : idUser,
                                            idWin  : "windowAccesoEmpresas"//identificador de la ventana
                                        }
                         }
            }); 
    }
    guardaAccesosEmpresas(){
        var objEmpresas = globalState.getState().configEmpresas;
        var objWindow   = globalState.getState().windowAccesoEmpresas;
        var arrayAccesoEmpresas = [];
        for(var id in objEmpresas){
            if(objEmpresas[id] === true){
                arrayAccesoEmpresas.push(id);                
            }
        }
        modalLoading(true);
        guardaAccesoEmpresas(objWindow.params.idUser,arrayAccesoEmpresas).then(response => { 
            modalLoading(false);
            globalState.dispatch({
                type   : "windowAccesoEmpresas",
                params : {
                              visible : false,                              
                         }
            });
        })
        .catch(function (error) {
            modalLoading(false);
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+error);
        });
    }
    render() {     
        var id_empresa = globalState.getState().companyData[0].id; 
        var idRol = globalState.getState().idRol;
        var botonAccesos = '';
        if(idRol === 1){
            botonAccesos = {
                                type  : 'manual',
                                label : '',
                                icon  : 'settings',
                                colFuncion : this.colFuncion.bind(this)
                            }
        } 
        let sqlParams = {
                            sqlCols : [
                                'T1.id',
                                'T1.id_tipo_documento',
                                'DT.nombre AS tipo_documento',
                                'T1.documento',
                                'T1.nombre',
                                'T1.primer_nombre',
                                'T1.segundo_nombre',
                                'T1.primer_apellido',
                                'T1.segundo_apellido',
                                'T1.email',
                                'T1.direccion',
                                'T1.telefono',
                                'T1.id_rol',
                                'RL.nombre AS rol',
                                'T1.imagen_usuario'
                            ],                                                      
                            sqlJoin : [
                                'INNER JOIN document_types AS DT ON (DT.id = T1.id_tipo_documento)', 
                                'INNER JOIN roles AS RL ON (RL.id = T1.id_rol)' 
                            ],
                            fieldSearch : [
                                'T1.nombre',
                                'T1.documento',
                                'T1.email',
                                'T1.direccion',
                                'T1.telefono',                                
                            ],
                            sqlEmpresa : "true"                                                                           
                        }             
        return (//carga el componente que contiene la grilla de datos 
            <div>            
                <DataGrid titulo='Usuarios' 
                          funcionClick={this.props.funcionClick}  
                          parametro={this.props.parametro}                      
                          colsData={[ 
                                          {
                                              type  : 'bd',
                                              label : 'Tipo',
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
                                          botonAccesos
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
                                            valueName : 'nombre',
                                            sqlParams : {
                                                            sqlCols : [
                                                                'id',
                                                                'nombre'                                
                                                            ],
                                                            sqlEmpresa : 'true'                                                                                                       
                                                        }                                            
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
                 <Window 
                      id = "windowAccesoEmpresas"                      
                      title='Configurar Accesos'
                      width='315px' 
                      height='80%'
                      tbar={[
                                {
                                    type : 'boton',
                                    icon : 'save',
                                    width : '100px',
                                    height : '60px',
                                    title : 'Guardar',
                                    function : this.guardaAccesosEmpresas.bind(this)
                                },
                            ]}
                      componente="WindowAccesoEmpresas"
                      params="" 
                  />
            </div>

        )
    } 
}

export default Users
