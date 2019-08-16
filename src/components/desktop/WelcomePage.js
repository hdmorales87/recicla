/**
* CLASS WelcomePage
*
* Contiene la pantalla de bienvenida del software
* esta se carga en el contenedor de visualizacion 
*
* @author Hector Morales <warrior1987@gmail.com>
*/


import React, { Component } from 'react';
import './desktop.css';
import logo_fondo from '../../images/logo_fondo.png?v1.0';

class WelcomePage extends Component {	
  	render() {
  	  	return (
  	  		<div className="WelcomeFondo" style={{backgroundImage: `url(${ logo_fondo })`}}>  	  					  
  	  			
  	  		</div>		    		
	    );
  	}
}

export default WelcomePage
