import React, { Component } from 'react';
import ReactToPdf from 'react-to-pdf';
import Table from 'react-bootstrap/Table';
import './reports.css';

class DataReportContainer extends Component {
	constructor(props, context) { 
     	super(props, context);         
	}     
    render() {     	
    	//generador del reporte
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
            							    <td>{dataRow.id}</td> 
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