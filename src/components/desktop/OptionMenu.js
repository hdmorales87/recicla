import React, { Component } from 'react';
import Option from './Option';
import './desktop.css';

class OptionMenu extends Component {
    
  	render() {
  	  	return (  	  		  
  	  		<ul id="lista">
  				<Option tab="pestana0" titulo='Compras' subtitulo="Compra de Chatarra" icono="shopping-cart" funcionClick={this.props.funcionClick} componente="Purchases" />  
  				<Option tab="pestana1" titulo='Clientes' subtitulo="Compradores de Chatarra" icono="person" funcionClick={this.props.funcionClick} componente="Costumers" />
  				<Option tab="pestana2" titulo='Recicladores' subtitulo="Vendedores de Chatarra" icono="person" funcionClick={this.props.funcionClick} componente="Reciclators"/>
  				<Option tab="pestana3" titulo='Administracion' subtitulo="Administracion del Sistema" icono="settings" funcionClick={this.props.funcionClick} componente="ControlPanel"/>  								
			</ul>   	
		);
  	}
}

export default OptionMenu
