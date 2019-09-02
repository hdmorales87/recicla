/**
* CLASS Dashboard
*
* Contiene el contenedor principal de la dashboard
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import configJson from '../configuration/configuration.json';
import DashboardOption from './DashboardOption';
import './dashboard.css';

class Dashboard extends Component {
  	render() {
        const path = configJson.apiPath; 
        console.log(path);       
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
                        valor="200"
                    />                    
                </ul>
            </div>  
        );
    } 
}

export default Dashboard
