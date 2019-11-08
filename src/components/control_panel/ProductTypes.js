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
                      colsData={[ 
                                    {
                                        type  : 'bd',
                                        label : 'Nombre',
                                        field : 'nombre'
                                    },
                                    {
                                        type  : 'bd',
                                        label : 'Precio Compra',
                                        field : 'precio_compra'
                                    },
                                    {
                                        type  : 'bd',
                                        label : 'Precio Venta',
                                        field : 'precio_venta'
                                    },
                                ]} 
                      automatica="true"
                      botonNuevo="true"
                      formFields={[
                                    {
                                        label : 'Nombre',
                                        field : 'nombre',
                                        type  : 'text',
                                        validation : 'mayusculas',
                                        required : 'true'
                                    },
                                    {
                                        label : 'Precio Compra',
                                        field : 'precio_compra',
                                        type  : 'text',
                                        validation : 'entero',
                                        required : 'true'
                                    },
                                    {
                                        label : 'Precio Venta',
                                        field : 'precio_venta',
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