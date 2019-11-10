/**
* CLASS DataGridContainer
*
* Contiene el contenedor de la tabla de datos
*
* @author Hector Morales <warrior1987@gmail.com>
*/


import React, { Component } from 'react';
import DataGridList from './DataGridList';
import Table from 'react-bootstrap/Table';
import {cargarFilas} from '../api_calls/ApiCalls';
import alertify from 'alertifyjs';
import '../../css/alertify.css';

class DataGridContainer extends Component {
    constructor(props) {
        let  arrayContent = [];
        super(props);
        this.state = {  
                        content :  arrayContent
                     }
    }
  	handleClick(val) {
  	  	this.setState({ justClicked: val });
  	}
    cargaFilas(){
        let searchWord   = '';
        let showRecords  = 15;
        let offsetRecord = 0; 
        let date1 = this.props.date1;
        let date2 = this.props.date2;
        if(this.props.parametro !== undefined){
            if(this.props.parametro.hasOwnProperty('searchWord')){
                searchWord = this.props.parametro.searchWord; 
                showRecords = this.props.parametro.showRecords;  
                offsetRecord = this.props.parametro.offsetRecord;                  
            }        
        }        
        //Ajax a la API que trae los registros
        cargarFilas(this.props.apiField,searchWord,showRecords,offsetRecord,date1,date2)        
        .then(res => {
            var response = res.data; 
            if (response.msg === "error") {
                alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail);
            } else {
                this.setState({ content: response })
            }
        })
        .catch( err => {            
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+err);
        });
    }
    componentWillMount() {
        this.cargaFilas();        
    }
    componentDidUpdate(prevProps){        
        if (this.props.parametro !== prevProps.parametro) {           
           this.cargaFilas(); 
        }       
    }
  	render() {  
        if (this.state.content.length > 0) {
            return (//carga dinamica de la cabecera y del listado
                <div id="no-more-tables" ref = {this.props.divPDF}>
                    <Table className="tableDataGrid" responsive id="table-to-xls">
                        <thead className="cf">
                            <tr>
                                <th style={{fontSize:'12px'}}>No</th>
                                {
                                    this.props.colsData.map((colsData,i) => {
                                        return <th key={ i } style={{fontSize:'12px'}}>{colsData.label}</th>
                                    })
                                }
                            </tr>
                        </thead>      
                        <DataGridList listado={this.state.content} 
                                      titulo={this.props.titulo}
                                      funcionClick={this.props.funcionClick} 
                                      colsData={this.props.colsData} 
                                      apiField={this.props.apiField}
                                      formFields={this.props.formFields}
                                      mainContainer={this.props.mainContainer}
                                      colsHeaders={this.props.colsHeaders}
                                      automatica={this.props.automatica}
                                      funcionEdit = {this.props.funcionEdit}
                                      funcionEditParams = {this.props.funcionEditParams}/>                                       
                    </Table>
                </div>
            )
        } else {
            return <div className="titulo">No hay registros...</div>
        }
    } 
}

export default DataGridContainer