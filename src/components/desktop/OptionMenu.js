import React, { Component } from 'react';
import Option from './Option';
import './desktop.css';

class OptionMenu extends Component {


  	render() {
  	  	return (  	  		  
  	  		<ul id="lista">
  				<Option tab="pestana0" titulo='Compras' subtitulo="Compra de Chatarra" icono="shopping-cart" destino="/purchases" />  
  				<Option tab="pestana1" titulo='Clientes' subtitulo="Compradores de Chatarra" icono="person" destino="/costumers"/>
  				<Option tab="pestana2" titulo='Recicladores' subtitulo="Vendedores de Chatarra" icono="person" destino="/reciclators"/>
  				<Option tab="pestana3" titulo='Administracion' subtitulo="Administracion del Sistema" icono="settings" destino="/control_panel"/>  								
			</ul>   	
		);
  	}
}

export default OptionMenu
