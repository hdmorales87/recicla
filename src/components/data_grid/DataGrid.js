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
import configJson from '../configuration/configuration.json';
import {divMouseOver,divMouseOut} from '../configuration/GlobalFunctions';
import icono_pdf from '../../images/icon_pdf.png?v1.0';
import icono_xls from '../../images/icon_excel.png?v1.0';
import ReactToPdf from 'react-to-pdf';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import DatePicker from 'react-date-picker';
import MaterialIcon from 'material-icons-react';
import alertify from 'alertifyjs';
import '../../css/alertify.css';
import './dataGrid.css'; 

class DataGrid extends Component {
    constructor(props, context) {
        super(props, context);

        let date1 = '';
        let date2 = '';
        if(this.props.filtroFechas === 'true'){
            date1 = new Date();
            date2 = new Date();        

            let day = date1.getDate()
            let month = date1.getMonth() + 1
            let year = date1.getFullYear()

            if(month < 10){
                month = '0'+month;
            }

            if(day < 10){
                day = '0'+day;
            }

            date1 = year+'-'+month+'-01';
            date2 = year+'-'+month+'-'+day;
        }

        this.state = {//las opciones de filtrado
            date1 : date1,
            date2 : date2,
            showRecords  : 15,
            searchWord   : '',
            offsetRecord : 0,
            resultRows   : 0
        }               
    }        
  	handleNewButton(){//Boton nuevo registro
        if(this.props.automatica === 'true'){
            this.props.funcionClick('FormDataGrid',{ idRow:0,mainContainer:this.props.mainContainer,titulo:this.props.titulo,apiField:this.props.apiField,formFields:this.props.formFields});
        } 
        else{            
            this.props.funcionNew(this.props.funcionNewParams);            
        }
    }  
    handleSearchField(event){//Boton de Busqueda        
        let key = event.keyCode;
        if(key === 13){  
            let searchWord = event.target.value;  
            this.setState({ searchWord: searchWord,offsetRecord: 0 }, () => {                        
                this.props.funcionClick(this.props.mainContainer,{ 
                                                                    searchWord: this.state.searchWord, 
                                                                    showRecords: this.state.showRecords, 
                                                                    offsetRecord: this.state.offsetRecord,
                                                                    date1 : this.state.date1, 
                                                                    date2 : this.state.date2, 
                                                                 }); 
            });
        }        
    } 
    handleComboShow(event){//Combo de registros por pagina       
        let showRecords = event.target.value;       
        this.setState({ showRecords: showRecords }, () => {            
            this.props.funcionClick(this.props.mainContainer,{ 
                                                                searchWord: this.state.searchWord, 
                                                                showRecords: this.state.showRecords, 
                                                                offsetRecord: this.state.offsetRecord,
                                                                date1 : this.state.date1, 
                                                                date2 : this.state.date2,
                                                             });
        });      
    }
    handlePrevButton(event){//Retroceder
        let prevOffsetRecord = this.state.offsetRecord;    
        let offsetRecord = prevOffsetRecord-this.state.showRecords;  
        if(offsetRecord < 0){//tope inferior
            offsetRecord = 0;
        }      
        this.setState({ offsetRecord: offsetRecord }, () => {            
            this.props.funcionClick(this.props.mainContainer,{ 
                                                                searchWord: this.state.searchWord, 
                                                                showRecords: this.state.showRecords, 
                                                                offsetRecord: this.state.offsetRecord,
                                                                date1 : this.state.date1, 
                                                                date2 : this.state.date2, 
                                                             });
        });      
    }
    handleNextButton(event){ //Avanzar 
        let prevOffsetRecord = this.state.offsetRecord;  
        let offsetRecord = prevOffsetRecord+this.state.showRecords; 
        if(offsetRecord > this.state.resultRows){//tope superior
            offsetRecord = prevOffsetRecord;
        }    
        this.setState({ offsetRecord: offsetRecord }, () => {            
            this.props.funcionClick(this.props.mainContainer,{ 
                                                                searchWord: this.state.searchWord, 
                                                                showRecords: this.state.showRecords, 
                                                                offsetRecord: this.state.offsetRecord,
                                                                date1 : this.state.date1, 
                                                                date2 : this.state.date2, 
                                                             });
        });      
    } 
    consultaFilas(){//Cuenta Filas         
        consultarFilas(this.props.apiField,this.state.searchWord)
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
    handleDate1(e){        
        this.setState({ date1 : e.target.value },() => {                        
            this.props.funcionClick(this.props.mainContainer,{ 
                                                                  searchWord: this.state.searchWord, 
                                                                  showRecords: this.state.showRecords, 
                                                                  offsetRecord: this.state.offsetRecord,
                                                                  date1 : this.state.date1, 
                                                                  date2 : this.state.date2, 
                                                             }); 
        });

    }
    handleDate2(e){        
        this.setState({ date2 : e.target.value },() => {                        
            this.props.funcionClick(this.props.mainContainer,{ 
                                                                  searchWord: this.state.searchWord, 
                                                                  showRecords: this.state.showRecords, 
                                                                  offsetRecord: this.state.offsetRecord,
                                                                  date1 : this.state.date1, 
                                                                  date2 : this.state.date2, 
                                                             }); 
        });        
    }   
  	render() {
        const divPDF = React.createRef(); 
        //los topes
        var lastRecord = this.state.offsetRecord+this.state.showRecords;
        if(lastRecord > this.state.resultRows){
            lastRecord = this.state.resultRows;
        }
                
        return (//El cuerpo del datagrid
            <div className="container ContenedorDataGrid">
                <div className="content">
                    {
                        this.props.automatica === 'true' ?
                            <div>
                                <div className="table-responsive mt-4">
                                    <div className="titulo">{this.props.titulo}</div>
                                </div>
                                <hr />
                            </div>
                        : ''
                    }
                    <div className="table-responsive mb-3">
                    {
                        this.props.botonNuevo === 'true' ?
                                <Button id="dataGridBtnNew" variant="primary" onClick={this.handleNewButton.bind(this)} style={{backgroundColor:configJson.fondoBotonGrilla}} onMouseOut={divMouseOut.bind(this,'dataGridBtnNew',configJson.fondoBotonGrilla)} onMouseOver={divMouseOver.bind(this,'dataGridBtnNew',configJson.fondoBotonGrilla)}>AGREGAR NUEVO</Button>
                        : '' 
                    }
                    {
                        this.props.botonesExportar === 'true' ?
                            <div style={{textAlign:'right',float:'right'}}>
                                <div style={{textAlign:'right',float:'left'}}>
                                    <img src={ icono_xls } alt="Excel" />
                                    <ReactHTMLTableToExcel
                                                id="test-table-xls-button"
                                                className="download-table-xls-button"
                                                table="table-to-xls"
                                                filename={"informe_"+this.props.titulo}
                                                sheet="tablexls"
                                                buttonText="Generar Excel"/>
                                </div>
                                <div style={{textAlign:'right',float:'left'}}>

                                </div>
                                <div style={{textAlign:'right',float:'left'}}>
                                    <img src={ icono_pdf } alt="PDF" />
                                    <ReactToPdf targetRef={divPDF} filename={"informe_"+this.props.titulo+".pdf"}>
                                        {
                                            ({toPdf}) => (
                                                <button onClick={toPdf} className="save" os="windows">Generar PDF</button>
                                            )
                                        }
                                    </ReactToPdf>
                                </div>
                            </div>                    
                        : ''
                        
                    }
                    </div>
                    <div className="table-responsive mb-3">                        
                        {
                            this.props.automatica === 'true' ?
                                <div>
                                    <div style={{float:'left',width:'100px'}}>Mostrar:</div> 
                                    <div style={{float:'left'}}>
                                        <select style={{border:'1px solid #dee2e6',width:'64px'}} defaultValue="15" onChange={this.handleComboShow.bind(this)}>                               
                                            <option value="15">15</option>
                                            <option value="20">20</option>
                                            <option value="30">30</option>
                                            <option value="50">50</option>
                                            <option value="todos">TODAS</option>
                                        </select>                            
                                    </div>
                                    <div style={{float:'left',width:'70px',paddingLeft:'5px'}}>Entradas</div>
                                </div>
                            : ''
                        }
                        {
                            this.props.filtroFechas === 'true' ?
                                <div style={{float:'left'}}>  
                                    <div style={{float:'left',width:'100px'}}>Fecha Inicio:</div>
                                    <div style={{float:'left'}}>                      
                                        <input style={{border:'1px solid #dee2e6'}} type="date" id="start" name="fechaI" value={this.state.date1} onChange={this.handleDate1.bind(this)}/>
                                    </div>
                                </div>
                            : ''
                        }
                        {
                            this.props.filtroFechas === 'true' ?
                                 <div style={{float:'left'}}>  
                                    <div style={{float:'left',width:'100px'}}>Fecha Final:</div>
                                    <div style={{float:'left'}}>                    
                                        <input style={{border:'1px solid #dee2e6'}} type="date" id="start" name="fechaF" value={this.state.date2} onChange={this.handleDate2.bind(this)}/>
                                    </div>
                                </div>
                            : ''
                        }
                        <div style={{float:'left'}}>
                            <div style={{float:'left',width:'100px'}}>Buscar:</div> 
                            <div style={{float:'left'}}>
                                <input type="text" style={{border:'1px solid #dee2e6',width:'140px'}} onKeyUp={this.handleSearchField.bind(this)}/>
                            </div>
                        </div>
                    </div>                    
                    <div className="table-responsive" style={{height:'calc(100% - 170px)'}}>
                        <DataGridContainer funcionClick={this.props.funcionClick} 
                                           titulo={this.props.titulo}                                            
                                           colsData={this.props.colsData}
                                           apiField={this.props.apiField}
                                           formFields={this.props.formFields}
                                           mainContainer={this.props.mainContainer}
                                           parametro={this.props.parametro}
                                           automatica={this.props.automatica}
                                           funcionEdit = {this.props.funcionEdit}
                                           divPDF = {divPDF}
                                           funcionEditParams = {this.props.funcionEditParams}/>
                    </div> 
                    <div className="table-responsive mb-3">
                        <div style={{float:'left',paddingTop:'8px'}} >
                            <div style={{fontSize:'12px',fontWeight:'bold',float:'left',width:'90px'}}>Mostrando</div> 
                            <div style={{fontSize:'12px',fontWeight:'bold',float:'left',width:'20px'}}>{(this.state.offsetRecord*1)+1}</div> 
                            <div style={{fontSize:'12px',fontWeight:'bold',float:'left',width:'20px',paddingLeft:'5px'}}>a</div> 
                            <div style={{fontSize:'12px',fontWeight:'bold',float:'left',width:'25px',paddingLeft:'5px'}}>{lastRecord*1}</div>
                            <div style={{fontSize:'12px',fontWeight:'bold',float:'left',width:'25px',paddingLeft:'5px'}}>de</div>
                            <div style={{fontSize:'12px',fontWeight:'bold',float:'left',width:'35px',paddingLeft:'5px'}}>{this.state.resultRows}</div>
                        </div>
                        <div style={{float:'right'}} >
                            <div style={{float:'left',cursor:'pointer'}} onClick={this.handlePrevButton.bind(this)}>
                                <MaterialIcon size={24} icon="keyboard_arrow_left" color={configJson.fondoBotonGrilla}/>
                            </div>
                            <div style={{float:'left',width:'20px'}} >
                                &nbsp;
                            </div>
                            <div style={{float:'left',cursor:'pointer'}} onClick={this.handleNextButton.bind(this)}>
                                <MaterialIcon size={24} icon="keyboard_arrow_right" color={configJson.fondoBotonGrilla}/>
                            </div>                            
                        </div>
                    </div>                   
                </div>
            </div>             
        )
    } 
}

export default DataGrid