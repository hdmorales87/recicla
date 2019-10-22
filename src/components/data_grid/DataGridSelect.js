/**
* CLASS Purchases
*
* Contiene el contenedor principal de las compras
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import DataGrid from '../data_grid/DataGrid';

class DataGridSelect extends Component {  
    render() {       
        return (
            <DataGrid titulo='Seleccione...' 
                      funcionClick={this.props.funcionClick}  
                      parametro={this.props.parametro}                     
                      colsHeaders={[ 'Tipo Compra','Reciclador','Peso' ]}
                      colsData={[ 'tipo_compra','reciclador','peso' ]} 
                                          
                      apiField = {'purchases'}
                      mainContainer='DataGridSelect'/>             
        )
    } 
}

export default DataGridSelect