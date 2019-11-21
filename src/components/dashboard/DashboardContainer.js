/**
* CLASS DashboardContainer
*
* Contiene el contenedor con los indicadores
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import DashboardOption from './DashboardOption';
import {indicadorCompras,indicadorVentas} from '../api_calls/ApiCalls';
import alertify from 'alertifyjs';
import '../../css/alertify.css';
import './dashboard.css';

class DashboardContainer extends Component {
    constructor(props){
        super(props);  
        this.state={
            indicadorCompras : 0,
            indicadorVentas  : 0
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
                this.setState({ indicadorCompras: response[0].total })
            }
        })
        .catch( err => {            
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+err);
        });

        indicadorVentas(date1,date2)
        .then(res => {
            var response = res.data; 
            if (response.msg === "error") {
                alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail);
            } else {                
                this.setState({ indicadorVentas: response[0].total })
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
                            tab="dash0" 
                            titulo='Compras' 
                            icono="shopping_cart" 
                            tipo="cifra" 
                            valor={this.state.indicadorCompras}
                        />  
                        <DashboardOption 
                            tab="dash1" 
                            titulo='Ventas' 
                            icono="shopping_cart" 
                            tipo="cifra" 
                            valor={this.state.indicadorVentas}
                        />                         
                        <DashboardOption 
                            tab="dash2" 
                            titulo='Solicitudes' 
                            icono="shopping_cart" 
                            tipo="grafico"                                                 
                            chartProps= {[
                                            {
                                                chartType : "PieChart",
                                                width     : '500px',
                                                height    : '300px',
                                                loader    : 'Cargando...',
                                                data      :  [
                                                                 ['Task', 'Hours per Day'],
                                                                 ['Work', 11],
                                                                 ['Eat', 2],
                                                                 ['Commute', 2],
                                                                 ['Watch TV', 2],
                                                                 ['Sleep', 7],
                                                             ],
                                                options    : {
                                                                 title: 'My Daily Activities',
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
