/**
* CLASS Purchases
*
* Contiene el contenedor principal de las compras
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import DataGrid from '../data_grid/DataGrid';

class Purchases extends Component {  
  	render() {       
        return (
            <DataGrid titulo='Compras' 
                      funcionClick={this.props.funcionClick}  
                      parametro={this.props.parametro} 
                      colsData={[ 
                                    {
                                        type  : 'bd',
                                        label : 'Fecha Compra',
                                        field : 'fecha_compra'
                                    },
                                    {
                                        type  : 'bd',
                                        label : 'Producto',
                                        field : 'tipo_producto'
                                    },
                                    {
                                        type  : 'bd',
                                        label : 'Reciclador',
                                        field : 'reciclador'
                                    },
                                    {
                                        type  : 'bd',
                                        label : 'Peso',
                                        field : 'peso'
                                    },
                                    {
                                        type  : 'bd',
                                        label : 'Valor Compra',
                                        field : 'valor_compra'
                                    },                                    
                                ]} 
                      automatica="true"
                      botonNuevo="true"
                      botonesExportar="true"
                      filtroFechas="true" 
                      formFields={[
                                    {
                                        label : 'Fecha de Compra',
                                        field : 'fecha_compra',
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
                                        label : 'Reciclador',                                        
                                        type  : 'data_select',
                                        field : 'id_reciclador',
                                        dataParams : { 
                                                         fetchData : {
                                                              fieldFetch  : 'nombre',
                                                              idField     : 'id_reciclador',
                                                              valueField  : 'reciclador',
                                                         },
                                                         apiField    : 'reciclators',                                                         
                                                         colsData    : [ 
                                                                            {
                                                                                type  : 'bd',
                                                                                label : 'Documento',
                                                                                field : 'documento'
                                                                            },
                                                                            {
                                                                                type  : 'bd',
                                                                                label : 'Nombre',
                                                                                field : 'nombre'
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
                      apiField = {'purchases'}
                      mainContainer='Purchases'/>             
        )
    } 
}

export default Purchases