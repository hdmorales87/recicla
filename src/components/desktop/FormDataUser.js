/**
* CLASS Option
*
* Contiene el componente formulario de datos de usuario
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react';
import configJson from '../configuration/configuration.json';
import alertify from 'alertifyjs';
import ComboBoxFormDataGrid from '../data_grid/ComboBoxFormDataGrid';
import globalState from '../configuration/GlobalState';
import Form from 'react-bootstrap/Form';
import {loadFormDataUser} from '../api_calls/ApiCalls';
import './desktop.css'; 

class FormDataUser extends Component {
    constructor(props) {        
        super(props);
        var userData = globalState.getState().userData; 
        this.state = {  
                        
                        username : userData[0].email,
                        primer_nombre : userData[0].primer_nombre,
                        segundo_nombre : userData[0].segundo_nombre,
                        primer_apellido : userData[0].primer_apellido,
                        segundo_apellido : userData[0].segundo_apellido,
                        id_tipo_documento :  userData[0].id_tipo_documento,
                        documento : userData[0].documento,
                        direccion : userData[0].direccion,
                        telefono : userData[0].telefono
                     }

        globalState.dispatch({//cargamos lo datos del formulario y los dejamos disponibles en toda la sesion
            type   : "formDataUser",
            params : {  
                        username : userData[0].email,
                        primer_nombre : userData[0].primer_nombre,
                        segundo_nombre : userData[0].segundo_nombre,
                        primer_apellido : userData[0].primer_apellido,
                        segundo_apellido : userData[0].segundo_apellido,
                        id_tipo_documento :  userData[0].id_tipo_documento,
                        documento : userData[0].documento,
                        direccion : userData[0].direccion,
                        telefono : userData[0].telefono 
                     }
        }); 
    }
    componentWillMount() {
        //....
    }
    changeTipoIdentificacion(e){
        this.setState({ id_tipo_documento : e.target.value });
    }
    handleStateChange(e) {       
        this.setState({ [e.target.name]: e.target.value }); 
        globalState.dispatch({//cargamos lo datos del usuario y los dejamos disponibles en toda la sesion
            type   : "formDataUser",
            params : { [e.target.name] : e.target.value }
        });         
    }    
  	render() {
        
  	  	return (
  				  <div className="container" style={{ height:'calc(100% - 92px)',overflowY : 'auto' }}>
                <div className="content"> 
                    <br />
                    <div className="table-responsive mb-3">
                        <Form>
                            <Form.Group controlId="formBasicUsername">
                                 <Form.Label>Usuario</Form.Label>
                                 <Form.Control name = "username" type="email" readOnly defaultValue={this.state.username}/>                               
                            </Form.Group>                        
                            <Form.Group controlId="formBasicFirstname">
                                 <Form.Label>Primer Nombre</Form.Label>
                                 <Form.Control name = "primer_nombre" type="text" value={this.state.primer_nombre} onChange={this.handleStateChange.bind(this)}/>                               
                            </Form.Group>                        
                            <Form.Group controlId="formBasicSecondname">
                                 <Form.Label>Segundo Nombre</Form.Label>
                                 <Form.Control name = "segundo_nombre" type="text" value={this.state.segundo_nombre} onChange={this.handleStateChange.bind(this)}/>                               
                            </Form.Group>                        
                            <Form.Group controlId="formBasicLastname1">
                                 <Form.Label>Primer Apellido</Form.Label>
                                 <Form.Control name = "primer_apellido" type="text" value={this.state.primer_apellido} onChange={this.handleStateChange.bind(this)}/>                               
                            </Form.Group>                        
                            <Form.Group controlId="formBasicLastname2">
                                 <Form.Label>Segundo Apellido</Form.Label>
                                 <Form.Control name = "segundo_apellido" type="text" value={this.state.segundo_apellido} onChange={this.handleStateChange.bind(this)}/>                               
                            </Form.Group>                        
                            <Form.Group controlId="formBasicLastname2">
                                 <Form.Label>Tipo Identificacion</Form.Label>
                                 <ComboBoxFormDataGrid valueName = "nombre" apiField={'document_types'} dinamic="true" name = "id_tipo_documento" type="select" functionChange={this.changeTipoIdentificacion.bind(this)} value={this.state.id_tipo_documento}/>                                                            
                            </Form.Group>                        
                            <Form.Group controlId="formBasicDocument">
                                 <Form.Label>Identificacion</Form.Label>
                                 <Form.Control name = "documento" type="text" value={this.state.documento} onChange={this.handleStateChange.bind(this)}/>                               
                            </Form.Group>                      
                            <Form.Group controlId="formBasicAddress">
                                 <Form.Label>Direccion</Form.Label>
                                 <Form.Control name = "direccion" type="text" value={this.state.direccion} onChange={this.handleStateChange.bind(this)}/>                               
                            </Form.Group>
                            <Form.Group controlId="formBasicPhone">
                                 <Form.Label>Telefono</Form.Label>
                                 <Form.Control name = "telefono" type="text" value={this.state.telefono} onChange={this.handleStateChange.bind(this)}/>                               
                            </Form.Group>
                        </Form>
                    </div> 
                </div>
            </div>  				
			  );
  	}
}

export default FormDataUser