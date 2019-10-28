/**
* CLASS ResetPasswordForm
*
* Contiene el componente para resetear el password despues de dar link al correo
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import configJson from '../configuration/configuration.json';
import {checkToken} from '../api_calls/ApiCalls';
import logo_login1 from './../../images/logo_login1.png?v1.0';
var base64     = require('base-64');

class ResetPasswordForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			tokenValid : 'false',
			token : this.props.match.params.token,
			email : base64.decode(this.props.match.params.user)
		}
	}
	componentDidMount(){
		//chequea si el token es valido
		checkToken(this.state.email,this.state.token).then(response => {             
            response = response.data;
            if(response.msg === 'error'){
            	this.setState({tokenValid : 'error'});               
            }
            else {
            	this.setState({tokenValid : response.msg });
            }                      
        })
        .catch(function (error) {
            //...
        });
	}

	render() {  
		var token = this.state.token;
		var date  = base64.decode(token);
		date = new Date(date);
		date = date.getTime();
        //vigencia del token
        var currentDate = new Date().getTime();
		var dateDiff    = currentDate-date;
		var seconds     = dateDiff/1000;         

		return <div style={{background:'#efefef',width:'100%',height:'100%',overflow:'hidden'}}>
                    <div className="adM">
                    </div>
                    <div style={{width:'calc(100% - 40px)',maxWidth:'600px',height:'95px',padding:'20px',margin:'0 auto'}}>
                        <div className="adM">
                        </div>
                        <img src={logo_login1} style={{width:'250px'}} className="CToWUd" />
                    </div>
                    <div style={{width:'calc(100% - 60px)',maxWidth:'600px',height:'auto',padding:'20px',margin:'20px auto',backgroundColor:'#fff',borderRadius:'5px'}}>
                    {
                   		(this.state.tokenValid === 'error') ?
                   			<h1 style={{fontFamily:'Roboto,sans-serif',fontSize:'30px'}}>Ha ocurrido un error accesando a la base de datos. <br /><br />Por favor intente de nuevo.</h1> 
               			:(this.state.tokenValid === 'false') ?
                   			<h1 style={{fontFamily:'Roboto,sans-serif',fontSize:'30px'}}>EL token no coincide con la base de datos, debe realizar de nuevo el proceso!.</h1>
                   		:(seconds < 3600) ?
		                   	  <div>
		                   		  <h1 style={{fontFamily:'Roboto,sans-serif',fontSize:'30px'}}>Restablecer su password</h1>
		                          <hr style={{margin:'0 0 20px 0'}} />
		                          <div style={{fontFamily:'Roboto,sans-serif',fontSize:'14px',color:'#666'}}>Por favor escriba el nuevo password para su cuenta {this.state.email}.<br /><br />Recuerda que debe ser minimo de 8 caracteres, contener numeros y letras mayusculas y minusculas.</div>
		                          <div style={{marginTop:'40px'}}>
		                              <a href="" style={{textDecoration:'none',fontFamily:'Roboto,sans-serif',backgroundColor:configJson.windowColor,padding:'10px 20px',color:'#fff',fontSize:'16px',borderRadius:'5px'}} target="_blank">
		                                 Nuevo Password
		                              </a>
		                              <div className="yj6qo"></div>
		                              <div className="adL">
		                              </div>
		                          </div>
		                          <div className="adL">
		                          </div>
		                   	  </div>
	                    : <h1 style={{fontFamily:'Roboto,sans-serif',fontSize:'30px'}}>La solicictud para restablecer el password caduco. <br /><br />Por favor realice de nuevo el proceso.</h1>
                    } 
                    </div>
                    <div className="adL">
                    </div>
                </div>;  	  	
  	  	
    }
}   

export default ResetPasswordForm              