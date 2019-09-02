/**
* CLASS Dashboard
*
* Contiene los indicadores de la dashboard
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import Chart from 'react-google-charts';
/*import configJson from '../configuration/configuration.json';*/
import './dashboard.css';

class DashboardOption extends Component {
  	render() {
        //const path = configJson.apiPath; 
        //console.log(path);       
        return (
			<div id="Indicador">
				{
					this.props.tipo === 'cifra' ?
						<div>
					 		<div className="Cifra">{this.props.valor}</div>
					 		<div className="imagen ok"></div>
					 		<div className="titulo1">{this.props.titulo}</div>
				 		</div>
				 	: 
				 	<div>
				 		<div className="Cifra">{this.props.valor}</div>
				 		<div className="imagen ok"></div>
				 		<Chart
						  	width={'500px'}
						  	height={'300px'}
						  	chartType="PieChart"
						  	loader={<div>Loading Chart</div>}
						  	data={[
						  	  ['Task', 'Hours per Day'],
						  	  ['Work', 11],
						  	  ['Eat', 2],
						  	  ['Commute', 2],
						  	  ['Watch TV', 2],
						  	  ['Sleep', 7],
						  	]}
						  	options={{
						  	  title: 'My Daily Activities',
						  	}}
						  	rootProps={{ 'data-testid': '1' }}
						/>
			 		</div>
				}
				
								
			</div>
		);
    } 
}

export default DashboardOption