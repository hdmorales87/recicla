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
        let sqlParams = {
                            sqlCols : [
                                'T1.id',
                                '(T1.peso * PT.precio_compra) AS valor_compra',
                                'DATE_FORMAT(T1.fecha_compra,"%Y-%m-%d") AS fecha_compra',
                                'PT.id AS id_tipo_producto',
                                'PT.nombre AS tipo_producto',
                                'R.id AS id_reciclador',
                                'R.nombre AS reciclador',
                                'T1.peso',
                                'T1.id_empresa'
                            ],
                            sqlJoin : [
                                'INNER JOIN product_types AS PT ON (PT.id = T1.id_tipo_producto)', 
                                'INNER JOIN reciclators AS R ON (R.id = T1.id_reciclador)'
                            ],
                            fieldSearch : [
                                'PT.nombre',
                                'R.nombre',
                                'T1.peso'
                            ],
                            sqlEmpresa : "true",
                            fieldFechas : "T1.fecha_compra"                    
                        };            
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
                      sqlParams = { sqlParams }
                      filtroFechas = "true" 
                      automatica="true"
                      botonNuevo="true"
                      botonesExportar="true"                      
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
                                                                        ],
                                                         sqlParams : {
                                                                        sqlCols : [                                
                                                                            'documento',
                                                                            'nombre'                                
                                                                        ],                            
                                                                        fieldSearch : [
                                                                            'documento',
                                                                            'nombre',
                                                                            'direccion',
                                                                            'telefono',
                                                                            'celular'
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
                      apiField = {'purchases'}
                      mainContainer='Purchases'/>             
        )
    } 
}

export default Purchases