import React, { Component } from 'react';
import DocumentTypeForm from './forms/DocumentTypeForm';
import PurchaseTypeForm from './forms/PurchaseTypeForm';

class ControlPanel extends Component {

  	handleClick(val) {
  	  	this.setState({ justClicked: val });
  	}
  	render() {
  	  	return (  	  		  
  	  		  <div className="App">                 
  	  	 		     <div id="div_documentos" onClick={this.handleClick.bind(this)}>Tipos de Documento</div>
  	  	 		     <div id="div_productos" onClick={this.handleClick.bind(this)}>Tipos de Producto</div>
  	  	 		     <div id="div_usuarios" onClick={this.handleClick.bind(this)}>Usuarios</div>    
 			      </div> 	
  	  	);
  	}
}

export default ControlPanel
