import React, { Component } from 'react';

class Purchases extends Component {

  	handleClick(val) {
  	  	this.setState({ justClicked: val });
  	}
  	render() {
  	  	return (  	  		  
  	  		  <div className="App">                 
  	  	 		     <div id="div_documentos" onClick={this.handleClick.bind(this)}>Compras</div>  	  	 		       
 			      </div> 	
  	  	);
  	}
}

export default Purchases
