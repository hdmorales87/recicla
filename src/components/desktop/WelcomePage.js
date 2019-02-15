import React, { Component } from 'react';
import './desktop.css';
import logo_fondo from '../../images/logo_fondo.png?v1.0';

class WelcomePage extends Component {	
  	render() {
  	  	return (
  	  		<div className="LogoFondo">  	  					  
  	  			<img src={ logo_fondo } alt="" />
  	  		</div>		    		
	    );
  	}
}

export default WelcomePage
