/**
* CLASS DashboardContainer
*
* Contiene el contenedor con los indicadores
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import DashboardOption from './DashboardOption';
import {cargarFilas} from '../api_calls/ApiCalls';
import alertify from 'alertifyjs';
import '../../css/alertify.css';
import './dashboard.css';

class DashboardContainer extends Component {
    constructor(props){
        super(props);  
        this.state={
            indicadorCompras1 : 0,
            indicadorVentas1  : 0,
            indicadorCompras2 : 0,
            indicadorVentas2  : 0,
            graficoCompras1 : [],
            graficoVentas1  : [],
            graficoCompras2 : [],
            graficoVentas2  : []
        };
        this.cargarIndicadores(this.props.date1,this.props.date2);    
    }
    componentDidUpdate(prevProps){   
        if (this.props !== prevProps) {           
           this.cargarIndicadores(this.props.date1,this.props.date2); 
        }
    }
    cargarIndicadores(date1,date2){  //cargar los indicadores
        //formato de la fecha
        date1 = new Date(date1.getTime() - (date1.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];
        date2 = new Date(date2.getTime() - (date2.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];
        //cargar los indicadores
        //indicador 1 de compras   
        let sqlParams = {
                            sqlCols : [
                                'COUNT(id) AS total'
                            ],
                            sqlWhere : [ ' AND activo = 1' ],    
                            sqlEmpresa : "true",
                            fieldFechas : "T1.fecha_compra"                        
                                                                                                         
                        }
        cargarFilas('purchases','',1,0,date1,date2,sqlParams,'rows')
        .then(res => {
            var response = res.data; 
            if (response.msg === "error") {
                alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail);
            } else {                           
                this.setState({ indicadorCompras1: response[0].total });                
            }
        })
        .catch( err => {            
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidorttt!<br />'+err);
        });
        //indicador 2 de compras 
        sqlParams = {
                        sqlCols : [
                            'SUM(T1.peso * PT.precio_compra) AS total',                                
                        ],
                        sqlJoin : [
                            'INNER JOIN product_types AS PT ON (PT.id = T1.id_tipo_producto)',                                 
                        ],
                        sqlWhere : [ ' AND T1.activo = 1' ],    
                        sqlEmpresa : "true",
                        fieldFechas : "T1.fecha_compra"                        
                                                                                                     
                    }
        cargarFilas('purchases','',1,0,date1,date2,sqlParams,'rows')
        .then(res => {
            var response = res.data; 
            if (response.msg === "error") {
                alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail);
            } else {    
                if(response[0].total !== null){
                    this.setState({ indicadorCompras2: response[0].total });
                }              
            }
        })
        .catch( err => {            
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidorttt!<br />'+err);
        }); 
        //indicador 1 de ventas       
        sqlParams = {
                            sqlCols : [
                                'COUNT(id) AS total'
                            ],
                            sqlWhere : [ ' AND activo = 1' ],    
                            sqlEmpresa : "true",
                            fieldFechas : "T1.fecha_venta"                        
                                                                                                         
                        }
        cargarFilas('sales','',1,0,date1,date2,sqlParams,'rows')
        .then(res => {
            var response = res.data; 
            if (response.msg === "error") {
                alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail);
            } else {                           
                this.setState({ indicadorVentas1: response[0].total });                 
            }
        })
        .catch( err => {            
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidorttt!<br />'+err);
        }); 
        //indicador 2 de ventas 
        sqlParams = {
                        sqlCols : [
                            'SUM(T1.peso * PT.precio_venta) AS total',                                
                        ],
                        sqlJoin : [
                            'INNER JOIN product_types AS PT ON (PT.id = T1.id_tipo_producto)',                                 
                        ],
                        sqlWhere : [ ' AND T1.activo = 1' ],    
                        sqlEmpresa : "true",
                        fieldFechas : "T1.fecha_venta"                        
                                                                                                     
                    }
        cargarFilas('sales','',1,0,date1,date2,sqlParams,'rows')
        .then(res => {
            var response = res.data; 
            if (response.msg === "error") {
                alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail);
            } else {    
                if(response[0].total !== null){
                    this.setState({ indicadorVentas2: response[0].total });
                }              
            }
        })
        .catch( err => {            
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidorttt!<br />'+err);
        });      
        //indicador grafico de compras 1
        sqlParams = {
                        sqlCols : [
                            'COUNT(T1.id) AS total',
                            'PT.nombre AS tipo_producto',                                
                        ],
                        sqlJoin : [
                            'INNER JOIN product_types AS PT ON (PT.id = T1.id_tipo_producto)',                                 
                        ],
                        sqlWhere : [ ' AND T1.activo = 1' ],    
                        sqlEmpresa : "true",
                        fieldFechas : "T1.fecha_compra",
                        sqlGroupBy : "T1.id_tipo_producto"                                            
                    }
        cargarFilas('purchases','',20,0,date1,date2,sqlParams,'rows')
        .then(res => {
            var response = res.data; 
            if (response.msg === "error") {
                alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail);
            } else {                
                var arrayCompras = [['Producto', 'Total']];                
                for(var i in response){
                    arrayCompras.push([response[i].tipo_producto,response[i].total]);                    
                }                                
                this.setState({ graficoCompras1: arrayCompras })
            }
        })
        .catch( err => {            
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidorrrrrr!<br />'+err);
        });
        //indicador grafico de ventas 1
        sqlParams = {
                        sqlCols : [
                            'COUNT(T1.id) AS total',
                            'PT.nombre AS tipo_producto',                                
                        ],
                        sqlJoin : [
                            'INNER JOIN product_types AS PT ON (PT.id = T1.id_tipo_producto)',                                 
                        ],
                        sqlWhere : [ ' AND T1.activo = 1' ],    
                        sqlEmpresa : "true",
                        fieldFechas : "T1.fecha_venta",
                        sqlGroupBy : "T1.id_tipo_producto"                                            
                    }
        cargarFilas('sales','',20,0,date1,date2,sqlParams,'rows')
        .then(res => {
            var response = res.data; 
            if (response.msg === "error") {
                alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail);
            } else {                
                var arrayVentas = [['Producto', 'Total']];                
                for(var i in response){
                    arrayVentas.push([response[i].tipo_producto,response[i].total]);                    
                }                                
                this.setState({ graficoVentas1: arrayVentas })
            }
        })
        .catch( err => {            
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidorrrrrr!<br />'+err);
        });
        //indicador grafico de compras 2
        sqlParams = {
                        sqlCols : [
                            'SUM(T1.peso * PT.precio_compra) AS total',
                            'PT.nombre AS tipo_producto',                                
                        ],
                        sqlJoin : [
                            'INNER JOIN product_types AS PT ON (PT.id = T1.id_tipo_producto)',                                 
                        ],
                        sqlWhere : [ ' AND T1.activo = 1' ],    
                        sqlEmpresa : "true",
                        fieldFechas : "T1.fecha_compra",
                        sqlGroupBy : "T1.id_tipo_producto"                                            
                    }
        cargarFilas('purchases','',20,0,date1,date2,sqlParams,'rows')
        .then(res => {
            var response = res.data; 
            if (response.msg === "error") {
                alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail);
            } else {                
                var arrayCompras = [['Producto', 'Total']];                
                for(var i in response){
                    arrayCompras.push([response[i].tipo_producto,response[i].total]);                    
                }                                
                this.setState({ graficoCompras2: arrayCompras })
            }
        })
        .catch( err => {            
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidorrrrrr!<br />'+err);
        });      
        //indicador grafico de ventas 2
        sqlParams = {
                        sqlCols : [
                            'SUM(T1.peso * PT.precio_venta) AS total',
                            'PT.nombre AS tipo_producto',                                
                        ],
                        sqlJoin : [
                            'INNER JOIN product_types AS PT ON (PT.id = T1.id_tipo_producto)',                                 
                        ],
                        sqlWhere : [ ' AND T1.activo = 1' ],    
                        sqlEmpresa : "true",
                        fieldFechas : "T1.fecha_venta",
                        sqlGroupBy : "T1.id_tipo_producto"                                            
                    }
        cargarFilas('sales','',20,0,date1,date2,sqlParams,'rows')
        .then(res => {
            var response = res.data; 
            if (response.msg === "error") {
                alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail);
            } else {                
                var arrayVentas = [['Producto', 'Total']];                
                for(var i in response){
                    arrayVentas.push([response[i].tipo_producto,response[i].total]);                    
                }                                
                this.setState({ graficoVentas2: arrayVentas })
            }
        })
        .catch( err => {            
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidorrrrrr!<br />'+err);
        }); 
    }
  	render() {
        //LOS TIPOS DE GRAFICO SON PieChart y ColumnChart                    
        return ( 
            <div id="DashboardContenedor">
                    <ul>
                        <DashboardOption                              
                            titulo='Compras'                            
                            tipo="cifra" 
                            valor={this.state.indicadorCompras1}
                        /> 
                        <DashboardOption                              
                            titulo='Comprado'                            
                            tipo="cifra" 
                            valor={'$'+this.state.indicadorCompras2}
                        />   
                        <DashboardOption                             
                            titulo='Ventas'                             
                            tipo="cifra" 
                            valor={this.state.indicadorVentas1}
                        />
                        <DashboardOption                             
                            titulo='Vendido'                             
                            tipo="cifra" 
                            valor={'$'+this.state.indicadorVentas2}
                        />                           
                        <DashboardOption                             
                            titulo='Compras'                            
                            tipo="grafico"                                                 
                            chartProps= {[
                                            {
                                                chartType : "PieChart",
                                                width     : '320px',
                                                height    : '200px',
                                                loader    : 'Cargando...',
                                                data      :  this.state.graficoCompras1,
                                                options    : {
                                                                 title: 'Compras por Producto(Cant)',
                                                                 chartArea: {
                                                                    left: -10,
                                                                    top: 30,
                                                                    width: "100%",
                                                                    height: "60%"
                                                                 },
                                                                 legend: {
                                                                    position: "left",
                                                                    alignment: "start",
                                                                    width: "500px",
                                                                    textStyle: {
                                                                      color: "000000",
                                                                      fontSize: 12
                                                                    }
                                                                  },
                                                             },
                                                rootProps  : { 
                                                                 'data-testid': '1' 
                                                             }
                                            }    
                                         ]}  
                        />
                         <DashboardOption                             
                            titulo='Compras'                            
                            tipo="grafico"                                                 
                            chartProps= {[
                                            {
                                                chartType : "PieChart",
                                                width     : '320px',
                                                height    : '200px',
                                                loader    : 'Cargando...',
                                                data      :  this.state.graficoCompras2,
                                                options    : {
                                                                 title: 'Compras por Producto($)',
                                                                 chartArea: {
                                                                    left: -10,
                                                                    top: 30,
                                                                    width: "100%",
                                                                    height: "60%"
                                                                 },
                                                                 legend: {
                                                                    position: "left",
                                                                    alignment: "start",
                                                                    width: "500px",
                                                                    textStyle: {
                                                                      color: "000000",
                                                                      fontSize: 12
                                                                    }
                                                                  },
                                                             },
                                                rootProps  : { 
                                                                 'data-testid': '1' 
                                                             }
                                            }    
                                         ]}  
                        />
                        <DashboardOption                            
                            titulo='Ventas'                              
                            tipo="grafico"                                                 
                            chartProps= {[
                                            {
                                                chartType : "PieChart",
                                                width     : '320px',
                                                height    : '200px',
                                                loader    : 'Cargando...',
                                                data      :  this.state.graficoVentas1,
                                                options    : {
                                                                 title: 'Ventas por Producto(Cant)',
                                                                 chartArea: {
                                                                    left: -10,
                                                                    top: 30,
                                                                    width: "100%",
                                                                    height: "60%"
                                                                 },
                                                                 legend: {
                                                                    position: "left",
                                                                    alignment: "start",
                                                                    width: "500px",
                                                                    textStyle: {
                                                                      color: "000000",
                                                                      fontSize: 12
                                                                    }
                                                                  },
                                                             },
                                                rootProps  : { 
                                                                 'data-testid': '1' 
                                                             }
                                            }    
                                         ]}  
                        />   
                        <DashboardOption                            
                            titulo='Ventas'                              
                            tipo="grafico"                                                 
                            chartProps= {[
                                            {
                                                chartType : "PieChart",
                                                width     : '320px',
                                                height    : '200px',
                                                loader    : 'Cargando...',
                                                data      :  this.state.graficoVentas2,
                                                options    : {
                                                                 title: 'Ventas por Producto($)',
                                                                 chartArea: {
                                                                    left: -10,
                                                                    top: 30,
                                                                    width: "100%",
                                                                    height: "60%"
                                                                 },
                                                                 legend: {
                                                                    position: "left",
                                                                    alignment: "start",
                                                                    width: "500px",
                                                                    textStyle: {
                                                                      color: "000000",
                                                                      fontSize: 12
                                                                    }
                                                                  },
                                                             },
                                                rootProps  : { 
                                                                 'data-testid': '1' 
                                                             }
                                            }    
                                         ]}  
                        />                    
                    </ul>
                </div>
        );
    } 
}

export default DashboardContainer
