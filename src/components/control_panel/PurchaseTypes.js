/**
* CLASS PurchaseTypes
*
* Contiene el contenedor principal de los tipos de compra
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import DataGrid from '../data_grid/DataGrid';

class PurchaseTypes extends Component {     	  
  	render() {                      
        return (//carga el componente que contiene la grilla de datos   
            <DataGrid titulo='Tipos de Compra' 
                      funcionClick={this.props.funcionClick}   
                      parametro={this.props.parametro}                    
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
                      apiField={'document_types'}
                      mainContainer='PurchaseTypes'/>             
        )
    } 
}

export default PurchaseTypes