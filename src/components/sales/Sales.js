/**
* CLASS Sales
*
* Contiene el contenedor principal de las ventas
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import DataGrid from '../data_grid/DataGrid';

class Sales extends Component {  
  	render() {       
        return (
            <DataGrid titulo='Ventas' 
                      funcionClick={this.props.funcionClick}  
                      parametro={this.props.parametro}                     
                      colsHeaders={[ 'Fecha Venta','Producto','Cliente','Peso','Valor Venta' ]}
                      colsData={[ 'fecha_venta','tipo_producto','cliente','peso','valor_venta' ]} 
                      automatica="true"
                      botonNuevo="true" 
                      formFields={[
                                    {
                                        label : 'Fecha de Venta',
                                        field : 'fecha_venta',
                                        type  : 'date',
                                        validation : '',
                                        required : 'true'
                                    },
                                    {
                                        label : 'Tipo de Producto',
                                        field : 'id_tipo_producto',
                                        type  : 'select',
                                        validation : '',
                                        required : 'true',
                                        dinamic : 'true',
                                        apiField : 'product_types',
                                        valueName : 'nombre'
                                    },                                    
                                    {
                                        label : 'Cliente',                                        
                                        type  : 'data_select',
                                        field : 'id_cliente',
                                        dataParams : { 
                                                         fetchData : {
                                                              fieldFetch  : 'razon_social',
                                                              idField     : 'id_cliente',
                                                              valueField  : 'cliente',
                                                         },
                                                         apiField    : 'customers',
                                                         colsHeaders : [ 'Documento','Nombre' ],
                                                         colsData    : [ 'documento','razon_social' ],                                                         
                                                     },
                                        validation : '',
                                        required : 'true'                                        
                                    },
                                    {
                                        label : 'Precio',
                                        field : 'peso',
                                        type  : 'text',
                                        validation : 'entero',
                                        required : 'true'
                                    },
                                    {
                                        label : '',
                                        field : 'id_empresa',
                                        type  : 'campo_empresa',
                                        validation : '',
                                        required : 'true'                                        
                                    }, 
                                ]}                     
                      apiField = {'sales'}
                      mainContainer='Sales'/>             
        )
    } 
}

export default Sales