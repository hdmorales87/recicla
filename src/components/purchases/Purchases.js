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
                      colsHeaders={[ 'Tipo Compra','Reciclador','Peso' ]}
                      colsData={[ 'tipo_compra','reciclador','peso' ]} 
                      automatica="true" 
                      formFields={[
                                    {
                                        label : 'Tipo de Compra',
                                        field : 'id_tipo_compra',
                                        type  : 'select',
                                        validation : '',
                                        required : 'true',
                                        dinamic : 'true',
                                        apiField : 'purchase_types',
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
                                                         colsHeaders : [ 'Documento','Nombre' ],
                                                         colsData    : [ 'documento','nombre' ],                                                         
                                                     },
                                        validation : '',
                                        required : 'true'                                        
                                    },
                                    {
                                        label : 'Precio',
                                        field : 'precio',
                                        type  : 'text',
                                        validation : 'entero',
                                        required : 'true'
                                    }, 
                                ]}                     
                      apiField = {'purchases'}
                      mainContainer='Purchases'/>             
        )
    } 
}

export default Purchases