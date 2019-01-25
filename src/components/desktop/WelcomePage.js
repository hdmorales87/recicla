import React, { Component } from 'react';
import './desktop.css';
import logo_fondo from '../../images/logo_fondo.png?v1.0';

class WelcomePage extends Component {	
  	render() {
  	  	return (
  	  		<div className="LogoFondo">	 BIENVENIDO AL SOFTWARE ADMINISTRATIVO DE LA RECUPERADORA CAICEDO MARIN REMA 		  
  	  			<img src={ logo_fondo } alt="Acecolombia" />
  	  		</div>		    		
	    );
  	}
}

export default WelcomePage
