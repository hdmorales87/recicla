/**
* CLASS OptionMenu
*
* Contiene el menu de opciones de la barra de menu del escritorio
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import configJson from '../configuration/configuration.json';
import Option from './Option';
import './desktop.css';

class OptionMenu extends Component {
    
  	render() {
  	  	return (  	  		  
  	  		<ul id="lista">
          {
              configJson.modulos.map((optionMenu,i) => {//recorre el objeto con los modulos
                  return (<Option key={i} 
                                  tab={optionMenu.tab} 
                                  titulo={optionMenu.titulo} 
                                  subtitulo={optionMenu.subtitulo} 
                                  icono={optionMenu.icono} 
                                  funcionClick={this.props.funcionClick} 
                                  componente={optionMenu.componente} 
                                  permiso={optionMenu.permiso}/>)  
              })
          } 	
			    </ul>   	
		    );
  	}
}

export default OptionMenu
