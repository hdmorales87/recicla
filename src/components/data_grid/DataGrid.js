/**
* CLASS DataGrid
*
* Contiene el contenedor principal del data grid
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import DataGridContainer from './DataGridContainer';
import Button from 'react-bootstrap/Button';
import {consultarFilas} from '../api_calls/ApiCalls';
import alertify from 'alertifyjs';
import '../../css/alertify.css';

class DataGrid extends Component {
    constructor(props, context) {
        super(props, context); 
        this.state = {//las opciones de filtrado
            showRecords  : 5,
            searchWord   : '',
            offsetRecord : 0,
            resultRows   : 0
        }
    }    
  	handleNewButton(){//Boton nuevo registro        
        this.props.funcionClick('FormDataGrid',{ idRow:0,mainContainer:this.props.mainContainer,titulo:this.props.titulo,apiUrl:this.props.apiUrl,formFields:this.props.formFields});
    }  
    handleSearchField(event){//Boton de Busqueda        
        let key = event.keyCode;
        if(key === 13){  
            let searchWord = event.target.value;  
            this.setState({ searchWord: searchWord,offsetRecord: 0 }, () => {           
                this.props.funcionClick(this.props.mainContainer,{ searchWord: this.state.searchWord, showRecords: this.state.showRecords, offsetRecord: this.state.offsetRecord }); 
            });
        }        
    } 
    handleComboShow(event){//Combo de registros por pagina       
        let showRecords = event.target.value;       
        this.setState({ showRecords: showRecords }, () => {            
            this.props.funcionClick(this.props.mainContainer,{ searchWord: this.state.searchWord, showRecords: this.state.showRecords, offsetRecord: this.state.offsetRecord});
        });      
    }
    handlePrevButton(event){//Retroceder
        let prevOffsetRecord = this.state.offsetRecord;    
        let offsetRecord = prevOffsetRecord-this.state.showRecords;  
        if(offsetRecord < 0){//tope inferior
            offsetRecord = 0;
        }      
        this.setState({ offsetRecord: offsetRecord }, () => {            
            this.props.funcionClick(this.props.mainContainer,{ searchWord: this.state.searchWord, showRecords: this.state.showRecords, offsetRecord: this.state.offsetRecord });
        });      
    }
    handleNextButton(event){ //Avanzar 
        let prevOffsetRecord = this.state.offsetRecord;  
        let offsetRecord = prevOffsetRecord+this.state.showRecords; 
        if(offsetRecord > this.state.resultRows){//tope superior
            offsetRecord = prevOffsetRecord;
        }    
        this.setState({ offsetRecord: offsetRecord }, () => {            
            this.props.funcionClick(this.props.mainContainer,{ searchWord: this.state.searchWord, showRecords: this.state.showRecords, offsetRecord: this.state.offsetRecord });
        });      
    } 
    consultaFilas(){//Cuenta Filas 
        consultarFilas(this.props.apiUrl,this.state.searchWord)
        .then(res => {
            var response = res.data; 
            if (response.msg === "error") {
                alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail);
            } else {                
                this.setState({ resultRows: response[0].total })
            }
        })
        .catch( err => {            
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+err);
        });
    }
    componentWillMount() {
        this.consultaFilas();        
    }
    componentDidUpdate(prevProps){        
        if (this.props.parametro !== prevProps.parametro) {           
           this.consultaFilas(); 
        }       
    }
  	render() {
        //los topes
        var lastRecord = this.state.offsetRecord+this.state.showRecords;
        if(lastRecord > this.state.resultRows){
            lastRecord = this.state.resultRows;
        }
                
        return (//El cuerpo del datagrid
            <div className="container ContenedorDataGrid">
                <div className="content">
                    <div className="table-responsive mt-4">
                        <div className="titulo">{this.props.titulo}</div>
                    </div>
                    <hr />
                    <div className="table-responsive mb-3">
                        <Button variant="primary" onClick={this.handleNewButton.bind(this)}>AGREGAR NUEVO</Button>
                    </div>
                    <div className="table-responsive mb-3">
                        <div style={{float:'left',width:'70px'}}>Mostrar:</div> 
                        <div style={{float:'left'}}>
                            <select style={{border:'1px solid #dee2e6'}} defaultValue="5" onChange={this.handleComboShow.bind(this)}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="todos">TODAS</option>
                            </select>                            
                        </div>
                        <div style={{float:'left',width:'70px',paddingLeft:'5px'}}>Entradas</div> 
                        <div style={{float:'right'}}>
                            <div style={{float:'left',width:'70px'}}>Buscar:</div> 
                            <div style={{float:'left'}}>
                                <input type="text" style={{border:'1px solid #dee2e6'}} onKeyUp={this.handleSearchField.bind(this)}/>
                            </div>
                        </div>
                    </div>                    
                    <div className="table-responsive" style={{height:'calc(100% - 170px)'}}>
                        <DataGridContainer funcionClick={this.props.funcionClick} 
                                           titulo={this.props.titulo}
                                           colsHeaders={this.props.colsHeaders} 
                                           colsData={this.props.colsData}
                                           apiUrl={this.props.apiUrl}
                                           formFields={this.props.formFields}
                                           mainContainer={this.props.mainContainer}
                                           parametro={this.props.parametro}/>
                    </div> 
                    <div className="table-responsive mb-3">
                        <div style={{float:'left'}} >
                            <div style={{float:'left',width:'90px'}}>Mostrando</div> 
                            <div style={{float:'left',width:'20px'}}>{(this.state.offsetRecord*1)+1}</div> 
                            <div style={{float:'left',width:'20px',paddingLeft:'5px'}}>a</div> 
                            <div style={{float:'left',width:'25px',paddingLeft:'5px'}}>{lastRecord*1}</div>
                            <div style={{float:'left',width:'25px',paddingLeft:'5px'}}>de</div>
                            <div style={{float:'left',width:'35px',paddingLeft:'5px'}}>{this.state.resultRows}</div>
                        </div>
                        <div style={{float:'right'}} >
                            <Button variant="default" onClick={this.handlePrevButton.bind(this)}><span style={{fontSize:'14px'}}>Anterior</span></Button>
                            <Button variant="default" onClick={this.handleNextButton.bind(this)}><span style={{fontSize:'14px'}}>Siguiente</span></Button>
                        </div>
                    </div>                   
                </div>
            </div>             
        )
    } 
}

export default DataGrid