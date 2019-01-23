import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Reciclators from '../reciclators/Reciclators';
import Costumers from '../costumers/Costumers';
import Purchases from '../purchases/Purchases';
import ControlPanel from '../control_panel/ControlPanel';


import './desktop.css';

class Container extends Component {	
  	render() {
  	  	return (  	  		  
  	  		<this.props.componente />	     
	    );
  	}
}

export default Container