/**
* CLASS NameUser
*
* Contiene el contenedor del nombre del usuario
*
* @author Hector Morales <warriorimport FormDataUser from './FormDataUser';1987@gmail.com>
*/

import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react';
import Dropdown from 'react-bootstrap/Dropdown';
import CustomToggle from './CustomToggleDropdown';
import FormDataUser from './FormDataUser';
import globalState from '../configuration/GlobalState';
import Window from '../window/Window';
import {logout} from '../api_calls/ApiCalls';
import alertify from 'alertifyjs';
import './desktop.css';
import '../../css/alertify.css';

class NameUser extends Component {
	  constructor(props) {
        super(props);         
        var userData = globalState.getState().userData;        
        this.btnLogoutSession = this.btnLogoutSession.bind(this);
        this.state = {
            showModal : false,
            username  : userData[0].nombre.toUpperCase()
        };
    }
    //evento cerrar sesion
	  btnLogoutSession(){//boton de cerrar sesion
	  	  alertify.confirm('Confirmacion', 'Desea cerrar la sesion?', this.logoutSession.bind(this), function(){});
	  } 
    //abrir la modal
    handleOpenModal(){//boton de abrir modal        
        globalState.dispatch({
                type   : "windowOpen",
                params : true
            });
    }          
    //metodo cerrar sesion
	  logoutSession(){//llamar a cerrar sesion en la API
	 	    logout()
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
    functionUpdateUser(){
        alert('hola');
        var formDataUser = globalState.getState().formDataUser;
        console.log(formDataUser);
    } 
    functionChangePassword(){
        alert('jejeje');
    } 
    render() {
    	  	return (//carga el menu de opciones del usuario  	  		
        			<Dropdown  id="ContentUser" className="ContentUser">	
        				  <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">  	  					 		  
      				    	  <div className="NombreUsuario">{this.state.username}</div>	
      				    	  <div className="OptionUsuario">
      				    	  	<MaterialIcon size={30} icon="keyboard_arrow_down" invert />
      				    	  </div>					
      				    </Dropdown.Toggle>
      				    <Dropdown.Menu  style={{ marginTop: '50px'}}>
      				      	<Dropdown.Item eventKey="1" onClick={this.handleOpenModal.bind(this)}>
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
                  <Window                       
                      title='Datos del Usuario'
                      width='315px' 
                      height='80%'                     
                      tbar={[
                              {
                                  type : 'boton',
                                  icon : 'save',
                                  width : '100px',
                                  height : '60px',
                                  title : 'Actualizar Datos',
                                  function : this.functionUpdateUser.bind(this)
                              },
                              {
                                  type : 'boton',
                                  icon : 'settings',
                                  width : '100px',
                                  height : '60px',
                                  title : 'Cambiar Password',
                                  function : this.functionChangePassword.bind(this)
                              }    
                           ]}
                  />                 
      			  </Dropdown>	              	    		
	     );
    }
}

export default NameUser