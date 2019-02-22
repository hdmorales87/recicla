import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import SelectDocumentType from '../document_types/SelectDocumentType';
import alertify from 'alertifyjs';
import '../../../css/alertify.css';

class FormUsers extends Component {
  	
  	constructor(props) {
        super(props);
        if(this.props.parametro != null){
        console.log('sdgsdgsdg');

            this.state = {
                            id_tipo_documento: this.props.parametro.id_tipo_documento,
                            documento: this.props.parametro.documento,
                            primer_nombre: this.props.parametro.primer_nombre,
                            segundo_nombre: this.props.parametro.segundo_nombre,
                            primer_apellido: this.props.parametro.primer_apellido,
                            segundo_apellido: this.props.parametro.segundo_apellido,
                            email: this.props.parametro.email,
                            direccion: this.props.parametro.direccion,
                            telefono: this.props.parametro.telefono
                        };           
        }
        else{
            this.state = {
                            id_tipo_documento: '',
                            documento: '',
                            primer_nombre: '',
                            segundo_nombre: '',
                            primer_apellido: '',
                            segundo_apellido: '',
                            email: '',
                            direccion: '',
                            telefono: ''
                        };                       
        }

        this.handleCancelButton = this.handleCancelButton.bind(this);
        this.handleSaveButton = this.handleSaveButton.bind(this);
    }   
    handleCancelButton(){
        this.props.funcionClick('Users');        
    }
    handleSaveButton(id){

        var props = this.props;
        console.log(props);
        //GUARDAR/EDITAR LA INFORMACION
        
        if(this.state.documento === undefined || this.state.documento === ''){
            alertify.error('Digite el numero de documento!'); 
            return;
        } 
        if(this.state.primer_nombre === undefined || this.state.primer_nombre === ''){
            alertify.error('Digite el primer nombre!'); 
            return;
        }if(this.state.segundo_nombre === undefined || this.state.segundo_nombre === ''){
            alertify.error('Digite el segundo nombre!'); 
            return;
        }if(this.state.primer_apellido === undefined || this.state.primer_apellido === ''){
            alertify.error('Digite el primer apellido!'); 
            return;
        }if(this.state.segundo_apellido === undefined || this.state.segundo_apellido === ''){
            alertify.error('Digite el segundo apellido!'); 
            return;
        }if(this.state.email === undefined || this.state.email === ''){
            alertify.error('Digite el email!'); 
            return;
        }if(this.state.direccion === undefined || this.state.direccion === ''){
            alertify.error('Digite la direccion!'); 
            return;
        } if(this.state.telefono === undefined || this.state.telefono === ''){
            alertify.error('Digite el telefono!'); 
            return;
        }  
        
        var userData = {
            id : id,
            id_tipo_documento : this.state.id_tipo_documento,
            documento : this.state.documento,
            primer_nombre : this.state.primer_nombre,
            segundo_nombre : this.state.segundo_nombre,
            primer_apellido : this.state.primer_apellido,
            segundo_apellido : this.state.segundo_apellido,
            email : this.state.email,
            direccion : this.state.direccion,
            telefono : this.state.telefono         
        };

        var url = 'users';
        var method = '';

        if(id>0){           
            method = 'put';            
        }
        else{            
            method = 'post';
        } 

        axios({
            method: method,
            url: 'http://localhost:5000/'+url,
            data: userData,
            withCredentials: true
        })
        .then(response => {
            var response = response.data;
            if(response.msg === 'error'){
                alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail); 
            }
            else {
                this.props.funcionClick('Users');              
            }
        })
        .catch(function (error) {
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+error);
        });

        //console.log(userData);
    }
    handleDocumentTypeChange(e) { 
        this.setState({id_tipo_documento: e.target.value});         
    } 
    handleDocumentChange(e) { 
        this.setState({documento: e.target.value}); 
    }  
    handleFirstNameChange(e) { 
        this.setState({primer_nombre: e.target.value}); 
    } 
    handleSecondNameChange(e) { 
        this.setState({segundo_nombre: e.target.value}); 
    } 
    handleLastName1Change(e) { 
        this.setState({primer_apellido: e.target.value}); 
    }
    handleLastName2Change(e) { 
        this.setState({segundo_apellido: e.target.value}); 
    }
    handleEmailChange(e) { 
        this.setState({email: e.target.value}); 
    } 
    handleDireccionChange(e) { 
        this.setState({direccion: e.target.value}); 
    } 
    handleTelefonoChange(e) { 
        this.setState({telefono: e.target.value}); 
    }         
  	render() {
  		  var titulo = 'Nuevo';
        var id = 0;
  		  if(this.props.parametro != null){
  		  	  titulo = 'Editar';
            id = this.props.parametro.id;
  		  } 			
  		  return (  	  		  	  	
  	  		<div className="container">
                <div className="content">
                    <div className="table-responsive mt-4">
                        <div className="titulo">{titulo} Usuario</div>
                    </div>
                    <hr />
                    <div className="table-responsive mb-3">	
  	 		    		<Form>
                            <Form.Group controlId="formBasicTipoCompra">
                                <Form.Label>Tipo de Documento</Form.Label>
                                <SelectDocumentType functionChange={ this.handleDocumentTypeChange.bind(this)}/>                                
                            </Form.Group>
                            <Form.Group controlId="formBasicTipoCompra">
                                <Form.Label>Documento</Form.Label>
                                <Form.Control type="text" onChange={this.handleDocumentChange.bind(this)} value={this.state.documento}/>                               
                            </Form.Group> 
                            <Form.Group controlId="formBasicTipoCompra">
                                <Form.Label>Primer Nombre</Form.Label>
                                <Form.Control type="text" onChange={this.handleFirstNameChange.bind(this)} value={this.state.primer_nombre}/>                               
                            </Form.Group>  
                            <Form.Group controlId="formBasicTipoCompra">
                                <Form.Label>Segundo Nombre</Form.Label>
                                <Form.Control type="text" onChange={this.handleSecondNameChange.bind(this)} value={this.state.segundo_nombre}/>                               
                            </Form.Group>
                            <Form.Group controlId="formBasicTipoCompra">
                                <Form.Label>Primer Apellido</Form.Label>
                                <Form.Control type="text" onChange={this.handleLastName1Change.bind(this)} value={this.state.primer_apellido}/>                               
                            </Form.Group>
                            <Form.Group controlId="formBasicTipoCompra">
                                <Form.Label>Segundo Apellido</Form.Label>
                                <Form.Control type="text" onChange={this.handleLastName2Change.bind(this)} value={this.state.segundo_apellido}/>                               
                            </Form.Group>
                            <Form.Group controlId="formBasicTipoCompra">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" onChange={this.handleEmailChange.bind(this)} value={this.state.email}/>                               
                            </Form.Group> 
                            <Form.Group controlId="formBasicTipoCompra">
                                <Form.Label>Direccion</Form.Label>
                                <Form.Control type="text" onChange={this.handleDireccionChange.bind(this)} value={this.state.direccion}/>                               
                            </Form.Group> 
                            <Form.Group controlId="formBasicTipoCompra">
                                <Form.Label>Telefono</Form.Label>
                                <Form.Control type="text" onChange={this.handleTelefonoChange.bind(this)} value={this.state.telefono}/>                               
                            </Form.Group>       						  						  	
						  	<Button className="float-left mr-3" variant="primary" onClick={this.handleSaveButton.bind(this,id)}>
						  	  	Guardar
						  	</Button>
						  	<Button variant="secondary" onClick={this.handleCancelButton.bind(this)}>
						  	  	Cancelar
						  	</Button>
						</Form>
					</div> 
				</div> 	  	 		       
			</div> 	
  	  	);
  	}
}

export default FormUsers
