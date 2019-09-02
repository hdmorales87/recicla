/**
* CLASS NameUser
*
* Contiene el contenedor del nombre del usuario
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react';
import Dropdown from 'react-bootstrap/Dropdown';
import CustomToggle from './CustomToggleDropdown';
import configJson from '../configuration/configuration.json';
import axios from 'axios';
import alertify from 'alertifyjs';
import './desktop.css';
import '../../css/alertify.css';

const path = configJson.apiPath;  

class NameUser extends Component {
	  constructor(props) {
           super(props); 
           this.btnLogoutSession = this.btnLogoutSession.bind(this);       
       }
	  btnLogoutSession(){//boton de cerrar sesion
	  	  alertify.confirm('Confirmacion', 'Desea cerrar la sesion?', this.logoutSession.bind(this), function(){});
	  }
	  logoutSession(){//llamar a cerrar sesion en la API
	 	    axios.get(path+'logout', {withCredentials: true})
            .then(res => {
                var response = res.data; 
              	if (response.msg === "error") {      	  	  	  	
              		alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+response.detail);  	  	  	  	
              	} else if (response.msg === "success"){
              	  	this.props.history.push('/');//me devuelve al login       	  	  	  	
              	}
            })
            .catch(err => {
              	alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+err);      	  	  
            });
	  }	
    render() {
    	  	return (//carga el menu de opciones del usuario  	  		
        			<Dropdown  id="ContentUser" className="ContentUser">	
        				<Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">  	  					 		  
      					<div className="NombreUsuario">{this.props.username}</div>	
      					<div className="OptionUsuario">
      						<MaterialIcon size={30} icon="keyboard_arrow_down" invert />
      					</div>					
      				</Dropdown.Toggle>
      				<Dropdown.Menu  style={{ marginTop: '50px'}}>
      				  	<Dropdown.Item eventKey="1">
                      <div style={{height:'25px'}}>
                          <div style={{width:'30px',float:'left'}}>
                              <MaterialIcon size={24} icon="account_circle" />
                          </div>
                          <div style={{height:'25px',float:'left',verticalAlign:'middle',paddingTop:'5px'}}>
                              Datos del Usuario
                          </div>
                      </div>
                  </Dropdown.Item>
      				  	<Dropdown.Item eventKey="1" onClick={this.btnLogoutSession.bind(this)}>
                      <div style={{height:'25px'}}>
                          <div style={{width:'30px',float:'left'}}>
                              <MaterialIcon size={24} icon="close" />
                          </div>
                          <div style={{height:'25px',float:'left',verticalAlign:'middle',paddingTop:'5px'}}>
                              Cerrar Sesi&oacute;n
                           </div>
                      </div>
                  </Dropdown.Item>				  	
      				</Dropdown.Menu>
      			</Dropdown>			    		
	     );
    }
}

export default NameUser
