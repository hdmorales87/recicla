/**
* CLASS DashboardContainer
*
* Contiene el contenedor con los indicadores
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import DashboardOption from './DashboardOption';
import {indicadorCompras,indicadorVentas,indicadorGraficoCompras,indicadorGraficoVentas} from '../api_calls/ApiCalls';
import alertify from 'alertifyjs';
import '../../css/alertify.css';
import './dashboard.css';

class DashboardContainer extends Component {
    constructor(props){
        super(props);  
        this.state={
            indicadorCompras : 0,
            indicadorVentas  : 0,
            graficoCompras : [],
            graficoVentas  : []
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
        indicadorCompras(date1,date2)
        .then(res => {
            var response = res.data; 
            if (response.msg === "error") {
                alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail);
            } else {                           
                this.setState({ indicadorCompras: response[0].total });                
            }
        })
        .catch( err => {            
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidorttt!<br />'+err);
        });

        indicadorVentas(date1,date2)
        .then(res => {
            var response = res.data; 
            if (response.msg === "error") {
                alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail);
            } else {     
                this.setState({ indicadorVentas: response[0].total });                
            }
        })
        .catch( err => {            
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidorxxx!<br />'+err);
        });

        indicadorGraficoCompras(date1,date2)
        .then(res => {
            var response = res.data; 
            if (response.msg === "error") {
                alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail);
            } else {                
                var arrayCompras = [['Producto', 'Total']];                
                for(var i in response){
                    arrayCompras.push([response[i].tipo_producto,response[i].total]);                    
                }                                
                this.setState({ graficoCompras: arrayCompras })
            }
        })
        .catch( err => {            
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidorrrrrr!<br />'+err);
        });

        indicadorGraficoVentas(date1,date2)
        .then(res => {
            var response = res.data; 
            if (response.msg === "error") {
                alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail);
            } else {                
                var arrayVentas = [['Producto', 'Total']];                
                for(var i in response){
                    arrayVentas.push([response[i].tipo_producto,response[i].total]);                    
                }                             
                this.setState({ graficoVentas: arrayVentas })
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
                            valor={this.state.indicadorCompras}
                        />  
                        <DashboardOption                             
                            titulo='Ventas'                             
                            tipo="cifra" 
                            valor={this.state.indicadorVentas}
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
                                                data      :  this.state.graficoCompras,
                                                options    : {
                                                                 title: 'Compras por Producto',
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
                                                data      :  this.state.graficoVentas,
                                                options    : {
                                                                 title: 'Ventas por Producto',
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
