import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react';
import DatePicker from 'react-date-picker';
import alertify from 'alertifyjs';
import '../../css/alertify.css';

import './reports.css';

class ReportContainer extends Component {
	constructor(props, context) { 
     	super(props, context);  

        this.state = {
            date1: new Date(),
            date2: new Date(),
        }
	} 
    //manejadores de los datepicker
    changeDate1(val){        
        this.setState({ date1 : val });
    }
    changeDate2(val){        
        this.setState({ date2 : val });        
    }
    generaReport(val){
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

        fecha1 = new Date(fecha1.getTime() - (fecha1.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];
        fecha2 = new Date(fecha2.getTime() - (fecha2.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];

        //generacion del reporte

        console.log(fecha1+'-->'+fecha2);

    }		
  	render() {
        //console.log(this.props.optionMenu);
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
                                        this.props.optionMenu.btnExcel === 'true' ?
                                            <div id="win-btn-2" className="reportBtn btnReportContainer" style={{width:'65px',backgroundColor: '#FFF !important'}} data-role="win-btn" data-state="enable">                                 
                                                <div style={{textAlign:'center'}}>
                                                    <MaterialIcon size={24} icon="arrow_downward" />
                                                </div>
                                                <button className="save" os="windows">Generar Excel</button>
                                            </div>
                                        : ''
                                     }
                                     <div data-role="div-empty"></div>
                                     {
                                        this.props.optionMenu.btnPDF === 'true' ?
                                            <div id="win-btn-3" className="reportBtn btnReportContainer" style={{width:'65px',backgroundColor: '#FFF !important'}} data-role="win-btn" data-state="enable">                                 
                                                <div style={{textAlign:'center'}}>
                                                    <MaterialIcon size={24} icon="picture_as_pdf" />
                                                </div>
                                                <button className="save" os="windows">Generar PDF</button>
                                            </div>
                                        : ''
                                     }
                                     <div data-role="div-empty"></div>
                                 </div>
                             </div>
                         </div>
                         <div id="PanelInforme_Reports_Infotipri" className="PanelReport" style={{height: 'calc(100% - 91px)'}}>
                             <div id="InformeFile_Reports_Infotipri" className="ReportContainer" tamano="letter" orientacion="V" style={{maxWidth: '812px', minWidth: '812px'}}></div>
                         </div>
                     </div>
                : ''
                                                            
            }
            </div>
        );
  	}
}

export default ReportContainer