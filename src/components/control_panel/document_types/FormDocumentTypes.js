import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import alertify from 'alertifyjs';
import '../../../css/alertify.css';

class FormPurchase extends Component {
  	
  	constructor(props) {
        super(props);
        if(this.props.parametro != null){
            this.state = {nombre: this.props.parametro.nombre};
            //this.state = {};
        }
        else{
            this.state = {nombre: ''};           
        }

        this.handleCancelButton = this.handleCancelButton.bind(this);
        this.handleSaveButton = this.handleSaveButton.bind(this);
    }   
    handleCancelButton(){
        this.props.funcionClick('DocumentTypes');        
    }
    handleSaveButton(id){

        var props = this.props;
        console.log(props);
        //GUARDAR/EDITAR LA INFORMACION
        
        if(this.state.nombre === undefined || this.state.nombre === ''){
            alertify.error('Digite el nombre!'); 
            return;
        }  
        
        var userData = {
            id : id,
            nombre : this.state.nombre           
        };

        var url = 'document_types';
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
                this.props.funcionClick('DocumentTypes');              
            }
        })
        .catch(function (error) {
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+error);
        });

        //console.log(userData);
    }
    handleNameChange(e) { 
        this.setState({nombre: e.target.value}); 
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
                        <div className="titulo">{titulo} Tipo de Documento</div>
                    </div>
                    <hr />
                    <div className="table-responsive mb-3">	
  	 		    		<Form>
						  	<Form.Group controlId="formBasicTipoCompra">
						  	  	<Form.Label>Nombre</Form.Label>
						  	  	<Form.Control type="text" onChange={this.handleNameChange.bind(this)} value={this.state.nombre}/>						  	  	
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

export default FormPurchase
