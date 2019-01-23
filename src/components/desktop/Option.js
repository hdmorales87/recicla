import React, { Component } from 'react';
import MaterialIcon, {colorPalette} from 'material-icons-react';
import './desktop.css';
//import Container from './Container';

class Option extends Component {

  	render() {
  	  	return (
  				  <li id={this.props.tab} status="enable" onClick={this.actualizaContainer}>
  				     <div onClick={this.props.actualizaContainer}>
  				        <div className="LiIcon"><MaterialIcon size={50} icon={this.props.icono} invert /></div>
  				        <div className="LiTitle">{this.props.titulo}</div>
  				        <div className="LiDescrip">{this.props.subtitulo}</div>
  				     </div>
  				  </li>  				
			  );
  	}
}

export default Option
