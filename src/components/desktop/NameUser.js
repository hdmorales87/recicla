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
import globalState from '../configuration/GlobalState';
import configJson from '../configuration/configuration.json';
import {divMouseOver,divMouseOut} from '../configuration/GlobalFunctions';
import Window from '../window/Window';
import {logout,insertarActualizarFila,sendEmailPassword} from '../api_calls/ApiCalls';
import alertify from 'alertifyjs';
import './desktop.css';
import '../../css/alertify.css';

class NameUser extends Component {
	  constructor(props) {
        super(props);    
        this.btnLogoutSession = this.btnLogoutSession.bind(this);
        this.state = {
            showModal   : false,
            username    : '',
            companyName : ''
        };
    }
    componentDidMount(){//traer los datos del store
        globalState.subscribe( ()=>{ 
            if(globalState.getState().type==="userData"){        
                var userData = globalState.getState().userData;       
                this.setState({username  : userData[0].primer_nombre.toUpperCase()+' '+userData[0].primer_apellido.toUpperCase()})                
            }
        });  
        globalState.subscribe( ()=>{ 
            if(globalState.getState().type==="companyData"){        
                var companyData = globalState.getState().companyData;       
                this.setState({companyName  : companyData[0].razon_social.toUpperCase()})                
            }
        }); 
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
        //actualizacion de datos de usuario
        var formDataUser = globalState.getState().formDataUser; 
        insertarActualizarFila('put','users',formDataUser)
        .then(response => {
            response = response.data;
            if(response.msg === 'error'){
                alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail); 
            }
            else {                
                globalState.dispatch({
                    type   : "windowOpen", 
                    params : false
                });
                //ACTUALIZAR EL GLOBAL STORE  
                globalState.getState().userData[0] = formDataUser;                          
            }
        })
        .catch(function (error) {
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+error);
        });
    } 
    functionChangePassword(){
        var email = globalState.getState().userData[0].email;
        //enviar al correo la recuperacion de la contraseña        
        sendEmailPassword(email).then(response => {
            response = response.data;
            if(response.msg === 'error'){
                alertify.alert('Error!', 'Ha ocurrido un error enviando el correo a '+email+'!<br />Codigo de Error: '+response.detail); 
            }
            else {
                alertify.alert('Envio Exitoso!', 'Se ha enviado un correo a '+email+'!'); 
            }
        })
        .catch(function (error) {
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+error);
        });
    } 
    render() {
    	  	return (//carga el menu de opciones del usuario  	  		
        			<Dropdown  id="ContenidoDataUser" className="ContenidoUser" onMouseOut={divMouseOut.bind(this,'ContenidoDataUser',configJson.fondoMenu)} onMouseOver={divMouseOver.bind(this,'ContenidoDataUser',configJson.fondoMenu)}>	
        				  <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">  	  					 		  
      				    	  <div className="FotoUsuario">
                          <img src="https://cloud.logicalsoft.co/cloud/photo/ABCDEFGH0123456789.png" />
                      </div>
                      <div className="NombreUsuario">
                          <div style={{width:'100%'}}>
                              {this.state.username}
                          </div>
                          <div style={{width:'100%'}}>
                              {this.state.companyName}
                          </div>	
                      </div>
      				    	  <div className="OptionUsuario">
      				    	  	<MaterialIcon size={24} icon="keyboard_arrow_down" invert />
      				    	  </div>					
      				    </Dropdown.Toggle>
      				    <Dropdown.Menu  style={{ marginTop: '54px',marginLeft: '5px',width:'300px'}}>
      				      	<Dropdown.Item eventKey="1" onClick={this.handleOpenModal.bind(this)}>
                          <div id="dropdownUserData" style={{height:'25px'}} onMouseOut={divMouseOut.bind(this,'dropdownUserData','#ffffff')} onMouseOver={divMouseOver.bind(this,'dropdownUserData','#c6c6c6')}>
                              <div style={{width:'30px',float:'left'}}>
                                  <MaterialIcon size={24} icon="account_circle" />
                              </div>
                              <div style={{height:'25px',float:'left',verticalAlign:'middle',paddingTop:'5px'}}>
                                  Datos del Usuario
                              </div>
                          </div>
                      </Dropdown.Item>
      				      	<Dropdown.Item eventKey="1" onClick={this.btnLogoutSession.bind(this)}>
                          <div id="dropdownLogout" style={{height:'25px'}} onMouseOut={divMouseOut.bind(this,'dropdownLogout','#ffffff')} onMouseOver={divMouseOver.bind(this,'dropdownLogout','#c6c6c6')}>
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