import React, { Component } from 'react';
import PurchaseTypesContainer from './PurchaseTypesContainer';
import Button from 'react-bootstrap/Button';

class PurchaseTypes extends Component {    
  	handleNewButton(){
        this.props.funcionClick('FormPurchaseTypes');
        //console.log(this.props.funcionClick);
    }    
  	render() {
        //if (this.state.empleados.length > 0) {
        return (
            <div className="container">
                <div className="content">
                    <div className="table-responsive mt-4">
                        <div className="titulo">Típos de Compra</div>
                    </div>
                    <hr />
                    <div className="table-responsive mb-3">
                        <Button variant="primary" onClick={this.handleNewButton.bind(this)}>AGREGAR NUEVO</Button>
                    </div>                    
                    <div className="table-responsive" style={{height:'500px'}}>
                        <PurchaseTypesContainer funcionClick={this.props.funcionClick}/>
                    </div>                    
                </div>
            </div>             
        )
    } 
}

export default PurchaseTypes
