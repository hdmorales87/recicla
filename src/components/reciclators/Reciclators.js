import React, { Component } from 'react';

class Reciclators extends Component {

  	handleClick(val) {
  	  	this.setState({ justClicked: val });
  	}
  	render() {
  	  	return (  	  		  
  	  		  <div className="App">                 
  	  	 		     <div id="div_documentos" onClick={this.handleClick.bind(this)}>Recicladores</div>  	  	 		     
 			      </div> 	
  	  	);
  	}
}

export default Reciclators
