/**
* CLASS Dashboard
*
* Contiene el contenedor principal de la dashboard
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import DashboardOption from './DashboardOption';
import './dashboard.css';

class Dashboard extends Component {
    constructor(props){
        super(props);
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
                        valor="300"
                    />  
                    <DashboardOption 
                        tab="dash1" 
                        titulo='Ventas' 
                        icono="shopping_cart" 
                        tipo="cifra" 
                        valor="100"
                    /> 
                    <DashboardOption 
                        tab="dash2" 
                        titulo='Usuarios' 
                        icono="shopping_cart" 
                        tipo="cifra" 
                        valor="200"
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

export default Dashboard
