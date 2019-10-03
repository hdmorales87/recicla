/**
* CLASS FormDataGrid
*
* Contiene el formulario dinamico del datagrid
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ComboBoxFormDataGrid from './ComboBoxFormDataGrid';
import {insertarActualizarFila} from '../api_calls/ApiCalls';
import alertify from 'alertifyjs';
import '../../css/alertify.css';

class FormDataGrid extends Component {
  	
  	constructor(props) {
        super(props);
        //cargar dinamicamente los estados
        this.state = {};
        
        this.props.parametro.formFields.forEach((formFields,i) => {
            if(this.props.parametro.idRow !== 0){                
                if(this.props.parametro.idRow[formFields.field] === '' || this.props.parametro.idRow[formFields.field] === undefined || this.props.parametro.idRow[formFields.field] === null){
                    this.state[formFields.field] = '';
                }
                else{
                    this.state[formFields.field] = this.props.parametro.idRow[formFields.field];             
                }
            }
            else{
                if(formFields.type==='select'){
                    this.state[formFields.field] = 1;            
                }
                else{
                    this.state[formFields.field] = '';         
                }                
            }
        });    
        //botones de cancelar y guardar      
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


        this.props.parametro.formFields.forEach((formFields,i) => {
            if((this.state[formFields.field] === undefined || this.state[formFields.field] === '') && formFields.required === 'true'){
                alertify.error('Digite el campo '+formFields.label+'!'); 
                errors++;
                return;
            } 
            else{
                arrayData[formFields.field] = this.state[formFields.field];
            }
        });
        //hay errores?
        if(errors > 0){
            return;
        }            
      
        var method = '';

        if(id>0){//si es update o insert           
            method = 'put';
            arrayData['id'] = id;//mandar el ID
        }
        else{            
            method = 'post';
        }        
        //ajax que llama a la API para insertar o actualizar        
        insertarActualizarFila(method,this.props.parametro.apiUrl,arrayData)
        .then(response => {
            response = response.data;
            if(response.msg === 'error'){
                alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail); 
            }
            else {
                //aqui es donde refresca el datagrid una vez se han hecho los cambios
                this.props.funcionClick(this.props.parametro.mainContainer);              
            }
        })
        .catch(function (error) {
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+error);
        });
    }
    //manejo dinamico de los estados, con esto actualizo el valor de cualquier campo para enviarlos a la API
    handleStateChange(e) {       
        this.setState({ [e.target.name]: e.target.value });     
    }    
  	render() {
  		  var titulo = 'Agregar';
          var id = 0;
  		  if(this.props.parametro.idRow !== 0){
  		  	  titulo = 'Editar';
              id = this.props.parametro.idRow.id;
  		  }          			
  		  return (  //carga dinamica del formulario	  		  	  	
  	  		<div className="container">
                <div className="content">
                    <div className="table-responsive mt-4">
                        <div className="titulo">{titulo} {this.props.parametro.titulo}</div>
                    </div>
                    <hr />
                    <div className="table-responsive mb-3">	
  	 		    		<Form>
                            {
                                //cargar dinamicamente los campos, dependiendo si es input o select
                                this.props.parametro.formFields.forEach((formFields,i) => {                                    
                                    if(formFields.type === 'text'){
                                        return <Form.Group key= {i} controlId="formBasicTipoCompra">
                                                    <Form.Label>{formFields.label}</Form.Label>
                                                    <Form.Control name = {formFields.field} type={formFields.type} onChange={this.handleStateChange.bind(this)} value={this.state[formFields.field]}/>                               
                                               </Form.Group>
                                    }
                                    else if(formFields.type === 'select'){
                                        return <Form.Group key= {i} controlId="formBasicTipoCompra">
                                                    <Form.Label>{formFields.label}</Form.Label>
                                                    <ComboBoxFormDataGrid valueName = {formFields.valueName} options = {formFields.options} apiUrl={formFields.apiUrl} dinamic={formFields.dinamic} name = {formFields.field} type={formFields.type} functionChange={this.handleStateChange.bind(this)} value={this.state[formFields.field]}/>                               
                                               </Form.Group>
                                    }                                    
                                    
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
