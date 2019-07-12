import React, { Component } from 'react';
import ReportOption from './ReportOption';
import ReportContainer from './ReportContainer';
import './reports.css';

class Reports extends Component {
    constructor(props, context) {
        super(props, context);     
        this.state = { 
            table : 'blank',
            parameter : ""
        }
        this.actualizarReportContainer = this.actualizarReportContainer.bind(this);
    }
  	handleClick(val) {
  	  	alert('hola');
  	}
    actualizarReportContainer(table,param){ 
        console.log(table);
        this.setState({ table: table });
        this.setState({ parameter : param });   
    }
  	render() {
        let apiUrl = 'http://localhost:5000/';
  	  	return ( 
            <div style={{width:'100%'}}>
                <div id="reportTbar" className="reportTbar" data-role="winTbar" os="windows" >
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
                                        },                                        
                                    ]}
                        apiUrl={apiUrl}
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
                                            label : 'Informe de Usuarios',
                                            table : 'usuarios',                                            
                                            dateFilter : 'false',                                                                                      
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
                                        },
                                        {
                                            label : 'Informe de Tipos de Compra',
                                            table : 'purchase_types',                                            
                                            dateFilter : 'false',                                                                                       
                                        },                                                                                
                                    ]}
                    />             
                </div>	
                <div id="reportContainer" className="reportContainer" data-role="winTbar" os="windows" >
                    <ReportContainer table={this.state.table}/>
                </div>
            </div>
  	  	);
  	}
}

export default Reports
