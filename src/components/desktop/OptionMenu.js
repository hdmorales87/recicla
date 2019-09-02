/**
* CLASS OptionMenu
*
* Contiene el menu de opciones de la barra de menu del escritorio
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import Option from './Option';
import './desktop.css';

class OptionMenu extends Component {
    
  	render() {
  	  	return (  	  		  
  	  		<ul id="lista">
              <Option tab="pestana0" titulo='Dashboard' subtitulo="Indicadores" icono="dashboard" funcionClick={this.props.funcionClick} componente="Dashboard" />  
  		    		<Option tab="pestana1" titulo='Compras' subtitulo="Compra de Chatarra" icono="shopping_cart" funcionClick={this.props.funcionClick} componente="Purchases" />  
  		    		<Option tab="pestana2" titulo='Clientes' subtitulo="Compradores de Chatarra" icono="person" funcionClick={this.props.funcionClick} componente="Costumers" />
  		    		<Option tab="pestana3" titulo='Recicladores' subtitulo="Vendedores de Chatarra" icono="person" funcionClick={this.props.funcionClick} componente="Reciclators"/>
              <Option tab="pestana4" titulo='Informes' subtitulo="Informes" icono="poll" funcionClick={this.props.funcionClick} componente="Reports"/>                 
  		    		<Option tab="pestana5" titulo='Administracion' subtitulo="Administracion del Sistema" icono="settings" funcionClick={this.props.funcionClick} componente="ControlPanel"/>  								
			    </ul>   	
		    );
  	}
}

export default OptionMenu
