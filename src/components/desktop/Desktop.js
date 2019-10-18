/**
* CLASS Desktop
*
* Contiene el escritorio de la aplicacion
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import NameUser from './NameUser';
import OptionMenu from './OptionMenu';
import MaterialIcon from 'material-icons-react';
import configJson from '../configuration/configuration.json';
import globalState from '../configuration/GlobalState';
import {checkSession,cargarFilas} from '../api_calls/ApiCalls';
import Container from './Container';
import alertify from 'alertifyjs';
import '../../css/alertify.css';
import './desktop.css?v1.5'; 

class Desktop extends Component {
	  constructor(props) {//al cargarse trae los datos del usuario 		
      	super(props);  
        var usuario = this.props.location.state.usuario;              
      	this.state = { 
      		  loading: true,
          	redirect: false,	 		                
      	 	  componente: "WelcomePage",
      	 	  parametro : "",
            checkMenu : false 
	      }; 
        checkSession()
        .then(res => {
            var response = res.data; 
            if (response.session === "true") {
                cargarFilas('users',usuario,1,0).then(res => {
                    var response = res.data; 
                    if (response.msg === "error") {
                        alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail);
                    } else {                         
                        globalState.dispatch({
                            type   : "userData",
                            params : response
                        });                                  
                    }
                })
                .catch( err => {            
                    alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+err);
                });
                this.setState({ loading: false });
            } else {
                this.setState({ loading: false, redirect: true });
            }
        })
        .catch(err => {
            console.error(err);
            this.setState({ loading: false, redirect: true });
        });         

	      this.actualizarContainer = this.actualizarContainer.bind(this);	

        globalState.subscribe( ()=>{ 
            if(globalState.getState().type==="menuNavegacion"){                             
                this.setState({checkMenu  : globalState.getState().menuNavegacion});                               
            }
        });
	  } 
    
	  componentDidMount() {//cada que se monte el escritorio debe validar la sesion       
        //...           
    }	

	  actualizarContainer(val,param){//carga dinamica del lado derecho	
		    this.setState({ componente: val });
		    this.setState({ parametro : param });		
	  }	

    handleButtonMenu(e){//el boton que muestra esconde la barra de navegacion   
        var opcionCheck = true;
        if(this.state.checkMenu === true){
            opcionCheck = false;
        } 
        globalState.dispatch({
                            type   : "menuNavegacion",
                            params : opcionCheck
                        });
    }

    changeNavigationTrigger(e){
        //........
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
                <input type="checkbox" id="navigationTrigger" className="navigationTrigger" checked={this.state.checkMenu} onChange={this.changeNavigationTrigger.bind(this)} />     
                <label id="labelnavigationTrigger" htmlFor="navigationTrigger" onClick={this.handleButtonMenu.bind(this)}>
                    <MaterialIcon size={24} icon="menu" invert/>                    
                </label>            
	 		          <div id="pestanas" className="menuNavegacion" style={{backgroundColor:configJson.fondoMenu}}>
	 		          	  <div className="LogoCabecera">
	 		          	  	  
	 		          	  </div>
	 		          	  <OptionMenu funcionClick = {this.actualizarContainer}/>
	 		          </div>
                <div id="ContenedorDerechoEscritorio" className="ContenedorDerechoEscritorio">
	 		              <div id="cabeceraEscritorio" className="cabeceraEscritorio" style={{backgroundColor:configJson.fondoCabecera}}>
	 		              	  <NameUser className="ContentUser" history={this.props.history}/>  	    		
	 		              </div>
	    		          <div id="contenidopestanas" className="contenidoEscritorio">
	    		 	           <Container componente={this.state.componente} funcionClick = {this.actualizarContainer} parametro={this.state.parametro}/>
	    		          </div>	
                </div> 		     
	          </div>   	
		    );
  	}
}

export default Desktop