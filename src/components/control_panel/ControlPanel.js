/**
* CLASS ControlPanel
*
* Contiene el contenedor principal del panel de control
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import Option from './Option';
import './controlpanel.css';

class ControlPanel extends Component {  	
  	render() {
  	  	return (  	  		  
  	  		  <div id="ContentPaneldeControl" className="EstiloIconosMenuDashboard" ostype="desktop">
                <div className="titulo">Administracion</div>
                <ul>
                    <Option tab="config0" titulo='Tipos de Producto' icono="shopping_cart" funcionClick={this.props.funcionClick} componente="ProductTypes" />  
                    <Option tab="config1" titulo='Tipos de Documento' icono="credit_card" funcionClick={this.props.funcionClick} componente="DocumentTypes" />  
                    <Option tab="config2" titulo='Usuarios' icono="perm_identity" funcionClick={this.props.funcionClick} componente="Users" />  
                    <Option tab="config3" titulo='Empresas' icono="business" funcionClick={this.props.funcionClick} componente="Companies" />  
                </ul>
            </div> 	
  	  	);
  	}
}

export default ControlPanel
