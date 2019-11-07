/**
* CLASS WindowRolesPermisos
*
* Contiene el componente para resetear el password
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import configJson from '../configuration/configuration.json';
import {divMouseOver,divMouseOut,validarEmail,modalLoadingRstPwd} from '../configuration/GlobalFunctions';
import {listadoPermisos} from '../api_calls/ApiCalls';
import globalState from '../configuration/GlobalState';
import alertify from 'alertifyjs';
//import './windowResetPassword.css';

class WindowRolesPermisos extends Component {
    constructor(props) {        
        super(props);   
        this.state = {
            objPermisos : ''
        };
    } 
    componentWillMount(){
        listadoPermisos().then(response => { 
            response = response.data;
            if(response.msg === 'error'){//aqui no me dejara continuar si la empresa noe xiste
                alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail); 
            }
            else{
                this.setState({objPermisos:response});
            }
        })
        .catch(function (error) {
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+error);
        });
    }     
  	render() { 
        console.log(this.state.objPermisos);
        var disabled = 'disabled';
        if(this.props.params.idWin === 'windowResetPassword1'){
            disabled = '';
        }       
  	  	return (
                <div id="WindowContentResetPassword">                   
                    <div id="ContentResetPassword">
                        <div className="text">A continuacion enviaremos el link con las instrucciones para cambiar tu password a tu cuenta de correo</div>
                        <div className="formContentField" style={{width:'calc(100% - 20px)',minHeight:'30px', display:'block', maxWidth : '100%'}}> 
                            
                         </div>
                                               
                    </div>
                </div>  				
			  );
  	}
}

export default WindowRolesPermisos