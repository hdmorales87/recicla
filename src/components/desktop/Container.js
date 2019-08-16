/**
* CLASS Container
*
* Contiene el contenedor que permite renderizar lo que se requiera en la interfaz
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import Reciclators from '../reciclators/Reciclators';
import Costumers from '../costumers/Costumers';
import Purchases from '../purchases/Purchases';
import ControlPanel from '../control_panel/ControlPanel';
import DocumentTypes from '../control_panel/DocumentTypes';
import PurchaseTypes from '../control_panel/PurchaseTypes';
import Users from '../control_panel/Users';
import FormDataGrid from '../data_grid/FormDataGrid';
import Reports from '../reports/Reports';
import WelcomePage from './WelcomePage';
import './desktop.css';

class Container extends Component {
	// listado de componentes 		
  	render() {
  		let componentList = {
			WelcomePage   : WelcomePage,
			Reciclators   : Reciclators,
			Costumers     : Costumers,
			Purchases     : Purchases,
			ControlPanel  : ControlPanel,			
			DocumentTypes : DocumentTypes,
			PurchaseTypes : PurchaseTypes,
			Users 		  : Users,
			FormDataGrid  : FormDataGrid,
			Reports  	  : Reports						  
		} 
		
  		let ChildComponent = componentList[this.props.componente];		
  	  	return (  		  
  	  		<ChildComponent funcionClick={this.props.funcionClick} parametro={this.props.parametro} />  	  		    
	    );
  	}
}

export default Container