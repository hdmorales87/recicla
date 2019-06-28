import React, { Component } from 'react';
import DataGrid from '../data_grid/DataGrid';
import Button from 'react-bootstrap/Button';

class DocumentTypes extends Component {    
  	handleNewButton(){
        this.props.funcionClick('FormDocumentTypes');
        //console.log(this.props.funcionClick);
    }    
  	render() {
        //if (this.state.empleados.length > 0) {
        return (            
            <DataGrid titulo='Típos de Documento' 
                      funcionClick={this.props.funcionClick} 
                      parametro={this.props.parametro}                      
                      colsHeaders={[ 'Nombre' ]}
                      colsData={[ 'nombre']} 
                      formFields={[
                                    {
                                        label : 'Nombre',
                                        field : 'nombre',
                                        type  : 'text',
                                        validation : 'mayusculas',
                                        required : 'true'
                                    }                                    
                                ]}                     
                      apiUrl='http://localhost:5000/document_types'
                      mainContainer='DocumentTypes'/>              
        )
    } 
}

export default DocumentTypes
