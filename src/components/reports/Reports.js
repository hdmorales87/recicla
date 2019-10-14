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
                                            dateFilter : 'true', 
                                            btnExcel : 'true',
                                            btnPDF : 'true'                                                                                      
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
                                            btnExcel : 'true',
                                            btnPDF : 'true'                                                                                     
                                        },                                        
                                    ]}                        
                    />
                    <ReportOption 
                        tab="ReportOption2" 
                        title='Recicladores' 
                        funcionClick = {this.actualizarReportContainer}                         
                        position="2"
                        optionWidth='250px'
                        optionMenu={[
                                        {
                                            label : 'Informe de Recicladores',
                                            table : 'reciclators',                                            
                                            dateFilter : 'false',
                                            btnExcel : 'true',
                                            btnPDF : 'true'                                                                                   
                                        },                                        
                                    ]}                        
                    /> 
                    <ReportOption 
                        tab="ReportOption2" 
                        title='Clientes' 
                        funcionClick = {this.actualizarReportContainer}                      
                        position="3"
                        optionWidth='230px'
                        optionMenu={[
                                        {
                                            label : 'Informe de Clientes',
                                            table : 'customers',                                            
                                            dateFilter : 'false', 
                                            btnExcel : 'true',
                                            btnPDF : 'true'                                                                                    
                                        },                                        
                                    ]}                        
                    />
                    <ReportOption 
                        tab="ReportOption2" 
                        title='Usuarios' 
                        funcionClick = {this.actualizarReportContainer}                        
                        position="4"
                        optionWidth='230px'
                        optionMenu={[
                                        {
                                            label  : 'Informe de Usuarios',
                                            table  : 'users',   
                                            colsHeaders : ['Documento','Nombre','Email','Direccion','Telefono'],
                                            colsData : ['documento','nombre','email','direccion','telefono'],                                          
                                            dateFilter : 'false',
                                            btnExcel : 'true',
                                            btnPDF : 'true'                                                                                      
                                        },                                        
                                    ]}                        
                    /> 
                    <ReportOption 
                        tab="ReportOption2" 
                        title='Parametrizaciones' 
                        funcionClick = {this.actualizarReportContainer}                       
                        position="5"
                        optionWidth='320px'
                        optionMenu={[
                                        {
                                            label : 'Informe de Tipos de Documento',
                                            table : 'document_types',                                            
                                            dateFilter : 'false',
                                            btnExcel : 'false',
                                            btnPDF : 'true'                                                                                     
                                        },
                                        {
                                            label : 'Informe de Tipos de Compra',
                                            table : 'purchase_types',                                            
                                            dateFilter : 'false',   
                                            btnExcel : 'true',
                                            btnPDF : 'false'                                                                                    
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
