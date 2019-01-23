import React, { Component } from 'react';
import NameUser from './NameUser';
import OptionMenu from './OptionMenu';
import Container from './Container';
import ReactDOM from 'react-dom';
import './desktop.css';

class Desktop extends Component {
	actualizarContainer(){
		console.log("hola:mundo");
	}	
  	render() {
  	  	return (  	  		  
  	  		<div className="App">                 
	 		    <div id="pestanas" className="navigationDesk">
	 		    	<div className="LogoCabecera"></div>
	 		    	<OptionMenu />
	 		    </div>
	 		    <div id="cabeceraDesk" className="cabeceraDesk">
	 		    	<NameUser className="ContentUser" />  	    		
	 		    </div>
	    		<div id="contenidopestanas" className="contentDesk">
	    			<Container componente="Purchases" actualizaContainer={this.actualizarContainer.bind(this)}/>
	    		</div>	 		     
	        </div>   	
		);
  	}
}

export default Desktop
