import React, { Component } from 'react';
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
        	<Table striped bordered hover>
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
            : ''              
        );
    }
}

export default DataReportContainer