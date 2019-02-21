import React, { Component } from 'react';
import PurchaseTypesList from './PurchaseTypesList';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import alertify from 'alertifyjs';
import '../../../css/alertify.css';

class PurchaseTypesContainer extends Component {
    constructor(props) {
        let  purchaseTypes = [];
        super(props);
        this.state = {  
                        purchaseTypes :  purchaseTypes
                     }
    }
  	handleClick(val) {
  	  	this.setState({ justClicked: val });
  	}
    componentWillMount() {
        //obtener el listado de tipos de compra
        axios.get('http://localhost:5000/purchase_types', {withCredentials: true})
            .then(res => {
                var response = res.data; 
                if (response.msg === "error") {
                    alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail);
                } else {
                    this.setState({ purchaseTypes: response })
                }
            })
            .catch( err => {            
                alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+err);
            });
    }
  	render() {       
        if (this.state.purchaseTypes.length > 0) {
            return (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nombre</th>
                            <th>Precio</th>                            
                            <th style= {{width: '180px'}}>Acciones</th>
                        </tr>
                    </thead>      
                    <PurchaseTypesList listado={this.state.purchaseTypes} funcionClick={this.props.funcionClick}/>                                       
                </Table>
            )
        } else {
            return <div className="titulo">No hay registros...</div>
        }
    } 
}

export default PurchaseTypesContainer
