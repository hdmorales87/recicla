import React, { Component } from 'react';
import Reciclators from '../reciclators/Reciclators';
import Costumers from '../costumers/Costumers';
import Purchases from '../purchases/Purchases';
import FormPurchase from '../purchases/FormPurchase';
import ControlPanel from '../control_panel/ControlPanel'
import WelcomePage from './WelcomePage';


import './desktop.css';

class Container extends Component {
	// constructor(props, context) { 
 //    	super(props, context); 
 //    	this.props.componente = "Login"; 	   
	// } 		
  	render() {
  		let componentList = {
  			WelcomePage  : WelcomePage,
			Reciclators  : Reciclators,
			Costumers    : Costumers,
			Purchases    : Purchases,
			ControlPanel : ControlPanel,
			FormPurchase : FormPurchase	    
		} 
		
  		let ChildComponent = componentList[this.props.componente];		
  	  	return (  		  
  	  		<ChildComponent funcionClick={this.props.funcionClick} parametro={this.props.parametro} />  	  		    
	    );
  	}
}

export default Container