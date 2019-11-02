/**
* CLASS FormDataUser
*
* Contiene el componente formulario de datos de usuario
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import ComboBoxFormDataGrid from '../data_grid/ComboBoxFormDataGrid';
import globalState from '../configuration/GlobalState';
import {uploaderFile} from '../api_calls/ApiCalls';
import {ValidateExtension} from '../configuration/GlobalFunctions';
import configJson from '../configuration/configuration.json';
import alertify from 'alertifyjs';
import '../../css/alertify.css';
import Form from 'react-bootstrap/Form';
import './desktop.css'; 

class FormDataUser extends Component {
    constructor(props) {        
        super(props);
        var userData = globalState.getState().userData;        
        this.state = {  
                        id : userData[0].id,
                        email : userData[0].email,
                        primer_nombre : userData[0].primer_nombre,
                        segundo_nombre : userData[0].segundo_nombre,
                        primer_apellido : userData[0].primer_apellido,
                        segundo_apellido : userData[0].segundo_apellido,
                        id_tipo_documento :  userData[0].id_tipo_documento,
                        documento : userData[0].documento,
                        direccion : userData[0].direccion,
                        telefono : userData[0].telefono,
                        imagenUser  : 'default.png'
                     }

        globalState.dispatch({//cargamos lo datos del formulario y los dejamos disponibles en toda la sesion
            type   : "formDataUser",
            params : {  
                        id : userData[0].id,
                        email : userData[0].email,
                        primer_nombre : userData[0].primer_nombre,
                        segundo_nombre : userData[0].segundo_nombre,
                        primer_apellido : userData[0].primer_apellido,
                        segundo_apellido : userData[0].segundo_apellido,
                        id_tipo_documento :  userData[0].id_tipo_documento,
                        documento : userData[0].documento,
                        direccion : userData[0].direccion,
                        telefono : userData[0].telefono,
                        imagenUser  : userData[0].imagen_usuario 
                     }
        });
    }
    componentWillMount() {
        //....
    }
    componentDidMount(){
        var userData = globalState.getState().userData;    
        if(userData[0].imagen_usuario !== undefined && userData[0].imagen_usuario !== ""){
            this.setState({imagenUser : userData[0].imagen_usuario});
        }
    }
    changeTipoIdentificacion(e){
        this.setState({ id_tipo_documento : e.target.value });
        globalState.getState().formDataUser['id_tipo_documento'] = e.target.value;
    }
    handleStateChange(e) {     //CARGAR AL ESTADO GLOBAL LOS DATOS DEL FUNCIONARIO  
        this.setState({ [e.target.name]: e.target.value }); 
        globalState.getState().formDataUser[e.target.name] = e.target.value;                        
    }
    handleImageUser(e) {
        //subir la imagen del usuario
        var file  = e.target.files[0];     
        var allowedFiles = [".jpg", ".jpeg", ".png"];
        if(!ValidateExtension(allowedFiles,file.name)){
            alertify.alert('Error!', 'Solo se permiten imagenes con extension jpeg, jpg o png !');
        }
        else{            
            if(file.size > configJson.maxAvatarSize){
                alertify.alert('Error!', 'Solo se permiten imagenes de maximo 500K!');
            }
            else{                
                uploaderFile(file,'users','imagen_usuario',this.state.id,configJson.folderAvatarUser).then(res => {
                    var response = res.data; 
                    if (response.msg === "error") {
                        alertify.alert('Error!', 'Ha ocurrido un error subiendo el archivo!<br />Codigo de Error: '+response.detail);
                    } else {                         
                        this.setState({imagenUser : response.detail});
                        globalState.dispatch({
                                        type   : "imageUser",
                                        params : response.detail
                                    });                                  
                    }
                })
                .catch( err => {            
                    alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+err);
                });  
            }
        } 
    }    
  	render() {
        var date = new Date();
        var randomDate = date.getTime();  
        var path = "http://"+window.location.hostname+":5000/";              
  	  	return (
  				<div className="container" style={{ height:'calc(100% - 92px)',overflowY : 'auto' }}>
                    <div className="content"> 
                        <br />
                        <div id="contentImageUser">
                            <div className="divImageUser">
                                <img id="ImageUser" alt="imageUser" src={path+configJson.folderAvatarUser+this.state.imagenUser+'?'+randomDate} />
                                <input id="uploadedImageUser" type="file" name="uploadedImageUser" onChange={this.handleImageUser.bind(this)}/>
                            </div>
                        </div>
                        <div className="table-responsive mb-3">
                            <Form>
                                <Form.Group controlId="formBasicUsername">
                                     <Form.Label>Usuario</Form.Label>
                                     <Form.Control name = "email" type="email" readOnly defaultValue={this.state.email}/>                               
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