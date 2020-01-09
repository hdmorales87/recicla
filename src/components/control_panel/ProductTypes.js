/**
* CLASS PurchaseTypes
*
* Contiene el contenedor principal de los tipos de compra
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import DataGrid from '../data_grid/DataGrid';
import TBar from '../tbar/TBar';

class ProductTypes extends Component {  
    retrocederPanel(){
        this.props.funcionClick('ControlPanel');
    }   	  
  	render() { 
        let sqlParams = { 
                            fieldSearch : [
                                'nombre',                                
                            ],
                            sqlEmpresa : "true",                            
                            filtroFechas : "false",                                                 
                        };                        
        return (//carga el componente que contiene la grilla de datos
            <div>
                <TBar
                    items={[
                              {
                                  type : 'boton',
                                  icon : 'arrow_back',
                                  width : '100px',
                                  height : '60px',
                                  title : 'Atras',
                                  display : true,
                                  function : this.retrocederPanel.bind(this)
                              },
                          ]}
                    length = '1'
                />
                <div style={{top: "60px",position:"relative"}}>   
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
                              sqlParams = { sqlParams }                       
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
                                            },
                                            {
                                                label : '',
                                                field : 'id_empresa',
                                                type  : 'campo_empresa',
                                                validation : '',
                                                required : 'true'                                        
                                            },
                                        ]}                     
                              apiField={'product_types'}
                              mainContainer='ProductTypes'/>  
                </div>
            </div>           
        )
    } 
}

export default ProductTypes