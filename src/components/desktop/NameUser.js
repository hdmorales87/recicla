import React, { Component } from 'react';
import './desktop.css';

class NameUser extends Component {	
  	render() {
  	  	return (	
  	  		<div id="ContentUser" className="ContentUser">  		  
  	  			<div className="NombreUsuario">{this.props.username}</div>	
  			</div>	    		
	    );
  	}
}

export default NameUser
