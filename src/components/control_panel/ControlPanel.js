import React, { Component } from 'react';
import Option from './Option';
import './controlpanel.css';

class ControlPanel extends Component {

  	handleClick(val) {
  	  	alert('hola');
  	}
  	render() {
  	  	return (  	  		  
  	  		  <div id="ContentPaneldeControl" className="EstiloIconosMenuDashboard" ostype="desktop">
                <div className="titulo">Maestros</div>
                <ul>
                    <Option tab="config0" titulo='Administracion Tipos de Compra' icono="shopping_cart" funcionClick={this.props.funcionClick} componente="PurchaseTypes" />  
                    <Option tab="config1" titulo='Administracion Tipos de Documento' icono="credit_card" funcionClick={this.props.funcionClick} componente="DocumentTypes" />  
                    <Option tab="config2" titulo='Administracion de Usuarios' icono="perm_identity" funcionClick={this.props.funcionClick} componente="Users" />  
                </ul>
            </div> 	
  	  	);
  	}
}

export default ControlPanel
