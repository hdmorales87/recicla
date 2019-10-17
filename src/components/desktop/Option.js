/**
* CLASS Option
*
* Contiene el componente opcion de la barra de menu del escritorio
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react';
import {divMouseOver,divMouseOut} from '../configuration/GlobalFunctions';
import configJson from '../configuration/configuration.json';
import './desktop.css';

class Option extends Component {
    handleContainerChange(){
        this.props.funcionClick(this.props.componente);
        console.log(window.innerWidth);        
    }
  	render() {
  	  	return (
  				  <li id={this.props.tab} status="enable">
  				     <div id={'div'+this.props.tab} className="divOptionMenu" onClick={this.handleContainerChange.bind(this)} style={{height:'100%'}} onMouseOut={divMouseOut.bind(this,'div'+this.props.tab,configJson.fondoMenu)} onMouseOver={divMouseOver.bind(this,'div'+this.props.tab,configJson.fondoMenu)} >
  				        <div className="LiIcon"><MaterialIcon size={50} icon={this.props.icono} invert /></div>
  				        <div className="LiTitle">{this.props.titulo}</div>
  				        <div className="LiDescrip">{this.props.subtitulo}</div>
  				     </div>
  				  </li>  				
			  );
  	}
}

export default Option
