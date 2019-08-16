/**
* CLASS Option
*
* Contiene el componente opcion de la barra de menu del escritorio
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react';
import './desktop.css';

class Option extends Component {
    handleContainerChange(){
        this.props.funcionClick(this.props.componente);        
    }
  	render() {
  	  	return (
  				  <li id={this.props.tab} status="enable">
  				     <div onClick={this.handleContainerChange.bind(this)}>
  				        <div className="LiIcon"><MaterialIcon size={50} icon={this.props.icono} invert /></div>
  				        <div className="LiTitle">{this.props.titulo}</div>
  				        <div className="LiDescrip">{this.props.subtitulo}</div>
  				     </div>
  				  </li>  				
			  );
  	}
}

export default Option
