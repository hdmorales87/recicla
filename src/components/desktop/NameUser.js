import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react';
import Dropdown from 'react-bootstrap/Dropdown';
import CustomToggle from './CustomToggleDropdown';
import CustomMenu from './CustomMenuDropdown';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import alertify from 'alertifyjs';
import './desktop.css';
import '../../css/alertify.css';

class NameUser extends Component {
	constructor(props) {
        super(props);
        //var historial = this.props.history; 
        console.log(this.props.history);
        this.btnLogoutSession = this.btnLogoutSession.bind(this);       
    }
	btnLogoutSession(){
		alertify.confirm('Confirmacion', 'Desea cerrar la sesion?', this.logoutSession.bind(this), function(){});
		//llamar a cerrar sesion en la API
		
		
	}
	logoutSession(){
		axios.get('http://localhost:5000/logout', {withCredentials: true})
      	  	.then(res => {
                var response = res.data; 
      	  	  	if (response.msg === "error") {      	  	  	  	
      	  	  		alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+response.detail);  	  	  	  	
      	  	  	} else if (response.msg === "success"){
      	  	  	  	this.props.history.push('/'); 
      	  	  	  	//return <Redirect to="/" />;
      	  	  	}
      	  	})
      	  	.catch(err => {
      	  	  	alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+err);      	  	  
      	  	});
	}	
  	render() {
  	  	return (  	  		
  			<Dropdown  id="ContentUser" className="ContentUser">	
  				<Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">  	  					 		  
					<div className="NombreUsuario">{this.props.username}</div>	
					<div className="OptionUsuario">
						<MaterialIcon size={30} icon="keyboard_arrow_down" invert />
					</div>					
				</Dropdown.Toggle>
				<Dropdown.Menu  style={{ marginTop: '50px'}}>
				  	<Dropdown.Item eventKey="1"><MaterialIcon size={24} icon="account_circle" />Datos del Usuario</Dropdown.Item>
				  	<Dropdown.Item eventKey="1" onClick={this.btnLogoutSession.bind(this)}><MaterialIcon size={24} icon="close" />Cerrar Sesi&oacute;n</Dropdown.Item>				  	
				</Dropdown.Menu>
			</Dropdown>			    		
	    );
  	}
}

export default NameUser
