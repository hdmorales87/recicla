import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react';

import './reports.css';

class ReportContainer extends Component {
	constructor(props, context) { 
     	super(props, context);  
	 } 		
  	render() {
  	  	return (		  
  	  		<div id="BodyReportContainer" style={{height: 'calc(100% - 70px)'}}>
    			<div id="tbarReportContainer" className="tbarReportContainer">
    			    <div id="PanelScrollY_ReportContainer" style={{width: 'calc(100% + 210px)'}}>
    			        <div id="panelFieldReport" className="panelFieldReport" style={{width: '210px'}}>
    			            <div id="form_content_field_PanelCampos_InformesRubik_Infotipri_desde" materialdesign="false" className="formContentField" style={{width:'200px', minHeight:'30px', display:'block'}}>
    			                <div id="form_label_PanelCampos_InformesRubik_Infotipri_desde" className="formLabelReport" style={{width:'auto'}}>Fecha inicio</div>
    			                <div id="form_field_PanelCampos_InformesRubik_Infotipri_desde" className="formFieldReport" style={{width:'auto'}}>
    			                    <input type="text" name="desde" id="form_PanelCampos_InformesRubik_Infotipri_desde" value="2019-06-12" style={{width:'100%'}} data-value="2019-06-12" data-required="true" data-style="none" data-label="Fecha inicio" fieldname="desde" /> 
    			                 </div>
    			            </div>
    			            <div data-role="div-empty"></div>
    			            <div id="form_content_field_PanelCampos_InformesRubik_Infotipri_hasta" materialdesign="false" className="formContentField" style={{width:'200px',minHeight:'30px', display:'block'}}>
    			                <div id="form_label_PanelCampos_InformesRubik_Infotipri_hasta" className="formLabelReport" style={{width:'auto'}}>Fecha fin</div>
    			                <div id="form_field_PanelCampos_InformesRubik_Infotipri_hasta" className="formFieldReport" style={{width:'auto'}}>
    			                    <input type="text" name="hasta" id="form_PanelCampos_InformesRubik_Infotipri_hasta" value="2019-07-12" style={{width:'100%'}} data-value="2019-07-12" data-required="true" data-style="none" data-label="Fecha fin" fieldname="hasta" />
    			                </div>    			            
    			            </div>
    			            <div data-role="div-empty"></div>
    			        </div>
    			        <div id="PanelBotones_InformesRubik_Infotipri" className="PanelBotonesReport">
    			            <div id="win-btn-1" className="reportBtn btnReportContainer" style={{width:'65px',backgroundColor: '#FFF !important'}} data-role="win-btn" data-state="enable"> 
    			            	<div style={{textAlign:'center'}}>
    			            		<MaterialIcon size={24} icon="flash_on" />
			            		</div>    			            	
    			                <button className="save" os="windows">Generar Informe</button>
    			            </div>
    			            <div data-role="div-empty"></div>
    			            <div id="win-btn-2" className="reportBtn btnReportContainer" style={{width:'65px',backgroundColor: '#FFF !important'}} data-role="win-btn" data-state="enable">     			            	
    			            	<div style={{textAlign:'center'}}>
    			            		<MaterialIcon size={24} icon="arrow_downward" />
			            		</div>
    			                <button className="save" os="windows">Generar Excel</button>
    			            </div>
    			            <div data-role="div-empty"></div>
    			            <div id="win-btn-3" className="reportBtn btnReportContainer" style={{width:'65px',backgroundColor: '#FFF !important'}} data-role="win-btn" data-state="enable">     			            	
    			            	<div style={{textAlign:'center'}}>
    			            		<MaterialIcon size={24} icon="picture_as_pdf" />
			            		</div>
    			                <button className="save" os="windows">Generar PDF</button>
    			            </div>
    			            <div data-role="div-empty"></div>
    			        </div>
    			    </div>
    			</div>
    			<div id="PanelInforme_InformesRubik_Infotipri" className="PanelReport" style={{height: 'calc(100% - 91px)'}}>
    			    <div id="InformeFile_InformesRubik_Infotipri" className="ReportContainer" tamano="letter" orientacion="V" style={{maxWidth: '812px', minWidth: '812px'}}></div>
    			</div>
			</div> 	  		    
	    );
  	}
}

export default ReportContainer