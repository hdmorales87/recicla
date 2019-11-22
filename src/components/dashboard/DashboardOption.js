/**
* CLASS DashboardOption
*
* Contiene el contenedor de cada uno de los indicadores
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import Chart from 'react-google-charts';
import './dashboard.css';

class DashboardOption extends Component {	
  	render() {  		     
        return (
			<div id="Indicador">
				{
					this.props.tipo === 'cifra' ?
						<div>
					 		<div className="Cifra">{this.props.valor}</div>					 		
					 		<div className="titulo1">{this.props.titulo}</div>
				 		</div>
				 	: 
				 	<div>
				 		<div className="Cifra">{this.props.valor}</div>				 		
				 		<Chart
						  	width={this.props.chartProps[0].width}
						  	height={this.props.chartProps[0].height}
						  	chartType={this.props.chartProps[0].chartType}
						  	loader={this.props.chartProps[0].loader}
						  	data={this.props.chartProps[0].data}
						  	options={this.props.chartProps[0].options}
						  	rootProps={this.props.chartProps[0].rootProps}
						/>
			 		</div>
				}
				
								
			</div>
		);
    } 
}

export default DashboardOption