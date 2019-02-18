import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import NameUser from './NameUser';
import OptionMenu from './OptionMenu';
import Container from './Container';
import logo_login from '../../images/logo_login.png?v1.0';
import './desktop.css';

class Desktop extends Component {
	  constructor(props, context) { 		
      	super(props, context);
      	const username = this.props.location.state.usuario; 
      	this.state = { 
      		  loading: true,
          	redirect: false,
	 		    username: username[0].name.toUpperCase(), 
      	 	  componente: "WelcomePage",
      	 	  parametro : "" 
	     }; 	 
  
	     this.actualizarContainer = this.actualizarContainer.bind(this);	  
	    
	     // var usuario = this.props.location.state.usuario;
	     // console.log(usuario);
	  } 
	  componentDidMount() {       
      	axios.get('http://localhost:5000/checkSession')
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
	  actualizarContainer(val,param){	
		    this.setState({ componente: val });
		    this.setState({ parametro : param });		
	  }	
  	render() {
  		  const { loading, redirect } = this.state;
  		  if (loading) {
        	  return null;
      	}
      	if (redirect) {
        	  return <Redirect to="/" />;
      	}  			 		
  	  	return (  	  		  
  	  		  <div className="App">                 
	 		          <div id="pestanas" className="navigationDesk">
	 		          	  <div className="LogoCabecera">
	 		          	  	  <img src={ logo_login } alt="Acecolombia" />
	 		          	  </div>
	 		          	  <OptionMenu funcionClick = {this.actualizarContainer}/>
	 		          </div>
	 		          <div id="cabeceraDesk" className="cabeceraDesk">
	 		          	  <NameUser className="ContentUser" username = { this.state.username } />  	    		
	 		          </div>
	    		      <div id="contenidopestanas" className="contentDesk">
	    		 	        <Container componente={this.state.componente} funcionClick = {this.actualizarContainer} parametro={this.state.parametro}/>
	    		      </div>	 		     
	          </div>   	
		    );
  	}
}

export default Desktop
