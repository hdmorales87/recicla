/**
* CLASS DocumentTypes
*
* Contiene el contenedor principal de tipos de documento
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import DataGrid from '../data_grid/DataGrid';
import TBar from '../tbar/TBar';

class DocumentTypes extends Component {
    retrocederPanel(){
        this.props.funcionClick('ControlPanel');
    }
  	render() {     
        let sqlParams = { 
                            fieldSearch : [
                                'nombre',                                
                            ],
                            sqlEmpresa : "false",                            
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
                    <DataGrid titulo='Típos de Documento' 
                              funcionClick={this.props.funcionClick} 
                              parametro={this.props.parametro}
                              colsData={[ 
                                            {
                                                type  : 'bd',
                                                label : 'Nombre',
                                                field : 'nombre'
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
                                            }                                    
                                        ]}                     
                              apiField={'document_types'}
                              mainContainer='DocumentTypes'/> 
                </div>
            </div>             
        )
    } 
}

export default DocumentTypes