/**
* CLASS Desktop
*
* Contiene el escritorio de la aplicacion
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import {checkSession} from '../api_calls/ApiCalls';
import { Redirect } from 'react-router-dom';
import NameUser from './NameUser';
import OptionMenu from './OptionMenu';
import configJson from '../configuration/configuration.json';
import Container from './Container';
import logo_login from '../../images/logo_login.png?v1.0';
import './desktop.css';

const path = configJson.apiPath;  

class Desktop extends Component {
	  constructor(props, context) {//al cargarse trae los datos del usuario 		
      	super(props, context);

        var usuario = {};
        var username = '';

        if(this.props.location.state){
            usuario = this.props.location.state.usuario;
            username = usuario[0].nombre.toUpperCase();
        }
      	this.state = { 
      		  loading: true,
          	redirect: false,
	 		      username: username, 
      	 	  componente: "WelcomePage",
      	 	  parametro : "" 
	      }; 
	      this.actualizarContainer = this.actualizarContainer.bind(this);	
	  } 
	  componentDidMount() {//cada que se monte el escritorio debe validar la sesion       
      	checkSession()
  	  	.then(res => {
            var response = res.data; 
  	  	  	if (response.session === "true") {
  	  	  	  	this.setState({ loading: false });
  	  	  	} else {
  	  	  	  	this.setState({ loading: false, redirect: true });
  	  	  	}
  	  	})
  	  	.catch(err => {
  	  	  	console.error(err);
  	  	  	this.setState({ loading: false, redirect: true });
  	  	});            
    }	
	  actualizarContainer(val,param){//carga dinamica del lado derecho	
		    this.setState({ componente: val });
		    this.setState({ parametro : param });		
	  }	
  	render() {
  		  const { loading, redirect } = this.state;        
  		  if (loading) {
        	  return null;
      	}
      	if (redirect) {//sesion inexistente, cargar login
            alert('Su sesion ha finalizado, debe registrarse de nuevo!');
        	  return <Redirect to="/" />;
      	}  			 		
  	  	return (//carga el entorno del escritorio, barra de menu, barra superior y contenedor 	  		  
  	  		  <div className="App">                 
	 		          <div id="pestanas" className="navigationDesk">
	 		          	  <div className="LogoCabecera">
	 		          	  	  <img src={ logo_login } alt="Recicla" />
	 		          	  </div>
	 		          	  <OptionMenu funcionClick = {this.actualizarContainer}/>
	 		          </div>
	 		          <div id="cabeceraDesk" className="cabeceraDesk">
	 		          	  <NameUser className="ContentUser" username = { this.state.username } history={this.props.history}/>  	    		
	 		          </div>
	    		      <div id="contenidopestanas" className="contentDesk">
	    		 	        <Container componente={this.state.componente} funcionClick = {this.actualizarContainer} parametro={this.state.parametro}/>
	    		      </div>	 		     
	          </div>   	
		    );
  	}
}

export default Desktop