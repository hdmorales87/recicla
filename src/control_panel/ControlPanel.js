import React, { Component } from 'react';
import DocumentTypeForm from './forms/DocumentTypeForm';
import PurchaseTypeForm from './forms/PurchaseTypeForm';

class ControlPanel extends Component {

  	handleClick(val) {
  	  	this.setState({ justClicked: val });
  	}
  	render() {
  	  	return (
  	  		<Head>
  	  	        <link rel="stylesheet" href="/static/app.css"/>
  	  	        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
  	  	    </Head>
  	  		<div className="App">
  	  	 		<div id="div_documentos" onClick={this.handleClick.bind(this)}>Tipos de Documento</div>
  	  	 		<div id="div_productos" onClick={this.handleClick.bind(this)}>Tipos de Producto</div>
  	  	 		<div id="div_usuarios" onClick={this.handleClick.bind(this)}>Usuarios</div>    
 			</div> 	
  	  	);
  	}
}

export default ControlPanel
