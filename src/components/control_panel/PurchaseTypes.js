import React, { Component } from 'react';
import DataGrid from '../data_grid/DataGrid';
import Button from 'react-bootstrap/Button';

class PurchaseTypes extends Component {    
  	  
  	render() {        
        //if (this.state.empleados.length > 0) {
        return (
            <DataGrid titulo='Tipos de Compra' 
                      funcionClick={this.props.funcionClick}                       
                      colsHeaders={[ 'Nombre','Precio' ]}
                      colsData={[ 'nombre','precio' ]} 
                      formFields={[
                                    {
                                        label : 'Nombre',
                                        field : 'nombre',
                                        type  : 'text',
                                        validation : 'mayusculas',
                                        required : 'true'
                                    },
                                    {
                                        label : 'Precio',
                                        field : 'precio',
                                        type  : 'text',
                                        validation : 'entero',
                                        required : 'true'
                                    }
                                ]}                     
                      apiUrl='http://localhost:5000/purchase_types'
                      mainContainer='PurchaseTypes'/>             
        )
    } 
}

export default PurchaseTypes
