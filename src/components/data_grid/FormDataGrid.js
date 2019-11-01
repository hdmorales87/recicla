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
import configJson from '../configuration/configuration.json';
import globalState from '../configuration/GlobalState';
import {divMouseOver,divMouseOut,validarEmail,modalLoading} from '../configuration/GlobalFunctions';
import Window from '../window/Window';
import {insertarActualizarFila,eliminarFilas} from '../api_calls/ApiCalls';
import alertify from 'alertifyjs';
import '../../css/alertify.css';
import './dataGrid.css'; 

class FormDataGrid extends Component {
  	
  	constructor(props) {
        super(props);
        //cargar dinamicamente los estados        
        this.state = {};           
        //botones de cancelar y guardar      
        this.handleCancelButton = this.handleCancelButton.bind(this);
        this.handleSaveButton   = this.handleSaveButton.bind(this);
        this.handleConfirmAction = this.handleConfirmAction.bind(this);
        this.funcionEditDataSelect = this.funcionEditDataSelect.bind(this);
    } 
    componentWillMount(){
        this.props.parametro.formFields.forEach((formFields,i) => {            
            if(this.props.parametro.idRow !== 0){                
                if(this.props.parametro.idRow[formFields.field] === '' || this.props.parametro.idRow[formFields.field] === undefined || this.props.parametro.idRow[formFields.field] === null){
                    this.setState({[formFields.field] : ''});
                }
                else{         
                    this.setState({[formFields.field] : this.props.parametro.idRow[formFields.field]});           
                    if(formFields.type==='data_select'){//adicional pone el texto en el input del data select
                        this.setState({[formFields.dataParams.fetchData.valueField] : this.props.parametro.idRow[formFields.dataParams.fetchData.valueField]});
                    }
                }
            }
            else{
                if(formFields.type==='select'){
                    this.setState({[formFields.field] : 1});            
                }
                else{                    
                    this.setState({[formFields.field] : ''});                          
                }                
            }
        });
    } 
    componentDidMount(){
        this.setState({windowDataSelectId : ''});
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
                if(formFields.validation === 'email'){
                    if(!validarEmail(this.state[formFields.field])){
                        alertify.error('No es una cuenta de Email Valida en el campo '+formFields.label+'!'); 
                        errors++;
                        return;
                    }
                }                
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
        modalLoading(true);     
        //ajax que llama a la API para insertar o actualizar        
        insertarActualizarFila(method,this.props.parametro.apiField,arrayData)
        .then(response => {
            modalLoading(false); 
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
    handleStateChange(validation,e) {         
        var ingresado = e.target.value; //validaciones
        if(validation === 'mayusculas'){
            ingresado = ingresado.toUpperCase();
        }
        if(validation === 'email'){
            ingresado = ingresado.toLowerCase();
        }
        if(validation === 'entero'){
            ingresado = ingresado.replace(/[^\d]/g,'');
        }
        if(validation === 'numero_real'){
            ingresado = ingresado.replace(/[^\d.]/g,'');
        } 
        if(validation === 'numero_texto'){
            ingresado = ingresado.replace(/[^a-zA-Z0-9&]/g,'');
            ingresado = ingresado.toUpperCase();
        }       
        
        this.setState({ [e.target.name]: ingresado });
            
    }   
    handleDeleteButton(id){//boton eliminar
        alertify.confirm('Confirmacion', 'Esta seguro(a) de eliminar este item?', this.handleConfirmAction.bind(this,id), function(){});
    }   
    handleConfirmAction(id) {        
        //CODIGO PARA ELIMINAR LA FILA        
        eliminarFilas(this.props.parametro.apiField,id)
        .then(response => {            
            response = response.data;
            if(response.msg === 'error'){
                alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail); 
            }
            else if(response.msg === 'notExist'){
                alertify.alert('Error!', 'El dato a eliminar no existe!'); 
            }
            this.props.funcionClick('WelcomePage'); 
            this.props.funcionClick(this.props.parametro.mainContainer);
        })
        .catch(function (error) {
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+error);
        });        
    }  
    handleDataSelect(dataParams){//al dar clic en el campo de texto
        dataParams['funcionEdit'] = this.funcionEditDataSelect;      
        this.setState({windowDataSelectId : "windowFormDataSelect_"+this.props.parametro.mainContainer+"_"+dataParams.idField }, () => {
            globalState.dispatch({
                type   : "windowFormDataSelect_"+this.props.parametro.mainContainer+"_"+dataParams.idField,
                params : {
                    visible : true,
                    params  : dataParams
                }
            })
        });        
    }
    funcionEditDataSelect(data,params){//la funcion que carga los datos del DataSelect        
        this.setState({[params.idField] : data.id });
        this.setState({[params.valueField] : data[params.fieldFetch]});
        this.setState({windowDataSelectId : "windowFormDataSelect_"+this.props.parametro.mainContainer+"_"+params.idField }, () => {
            globalState.dispatch({
                type   : "windowFormDataSelect_"+this.props.parametro.mainContainer+"_"+params.idField,
                params : {
                    visible : false,                    
                }
            })
        }); 
    }  
  	render() {
    	var titulo = 'Agregar';
        var id = 0;
        var field = '';
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
                                this.props.parametro.formFields.map((formFields,i) => {
                                    if(formFields.type === 'text' || formFields.type === 'date'){
                                        field = <Form.Group key= {i} controlId="formBasicTipoCompra">
                                                    <Form.Label>{formFields.label}</Form.Label>
                                                    <Form.Control name = {formFields.field} type={formFields.type} onChange={this.handleStateChange.bind(this,formFields.validation)} value={this.state[formFields.field]}/>                               
                                               </Form.Group>
                                    }                                    
                                    else if(formFields.type === 'select'){
                                        field = <Form.Group key= {i} controlId="formBasicTipoCompra">
                                                    <Form.Label>{formFields.label}</Form.Label>
                                                    <ComboBoxFormDataGrid valueName = {formFields.valueName} options = {formFields.options} apiField={formFields.apiField} dinamic={formFields.dinamic} name = {formFields.field} type={formFields.type} functionChange={this.handleStateChange.bind(this,formFields.validation)} value={this.state[formFields.field]}/>                               
                                               </Form.Group>
                                    }
                                    else if(formFields.type === 'data_select'){                                           
                                        field = <Form.Group key= {i} controlId="formBasicTipoCompra">
                                                    <input type="hidden" name = {formFields.field} value={this.state[formFields.field]} />
                                                    <Form.Label>{formFields.label}</Form.Label>
                                                    <Form.Control style={{backgroundColor:'#fff'}} name={formFields.dataParams.fetchData.valueField} type="text" onClick={this.handleDataSelect.bind(this,formFields.dataParams)} value={this.state[formFields.dataParams.fetchData.valueField] || 'Seleccione...'} readOnly/>                                
                                               </Form.Group>
                                    }
                                    return field;
                                })
                            }						  							  						  	
    				  	    <Button id="formGridBtnSave" className="float-left mr-3" variant="primary" onClick={this.handleSaveButton.bind(this,id)} style={{backgroundColor:configJson.fondoBotonGrilla}} onMouseOut={divMouseOut.bind(this,'formGridBtnSave',configJson.fondoBotonGrilla)} onMouseOver={divMouseOver.bind(this,'formGridBtnSave',configJson.fondoBotonGrilla)}>
    				  	      	GUARDAR
    				  	    </Button>                                                    
    				  	    <Button variant="secondary" className="float-left mr-3" onClick={this.handleCancelButton.bind(this)}>
    				  	      	CANCELAR
    				  	    </Button>
                            {                                
                                this.props.parametro.idRow !== 0 ?
                                    <Button id="formGridBtnDelete" className="float-left mr-3" variant="danger" onClick={this.handleDeleteButton.bind(this,id)} onMouseOut={divMouseOut.bind(this,"formGridBtnDelete","#dc3545")} onMouseOver={divMouseOver.bind(this,"formGridBtnDelete","#dc3545")}>
                                        ELIMINAR
                                    </Button>                                
                                :  ""                                
                            }                            
    				    </Form>
                        <Window   //ventana para el data select
                            id = {this.state.windowDataSelectId}                    
                            title='Seleccione ...'
                            width='400px' 
                            height='300px'                     
                            tbar="false"
                            componente="DataGridSelect"
                            params="" 
                        /> 
    			    </div> 
    		    </div> 	  	 		       
    	    </div> 	
    	);
  	}
}

export default FormDataGrid