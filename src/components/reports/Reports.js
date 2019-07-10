import React, { Component } from 'react';
import ReportOption from './ReportOption';
import './reports.css';

class Reports extends Component {

  	handleClick(val) {
  	  	alert('hola');
  	}
  	render() {
  	  	return ( 
            <div style={{width:'100%'}}>
                <div id="reportTbar" className="reportTbar" data-role="winTbar" os="windows" >
                    <ReportOption tab="ReportOption0" titulo='Compras' funcionClick={this.props.funcionClick} componente="PurchaseReport" />
                    <ReportOption tab="ReportOption1" titulo='Ventas' funcionClick={this.props.funcionClick} componente="PurchaseReport" />
                    <ReportOption tab="ReportOption2" titulo='Recicladores' funcionClick={this.props.funcionClick} componente="PurchaseReport" /> 
                    <ReportOption tab="ReportOption2" titulo='Clientes' funcionClick={this.props.funcionClick} componente="PurchaseReport" />
                    <ReportOption tab="ReportOption2" titulo='Usuarios' funcionClick={this.props.funcionClick} componente="PurchaseReport" /> 
                    <ReportOption tab="ReportOption2" titulo='Parametrizaciones' funcionClick={this.props.funcionClick} componente="PurchaseReport" />             
                </div>	
                <div id="reportContainer" className="reportContainer" data-role="winTbar" os="windows" >
                </div>
            </div>
  	  	);
  	}
}

export default Reports
