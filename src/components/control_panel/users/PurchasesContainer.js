import React, { Component } from 'react';
import PurchasesList from './PurchasesList';
import Table from 'react-bootstrap/Table';

class PurchasesContainer extends Component {
    constructor(props) {
        let  purchases = [
                            { 
                                key: '1',
                                tipo_compra: 'CARTON',
                                reciclador: 'JUAN VELEZ',
                                peso: '20',
                                fecha: '2019-02-14'
                            },
                            { 
                                key: '2',
                                tipo_compra: 'PAPEL',
                                reciclador: 'CARLOS ANDRADE',
                                peso: '44',
                                fecha: '2019-02-12'
                            }
                         ];
        super(props);
        this.state = {  
                        purchases:  purchases
                     }
    }
  	handleClick(val) {
  	  	this.setState({ justClicked: val });
  	}
    componentWillMount() {
        fetch('http://taller-angular.carlosazaustre.es/purchases')
        .then((response) => {
            return response.json()
        })
        .then((purchases) => {
            this.setState({ purchases: purchases })
        })
        .catch(function(error) {
            console.log(error);
        });
    }
  	render() {       
        if (this.state.purchases.length > 0) {
            return (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Tipo</th>
                            <th>Reciclador</th>
                            <th>Peso</th>
                            <th>Fecha</th>
                            <th style= {{width: '180px'}}>Acciones</th>
                        </tr>
                    </thead>      
                    <PurchasesList listado={this.state.purchases} funcionClick={this.props.funcionClick}/>                                       
                </Table>
            )
        } else {
            return <p className="text-center">Cargando compras...</p>
        }
    } 
}

export default PurchasesContainer
