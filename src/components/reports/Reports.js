/**
* CLASS Reports
*
* Contiene el contenedor principal del generador de informes
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import ReportOption from './ReportOption';
import ReportContainer from './ReportContainer';
import configJson from '../configuration/configuration.json';
import './reports.css';

class Reports extends Component {
    constructor(props, context) {
        super(props, context);     
        this.state = { 
            optionMenu : ''            
        }
        this.actualizarReportContainer = this.actualizarReportContainer.bind(this);
    }  	
    actualizarReportContainer(optionMenu){        
        this.setState({ optionMenu: optionMenu });           
    }
  	render() {                
  	  	return ( 
            <div style={{width:'100%',height:'100%'}}>
                <div id="reportTbar" className="reportTbar" data-role="reportTbar" os="windows" style={{backgroundColor : configJson.windowColor}}>
                    <ReportOption 
                        tab="ReportOption0" 
                        title='Compras' 
                        funcionClick = {this.actualizarReportContainer}                         
                        position="0"
                        optionWidth='230px'
                        optionMenu={[
                                        {
                                            label : 'Informe de Compras',
                                            table : 'purchases',  
                                            colsHeaders : ['Fecha Compra','Producto','Reciclador','Peso','Valor Compra'],
                                            colsData : ['fecha_compra','tipo_producto','reciclador','peso','valor_compra'],                                                                                      
                                            dateFilter : 'true', 
                                            btnExcel : 'true',
                                            btnPDF : 'true',
                                            sqlParams : {
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
                                            }
                                        },                                        
                                    ]}                        
                    />
                    <ReportOption 
                        tab="ReportOption1" 
                        title='Ventas' 
                        funcionClick = {this.actualizarReportContainer}                       
                        position="1"
                        optionWidth='230px'
                        optionMenu={[
                                        {
                                            label : 'Informe de Ventas',
                                            table : 'sales',                                            
                                            dateFilter : 'true',
                                            colsHeaders : ['Fecha Venta','Producto','Cliente','Factura','Peso','Valor Venta'],
                                            colsData : ['fecha_venta','tipo_producto','cliente','factura_venta','peso','valor_venta'], 
                                            btnExcel : 'true',
                                            btnPDF : 'true',
                                            sqlParams : {
                                                sqlCols : [
                                                    'T1.id',
                                                    '(T1.peso * PT.precio_venta) AS valor_venta',
                                                    'DATE_FORMAT(T1.fecha_venta,"%Y-%m-%d") AS fecha_venta',
                                                    'PT.id AS id_tipo_producto',
                                                    'PT.nombre AS tipo_producto',
                                                    'R.id AS id_cliente',
                                                    'R.razon_social AS cliente',
                                                    'T1.peso',
                                                    'T1.id_empresa',
                                                    'T1.factura_venta'
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
                                            }                                                                                     
                                        },                                        
                                    ]}                        
                    />          
                </div>	
                <div id="reportContainer" className="reportContainer" data-role="reportTbar" os="windows" >
                    <ReportContainer optionMenu={this.state.optionMenu} />
                </div>
            </div>
  	  	);
  	}
}

export default Reports
