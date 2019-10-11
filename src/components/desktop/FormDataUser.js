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
import Form from 'react-bootstrap/Form';
import {loadFormDataUser} from '../api_calls/ApiCalls';
import './desktop.css';

const path = configJson.apiPath; 

class FormDataUser extends Component {
    constructor(props) {        
        super(props);
        this.state = {  
                        tipo_identificacion :  ""
                     }
    }
    componentWillMount() {
        loadFormDataUser()
        .then(res => {
            var response = res.data; 
            if (response.msg === "error") {
                alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail);
            } else {
                this.setState({ content: response })
            }
        })
        .catch( err => {            
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+err);
        });
    }
    changeTipoIdentificacion(e){
        this.setState({ tipo_identificacion : e.target.value });
    }
  	render() {
        
  	  	return (
  				  <div className="container">
                <div className="content"> 
                    <br />
                    <div className="table-responsive mb-3">
                        <Form>
                            <Form.Group controlId="formBasicUsername">
                                 <Form.Label>Usuario</Form.Label>
                                 <Form.Control name = "username" type="email" value="holalala" readOnly/>                               
                            </Form.Group>                        
                            <Form.Group controlId="formBasicFirstname">
                                 <Form.Label>Primer Nombre</Form.Label>
                                 <Form.Control name = "primer_nombre" type="text" value="holalala"/>                               
                            </Form.Group>                        
                            <Form.Group controlId="formBasicSecondname">
                                 <Form.Label>Segundo Nombre</Form.Label>
                                 <Form.Control name = "segundo_nombre" type="text" value="holalala"/>                               
                            </Form.Group>                        
                            <Form.Group controlId="formBasicLastname1">
                                 <Form.Label>Primer Apellido</Form.Label>
                                 <Form.Control name = "primer_apellido" type="text" value="holalala"/>                               
                            </Form.Group>                        
                            <Form.Group controlId="formBasicLastname2">
                                 <Form.Label>Segundo Apellido</Form.Label>
                                 <Form.Control name = "segundo_apellido" type="text" value="holalala"/>                               
                            </Form.Group>                        
                            <Form.Group controlId="formBasicLastname2">
                                 <Form.Label>Tipo Identificacion</Form.Label>
                                 <ComboBoxFormDataGrid valueName = "nombre" apiField={'document_types'} dinamic="true" name = "tipo_identificacion" type="select" functionChange={this.changeTipoIdentificacion.bind(this)} value={this.state.tipo_identificacion}/>                                                            
                            </Form.Group>                        
                            <Form.Group controlId="formBasicDocument">
                                 <Form.Label>Identificacion</Form.Label>
                                 <Form.Control name = "identificacion" type="text" value="holalala"/>                               
                            </Form.Group>                      
                            <Form.Group controlId="formBasicAddress">
                                 <Form.Label>Direccion</Form.Label>
                                 <Form.Control name = "direccion" type="text" value="holalala"/>                               
                            </Form.Group>
                            <Form.Group controlId="formBasicPhone">
                                 <Form.Label>Telefono</Form.Label>
                                 <Form.Control name = "telefono" type="text" value="holalala"/>                               
                            </Form.Group>
                        </Form>
                    </div> 
                </div>
            </div>  				
			  );
  	}
}

export default FormDataUser