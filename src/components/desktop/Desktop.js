import React, { Component } from 'react';

class Desktop extends Component {	
  	render() {
  	  	return (  	  		  
  	  		<div className="App">                 
	 		    <div id="pestanas" class="navigationDesk">
	 		    	<div class="LogoCabecera"></div>
	 		    	<ul id="lista"></ul>
	 		    </div>
	 		    <div id="cabeceraDesk" class="cabeceraDesk">
	 		    	<div id="ContentUser" class="ContentUser"> 
	 		    		<div class="FotoUsuario"></div>
	 		    		<div class="NombreUsuario">HECTOR  DAVID MORALES </div>
	 		    		<div class="OptionUsuario">
	 		    			<i class="material-icons">keyboard_arrow_down</i>
 		    			</div>
	    			</div>
	    		</div>
	    		<div id="contenidopestanas" class="contentDesk"></div>	 		     
	        </div>   	
		);
  	}
}

export default Desktop
