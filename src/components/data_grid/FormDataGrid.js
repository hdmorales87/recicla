import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import alertify from 'alertifyjs';
import '../../css/alertify.css';

class FormDataGrid extends Component {
  	
  	constructor(props) {
        super(props);
        //cargar dinamicamente los estados
        this.state = {};
        
        this.props.parametro.formFields.map((formFields,i) => {
            if(this.props.parametro.idRow != 0){
                this.state[formFields.field] = this.props.parametro.idRow[formFields.field];              
            }
            else{
                this.state[formFields.field] = '';                
            }
        });        
        
        //this.handleStateChange  = this.handleStateChange.bind(this);
        this.handleCancelButton = this.handleCancelButton.bind(this);
        this.handleSaveButton   = this.handleSaveButton.bind(this);
    }   
    handleCancelButton(){
        this.props.funcionClick(this.props.parametro.mainContainer);        
    }
    handleSaveButton(id){

        //recorrido dinamico de los campos y cargar dinamicamente el arrayData
        var arrayData = {};
        var errors = 0;

        this.props.parametro.formFields.map((formFields,i) => {
            if((this.state[formFields.field] === undefined || this.state[formFields.field] === '') && formFields.required === 'true'){
                alertify.error('Digite el campo '+formFields.label+'!'); 
                errors++;
                return;
            } 
            else{
                arrayData[formFields.field] = this.state[formFields.field];
            }
        });

        if(errors > 0){
            return;
        }            
      
        var method = '';

        if(id>0){           
            method = 'put';            
        }
        else{            
            method = 'post';
        } 

        axios({
            method: method,
            url: this.props.parametro.apiUrl,
            data: arrayData,
            withCredentials: true
        })
        .then(response => {
            var response = response.data;
            if(response.msg === 'error'){
                alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail); 
            }
            else {
                this.props.funcionClick(this.props.parametro.mainContainer);              
            }
        })
        .catch(function (error) {
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+error);
        });

        //console.log(userData);
    }
    //manejo dinamico de los estados
    handleStateChange(e) {       
        this.setState({ [e.target.name]: e.target.value });     
    }    
  	render() {
  		  var titulo = 'Agregar';
          var id = 0;
  		  if(this.props.parametro.idRow != 0){
  		  	  titulo = 'Editar';
            id = this.props.parametro.id;
  		  } 			
  		  return (  	  		  	  	
  	  		<div className="container">
                <div className="content">
                    <div className="table-responsive mt-4">
                        <div className="titulo">{titulo} {this.props.parametro.titulo}</div>
                    </div>
                    <hr />
                    <div className="table-responsive mb-3">	
  	 		    		<Form>
                            {
                                //cargar dinamicamente los campos
                                this.props.parametro.formFields.map((formFields,i) => {                                    
                                    return <Form.Group key= {i} controlId="formBasicTipoCompra">
                                                <Form.Label>{formFields.label}</Form.Label>
                                                <Form.Control name = {formFields.field} type={formFields.type} onChange={this.handleStateChange.bind(this)} value={this.state[formFields.field]}/>                               
                                            </Form.Group>
                                })
                            }						  							  						  	
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

export default FormDataGrid
