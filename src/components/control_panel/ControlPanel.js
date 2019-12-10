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
                    <Option tab="config0" titulo='Tipos de Producto' icono="shopping_cart" funcionClick={this.props.funcionClick} componente="ProductTypes" permiso="16"/>  
                    <Option tab="config1" titulo='Tipos de Documento' icono="credit_card" funcionClick={this.props.funcionClick} componente="DocumentTypes" permiso="19"/>  
                    <Option tab="config2" titulo='Usuarios' icono="perm_identity" funcionClick={this.props.funcionClick} componente="Users" permiso="18"/>  
                    <Option tab="config3" titulo='Empresas' icono="business" funcionClick={this.props.funcionClick} componente="Companies" permiso="19"/>  
                    <Option tab="config4" titulo='Roles' icono="perm_identity" funcionClick={this.props.funcionClick} componente="Roles" permiso="20"/> 
                    <Option tab="config5" titulo='Configuracion SMTP' icono="mail_outline" funcionClick={this.props.funcionClick} componente="Smtp" permiso="17"/>   
                </ul>
            </div> 	
  	  	);
  	}
}

export default ControlPanel
