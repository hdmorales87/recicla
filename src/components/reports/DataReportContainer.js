/**
* CLASS DataReportContainer
*
* Contiene la tabla que arroja la informacion recibida de la API para generar el informe
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import './reports.css';

class DataReportContainer extends Component {	   
    render() {     	
    	//generador de la tabla con el reporte
    	var dataRow = this.props.dataRow;    	
        return (        	
        	dataRow !== '' ?
        	<div ref = {this.props.divPDF}>    			
        		<Table striped bordered hover id="table-to-xls">
            	        <thead>
            	            <tr>
            	                <th>No</th>
            	                {
            	                    this.props.colsHeaders.map((colsHeaders,i) => {
            	                        return <th key={ i }>{colsHeaders}</th>
            	                    })
            	                } 
            	            </tr>
            	        </thead>
            	        <tbody>
            	        {
            	        	dataRow.map((dataRow,i) => {
            	        		return <tr key={ i }>      
            							    <td>{i+1}</td> 
		    	        				    {
		    	            				    this.props.colsData.map((colsData,i) => {
		    	            				        return <td key={ i }>{dataRow[colsData]}</td>
		    	            				    })
		    	            				}    
            							</tr>
            	        	})                    	
            	        }            			
            			</tbody>  
            	</Table>             	
        	</div>
            : ''              
        );
    }
}

export default DataReportContainer