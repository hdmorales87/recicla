/**
* CLASS Costumers
*
* Contiene el contenedor principal de los clientes
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';

class Costumers extends Component {

  	handleClick(val) {
  	  	this.setState({ justClicked: val });
  	}
  	render() {
  	  	return (  	  		  
  	  		  <div className="App">                 
  	  	 		     <div id="div_documentos" onClick={this.handleClick.bind(this)}>Clientes</div>  	  	 		       
 			      </div> 	
  	  	);
  	}
}

export default Costumers
