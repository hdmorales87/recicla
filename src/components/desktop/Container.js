import React, { Component } from 'react';
import Reciclators from '../reciclators/Reciclators';
import Costumers from '../costumers/Costumers';
import Purchases from '../purchases/Purchases';
import FormPurchases from '../purchases/FormPurchases';
import ControlPanel from '../control_panel/ControlPanel';
import DocumentTypes from '../control_panel/DocumentTypes';
import PurchaseTypes from '../control_panel/PurchaseTypes';
import Users from '../control_panel/users/Users';
import FormDataGrid from '../data_grid/FormDataGrid';

import WelcomePage from './WelcomePage';


import './desktop.css';

class Container extends Component {
	// constructor(props, context) { 
 //    	super(props, context); 
 //    	this.props.componente = "Login"; 	   
	// } 		
  	render() {
  		let componentList = {
			WelcomePage   : WelcomePage,
			Reciclators   : Reciclators,
			Costumers     : Costumers,
			Purchases     : Purchases,
			ControlPanel  : ControlPanel,
			FormPurchases : FormPurchases,
			DocumentTypes : DocumentTypes,
			PurchaseTypes : PurchaseTypes,
			Users 		  : Users,
			FormDataGrid  : FormDataGrid						  
		} 
		
  		let ChildComponent = componentList[this.props.componente];		
  	  	return (  		  
  	  		<ChildComponent funcionClick={this.props.funcionClick} parametro={this.props.parametro} />  	  		    
	    );
  	}
}

export default Container