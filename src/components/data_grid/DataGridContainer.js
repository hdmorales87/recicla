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
        let showRecords  = 5;
        let offsetRecord = 0;        
        if(this.props.parametro !== undefined){
            if(this.props.parametro.hasOwnProperty('searchWord')){
                searchWord = this.props.parametro.searchWord; 
                showRecords = this.props.parametro.showRecords;  
                offsetRecord = this.props.parametro.offsetRecord; 
            }        
        }        
        //Ajax a la API que trae los registros
        cargarFilas(this.props.apiField,searchWord,showRecords,offsetRecord)        
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
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>No</th>
                            {
                                this.props.colsHeaders.map((colsHeaders,i) => {
                                    return <th key={ i }>{colsHeaders}</th>
                                })
                            }                          
                            <th style= {{width: '180px'}}>Acciones</th>
                        </tr>
                    </thead>      
                    <DataGridList listado={this.state.content} 
                                  titulo={this.props.titulo}
                                  funcionClick={this.props.funcionClick} 
                                  colsData={this.props.colsData} 
                                  apiField={this.props.apiField}
                                  formFields={this.props.formFields}
                                  mainContainer={this.props.mainContainer}/>                                       
                </Table>
            )
        } else {
            return <div className="titulo">No hay registros...</div>
        }
    } 
}

export default DataGridContainer