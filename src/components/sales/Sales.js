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
                      colsData={[ 
                                    {
                                        type  : 'bd',
                                        label : 'Fecha Venta',
                                        field : 'fecha_venta'
                                    },
                                    {
                                        type  : 'bd',
                                        label : 'Producto',
                                        field : 'tipo_producto'
                                    },
                                    {
                                        type  : 'bd',
                                        label : 'Cliente',
                                        field : 'cliente'
                                    },
                                    {
                                        type  : 'bd',
                                        label : 'Factura',
                                        field : 'factura_venta'
                                    },
                                    {
                                        type  : 'bd',
                                        label : 'Peso',
                                        field : 'peso'
                                    },
                                    {
                                        type  : 'bd',
                                        label : 'Valor Venta',
                                        field : 'valor_venta'
                                    },                                    
                                ]}
                      automatica="true"
                      botonNuevo="true"
                      botonesExportar="true"
                      filtroFechas="true"  
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
                                        label : 'Factura(Opcional)',
                                        field : 'factura_venta',
                                        type  : 'text',
                                        validation : 'mayusculas',
                                        required : 'false'
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
                                                         colsData    : [ 
                                                                            {
                                                                                type  : 'bd',
                                                                                label : 'Documento',
                                                                                field : 'documento'
                                                                            },
                                                                            {
                                                                                type  : 'bd',
                                                                                label : 'Nombre',
                                                                                field : 'razon_social'
                                                                            },
                                                                        ]                                                                                          
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
                      permisoInsertUpdate="3"
                      permisoDelete="4"
                      mainContainer='Sales'/>             
        )
    } 
}

export default Sales