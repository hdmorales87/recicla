/**
* CLASS ReportContainer
*
* Contiene el contenedor del generador del reporte
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import DataReportContainer from './DataReportContainer';
import MaterialIcon from 'material-icons-react';
import ReactToPdf from 'react-to-pdf';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import DatePicker from 'react-date-picker';
import {cargarDatosReporte} from '../api_calls/ApiCalls';
import alertify from 'alertifyjs';
import '../../css/alertify.css';

import './reports.css';

class ReportContainer extends Component {
	constructor(props, context) { 
     	super(props, context);  
        this.state = {
            date1 : new Date(),
            date2 : new Date(),
            showPDF : false,
            showXLS : false,
            dataRow : ''
        }
	} 
    //manejadores de los datepicker
    changeDate1(val){        
        this.setState({ date1 : val });
    }
    changeDate2(val){        
        this.setState({ date2 : val });        
    }
    generaReport(val){//generador del reporte
        let fecha1 = this.state.date1;
        let fecha2 = this.state.date2;        

        if(fecha1 === null){
            alertify.error("Favor ingrese fecha inicial!");             
            return;
        }
        if(fecha2 === null){            
            alertify.error("Favor ingrese fecha final!");  
            return;
        }
        //formato de la fecha
        fecha1 = new Date(fecha1.getTime() - (fecha1.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];
        fecha2 = new Date(fecha2.getTime() - (fecha2.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];

        //generacion del reporte     
        cargarDatosReporte(this.props.apiUrl,this.props.optionMenu.table,fecha1,fecha2)
        .then(res => {
            var response = res.data; 
            if (response.msg === "error") {
                alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail);
            } else {                
                this.setState({ dataRow: response })
                //permite visualizar los botones de excel y pdf
                this.setState({ showXLS: true })
                this.setState({ showPDF: true })
            }
        })
        .catch( err => {            
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+err);
        });
    }		
  	render() {//cargar los controles dinamicos del generador del reporte
        const divPDF = React.createRef();        
  	  	return ( 
            <div id="BodyReportContainer" style={{height: '100%'}}>
            {                
                this.props.optionMenu.label ? 
                    <div  style={{height: '100%'}}>
                         <div id="tbarReportContainer" className="tbarReportContainer">
                             <div id="PanelScrollY_ReportContainer" style={{width: 'calc(100% + 210px)'}}>
                                 {
                                    this.props.optionMenu.dateFilter === 'true' ?
                                        <div id="panelFieldReport" className="panelFieldReport" style={{width: '250px'}}>
                                            <div id="form_content_field_PanelCampos_Reports_Infotipri_desde" materialdesign="false" className="formContentField" style={{width:'250px', minHeight:'30px', display:'block'}}>
                                                <div id="form_label_PanelCampos_Reports_Infotipri_desde" className="formLabelReport" style={{width:'auto', paddingTop: '8px'}}>Fecha inicio</div>
                                                <div id="form_field_PanelCampos_Reports_Infotipri_desde" className="formDateReport" style={{width:'auto',left:'100px'}}>                                                    
                                                    <DatePicker onChange={ this.changeDate1.bind(this) } format={"y-MM-dd"} value={this.state.date1} style={{ position : 'absolute' }}/>
                                                 </div>
                                            </div>
                                            <div data-role="div-empty"></div>
                                            <div id="form_content_field_PanelCampos_Reports_Infotipri_hasta" materialdesign="false" className="formContentField" style={{width:'250px',minHeight:'30px', display:'block'}}>
                                                <div id="form_label_PanelCampos_Reports_Infotipri_hasta" className="formLabelReport" style={{width:'auto', paddingTop: '8px'}}>Fecha fin</div>
                                                <div id="form_field_PanelCampos_Reports_Infotipri_hasta" className="formDateReport" style={{width:'auto',left:'100px'}}>                                                    
                                                    <DatePicker onChange={ this.changeDate2.bind(this) } format={"y-MM-dd"} value={this.state.date2} style={{ position : 'absolute' }}/>
                                                </div>                          
                                            </div>
                                            <div data-role="div-empty"></div>
                                        </div>
                                    : ''
                                 }                                    
                                 <div id="PanelBotones_Reports_Infotipri" className="PanelBotonesReport">
                                     <div id="win-btn-1" className="reportBtn btnReportContainer" style={{width:'65px',backgroundColor: '#FFF !important'}} data-role="win-btn" data-state="enable"> 
                                         <div style={{textAlign:'center'}}>
                                             <MaterialIcon size={24} icon="flash_on" />
                                         </div>                              
                                         <button className="save" os="windows" onClick={ this.generaReport.bind(this) }>Generar Informe</button>
                                     </div>
                                     <div data-role="div-empty"></div>
                                     {
                                        this.props.optionMenu.btnExcel === 'true' && this.state.showXLS === true ?
                                            <div id="win-btn-2" className="reportBtn btnReportContainer" style={{width:'65px',backgroundColor: '#FFF !important'}} data-role="win-btn" data-state="enable">                                 
                                                <div style={{textAlign:'center'}}>
                                                    <MaterialIcon size={24} icon="library_books" />
                                                </div>
                                                <ReactHTMLTableToExcel
                                                    id="test-table-xls-button"
                                                    className="download-table-xls-button"
                                                    table="table-to-xls"
                                                    filename={"informe_"+this.props.optionMenu.table}
                                                    sheet="tablexls"
                                                    buttonText="Generar Excel"/>                                                
                                            </div>
                                        : ''
                                     }
                                     <div data-role="div-empty"></div>
                                     {
                                        this.props.optionMenu.btnPDF === 'true' && this.state.showPDF === true ?
                                            <div id="win-btn-3" className="reportBtn btnReportContainer" style={{width:'65px',backgroundColor: '#FFF !important'}} data-role="win-btn" data-state="enable">                                 
                                                <div style={{textAlign:'center'}}>
                                                    <MaterialIcon size={24} icon="picture_as_pdf" />
                                                </div>
                                                <ReactToPdf targetRef={divPDF} filename={"informe_"+this.props.optionMenu.table+".pdf"}>
                                                    {
                                                        ({toPdf}) => (
                                                            <button onClick={toPdf} className="save" os="windows">Generar PDF</button>
                                                        )
                                                    }
                                                </ReactToPdf>
                                            </div>
                                        : ''
                                     }
                                     <div data-role="div-empty"></div>
                                 </div>
                             </div>
                         </div>
                         <div id="PanelInforme_Reports_Infotipri" className="PanelReport" style={{height: 'calc(100% - 91px)'}}>
                             <div id="InformeFile_Reports_Infotipri" className="ReportContainer" tamano="letter" orientacion="V" style={{maxWidth: '812px', minWidth: '812px'}}>
                                 <DataReportContainer divPDF = {divPDF} dataRow={this.state.dataRow} colsHeaders = {this.props.optionMenu.colsHeaders} colsData = {this.props.optionMenu.colsData} />
                             </div>
                         </div>
                     </div>
                : ''                                                            
            }
            </div>
        );
  	}
}           

export default ReportContainer