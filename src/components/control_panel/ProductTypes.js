/**
* CLASS PurchaseTypes
*
* Contiene el contenedor principal de los tipos de compra
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import DataGrid from '../data_grid/DataGrid';

class ProductTypes extends Component {     	  
  	render() {                      
        return (//carga el componente que contiene la grilla de datos   
            <DataGrid titulo='Tipos de Producto' 
                      funcionClick={this.props.funcionClick}   
                      parametro={this.props.parametro}                    
                      colsHeaders={[ 'Nombre','Precio' ]}
                      colsData={[ 'nombre','precio_compra' ]} 
                      automatica="true"
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
                                        field : 'precio_compra',
                                        type  : 'text',
                                        validation : 'entero',
                                        required : 'true'
                                    }
                                ]}                     
                      apiField={'product_types'}
                      mainContainer='ProductTypes'/>             
        )
    } 
}

export default ProductTypes