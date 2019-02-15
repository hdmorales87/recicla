import React, { Component } from 'react';
import PurchasesContainer from './PurchasesContainer';
import Button from 'react-bootstrap/Button';

class Purchases extends Component {    
  	handleNewButton(){
        this.props.funcionClick('FormPurchase');
        //console.log(this.props.funcionClick);
    }    
  	render() {
        //if (this.state.empleados.length > 0) {
        return (
            <div className="container">
                <div className="content">
                    <div className="table-responsive mt-4">
                        <h2>Compras</h2>
                    </div>
                    <hr />
                    <div className="table-responsive mb-3">
                        <Button variant="primary" onClick={this.handleNewButton.bind(this)}>AGREGAR NUEVO</Button>
                    </div>                    
                    <div className="table-responsive">
                        <PurchasesContainer funcionClick={this.props.funcionClick}/>
                    </div>                    
                </div>
            </div>             
        )
    } 
}

export default Purchases
