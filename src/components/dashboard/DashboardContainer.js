/**
* CLASS DashboardContainer
*
* Contiene el contenedor con los indicadores
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import DashboardOption from './DashboardOption';
import {indicadorCompras1,
        indicadorVentas1,
        indicadorGraficoCompras1,
        indicadorGraficoVentas1,
        indicadorCompras2,
        indicadorVentas2,
        indicadorGraficoCompras2,
        indicadorGraficoVentas2} from '../api_calls/ApiCalls';
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
        indicadorCompras1(date1,date2)
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

        indicadorCompras2(date1,date2)
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

        indicadorVentas1(date1,date2)
        .then(res => {
            var response = res.data; 
            if (response.msg === "error") {
                alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail);
            } else {     
                this.setState({ indicadorVentas1: response[0].total });                
            }
        })
        .catch( err => {            
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidorxxx!<br />'+err);
        });

        indicadorVentas2(date1,date2)
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
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidorxxx!<br />'+err);
        });

        indicadorGraficoCompras1(date1,date2)
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

        indicadorGraficoVentas1(date1,date2)
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
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+err);
        });

        indicadorGraficoCompras2(date1,date2)
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

        indicadorGraficoVentas2(date1,date2)
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
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+err);
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
