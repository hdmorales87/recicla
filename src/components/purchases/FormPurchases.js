import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class FormPurchases extends Component {
  	
  	handleCancelButton(){
        this.props.funcionClick('Purchases');
        
    }
    handleSaveButton(id){
        //GUARDAR/EDITAR LA INFORMACION
        alert(id);
        if(id>0){

        }
        else{

        }       

    }
  	render() {
  		  var titulo = 'Nueva';
  		  if(this.props.parametro > 0){
  		  	  titulo = 'Editar';
  		  } 			
  		  return (  	  		  	  	
  	  		<div className="container">
                <div className="content">
                    <div className="table-responsive mt-4">
                        <div className="titulo">{titulo} Compra</div>
                    </div>
                    <hr />
                    <div className="table-responsive mb-3">	
  	 		    		<Form>
						  	<Form.Group controlId="formBasicTipoCompra">
						  	  	<Form.Label>Tipo de Compra</Form.Label>
						  	  	<Form.Control type="text" />						  	  	
						  	</Form.Group>						
						  	<Form.Group controlId="formBasicReciclador">
						  	  	<Form.Label>Reciclador</Form.Label>
						  	  	<Form.Control type="text" />
						  	</Form.Group>	
						  	<Form.Group controlId="formBasicReciclador">
						  	  	<Form.Label>Peso</Form.Label>
						  	  	<Form.Control type="text" />
						  	</Form.Group>						  						  	
						  	<Button className="float-left mr-3" variant="primary" onClick={this.handleSaveButton.bind(this,this.props.parametro)}>
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

export default FormPurchases
