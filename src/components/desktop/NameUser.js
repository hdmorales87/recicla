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
import FormDataUser from './FormDataUser';
import configJson from '../configuration/configuration.json';
import axios from 'axios';
import Modal from 'react-modal';
import alertify from 'alertifyjs';
import './desktop.css';
import '../../css/alertify.css';

const path = configJson.apiPath;  

Modal.setAppElement('#root');

const customStyles = {
  content : {
    top         : '50%',
    left        : '50%',
    right       : 'auto',
    bottom      : 'auto',
    marginRight : '-50%',
    padding     : '0px',
    transform   : 'translate(-50%, -50%)',
    width       : '310px'
  }
};

class NameUser extends Component {
	  constructor(props) {
        super(props); 
        this.btnLogoutSession = this.btnLogoutSession.bind(this);  

        this.state = {
          showModal: false
        };
        
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);     
    }
    //evento cerrar sesion
	  btnLogoutSession(){//boton de cerrar sesion
	  	  alertify.confirm('Confirmacion', 'Desea cerrar la sesion?', this.logoutSession.bind(this), function(){});
	  }    
    //metodo cerrar sesion
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
    //controles de la modal
    handleOpenModal(){//boton de abrir modal
        this.setState({ showModal: true });
    }       
    handleCloseModal () {
        this.setState({ showModal: false });
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
                  <Modal 
                     isOpen={this.state.showModal}
                     contentLabel="Minimal Modal Example"
                     style={customStyles}
                  >
                      <div className="win-title" os="windows" id="win-title-Win_LogicalCloud">
                          <div id="win-title-text-Win_LogicalCloud" className="win-title-txt" os="windows">Datos del Usuario</div>
                          <div className="win-title-btn" style={{ top: '-4px',left:'-2px'}} os="windows" id="btn_close_ventana_Win_LogicalCloud" onClick={this.handleCloseModal}>
                              <MaterialIcon size={24} icon="close" invert id="iconClose"/>
                          </div> 
                      </div>                      
                      <FormDataUser />
                  </Modal>
      			  </Dropdown>			    		
	     );
    }
}

export default NameUser