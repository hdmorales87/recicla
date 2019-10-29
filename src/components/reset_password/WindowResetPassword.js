/**
* CLASS WindowResetPassword
*
* Contiene el componente para resetear el password
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import configJson from '../configuration/configuration.json';
import {divMouseOver,divMouseOut,validarEmail,modalLoadingRstPwd} from '../configuration/GlobalFunctions';
import {sendEmailPassword} from '../api_calls/ApiCalls';
import globalState from '../configuration/GlobalState';
import alertify from 'alertifyjs';
import './windowResetPassword.css';

class WindowResetPassword extends Component {
    constructor(props) {        
        super(props);   
        this.state = {
            email : this.props.params.email
        };  
        //console.log();   
    }    
    handleContinuarBtn(e){
        var email = this.state.email; 
        if(!validarEmail(email)){
            alertify.alert('Error!', 'No es una cuenta de Email Valida');
        }
        else{
            var modalLoading = "modalLoading";//con esto se que modal abrir
            if(this.props.params.idWin === 'windowResetPassword1'){
                modalLoading = "modalLoading1";
            }
            modalLoadingRstPwd(true,modalLoading);
            //enviar al correo la recuperacion de la contraseña        
            sendEmailPassword(email).then(response => { 
                modalLoadingRstPwd(false,modalLoading);            
                response = response.data;
                if(response.msg === 'error'){
                    alertify.alert('Error!', 'Ha ocurrido un error enviando el correo a '+email+'!<br />Codigo de Error: '+response.detail); 
                }
                else if(response.msg === 'not_found'){
                    alertify.alert('Error!', 'El usuario '+email+' No se encuentra en la base de datos!'); 
                }
                else {                    
                    alertify.alert('Envio Exitoso!', 'Se ha enviado un correo a '+email+', esta solicitud tiene un plazo de 1 hora!'); 
                    globalState.dispatch({
                        type   : this.props.params.idWin,
                        params : {
                            visible : false,                    
                        }
                    });               
                }
            })
            .catch(function (error) {
                alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+error);
            });
        }        
    }
    handleChangeEmail(e){
        this.setState({email : e.target.value});
    }        
  	render() { 
        var disabled = 'disabled';
        if(this.props.params.idWin === 'windowResetPassword1'){
            disabled = '';
        }       
  	  	return (
                <div id="WindowContentResetPassword">                   
                    <div id="ContentResetPassword">
                        <div className="text">A continuacion enviaremos el link con las instrucciones para cambiar tu password a tu cuenta de correo</div>
                        <div className="formContentField" style={{width:'calc(100% - 20px)',minHeight:'30px', display:'block', maxWidth : '100%'}}> 
                            <input type="text" style={{width:'100%'}} className="withLabel" name="username" value={this.state.email} disabled={disabled} onChange={this.handleChangeEmail.bind(this)} /> 
                         </div>
                        <div id="divBtnReset" className="divBtnReset" style={{width:'50px'}}> 
                            <button id="resetPsswdBtn" style={{backgroundColor:configJson.windowColor}} className="save" onClick={this.handleContinuarBtn.bind(this)} onMouseOut={divMouseOut.bind(this,"resetPsswdBtn",configJson.windowColor)} onMouseOver={divMouseOver.bind(this,"resetPsswdBtn",configJson.windowColor)}>Continuar</button> 
                        </div>                        
                    </div>
                </div>  				
			  );
  	}
}

export default WindowResetPassword