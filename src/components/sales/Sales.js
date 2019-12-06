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
        let sqlParams = {
                            sqlCols : [
                                'T1.id',
                                '(T1.peso * PT.precio_venta) AS valor_venta',
                                'DATE_FORMAT(T1.fecha_venta,"%Y-%m-%d") AS fecha_venta',
                                'PT.id AS id_tipo_producto',
                                'PT.nombre AS tipo_producto',
                                'R.id AS id_cliente',
                                'R.razon_social AS cliente',
                                'T1.peso',
                                'T1.id_empresa'
                            ],
                            sqlJoin : [
                                'INNER JOIN product_types AS PT ON (PT.id = T1.id_tipo_producto)', 
                                'INNER JOIN customers AS R ON (R.id = T1.id_cliente) '
                            ],
                            fieldSearch : [
                                'PT.nombre',
                                'R.razon_social',
                                'T1.peso'
                            ],
                            sqlEmpresa : "true",
                            fieldFechas : "T1.fecha_venta"                    
                        };    
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
                      sqlParams = { sqlParams }
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
                                        valueName : 'nombre',
                                        sqlParams : {
                                                        sqlCols : [
                                                            'id',
                                                            'nombre'                                
                                                        ], 
                                                        andEmpresa : 'true'                                                                                                      
                                                    }
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
                                                                        ],
                                                         sqlParams : {
                                                                        sqlCols : [                                
                                                                            'documento',
                                                                            'razon_social'                                
                                                                        ],                            
                                                                        fieldSearch : [
                                                                            'documento',
                                                                            'nombre_comercial',
                                                                            'razon_social',
                                                                            'direccion',
                                                                            'telefono',
                                                                        ],
                                                                        sqlEmpresa : "true",                                               
                                                                     }                                                                                           
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