/**
* CLASS Dashboard
*
* Contiene el contenedor principal de la dashboard
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import DashboardContainer from './DashboardContainer';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            date1 : new Date(),
            date2 : new Date(),
        }
    }
    //manejadores de los datepicker
    changeDate1(val){        
        this.setState({ date1 : val });        
    }
    changeDate2(val){        
        this.setState({ date2 : val });        
    }
  	render() {
        //LOS TIPOS DE GRAFICO SON PieChart y ColumnChart                    
        return ( 
            <div>
                <div id="DashboardFiltros">                    
                    <div id="form_content_field_PanelCampos_Reports_Infotipri_desde" materialdesign="false" className="formContentField" style={{width:'270px', minHeight:'30px', display:'block'}}>
                        <div id="form_label_PanelCampos_Reports_Infotipri_desde" className="formLabelReport" style={{width:'90px', paddingTop: '8px',float:'left'}}>Fecha inicio</div>
                        <div id="form_field_PanelCampos_Reports_Infotipri_desde" className="formDateReport" style={{width:'180px',left:'100px',paddingTop: '3px'}}>                                                    
                            <DatePicker onChange={ this.changeDate1.bind(this) } format={"y-MM-dd"} value={this.state.date1} style={{  }}/>
                         </div>
                    </div>
                    <div data-role="div-empty"></div>
                    <div id="form_content_field_PanelCampos_Reports_Infotipri_hasta" materialdesign="false" className="formContentField" style={{width:'250px',minHeight:'30px', display:'block'}}>
                        <div id="form_label_PanelCampos_Reports_Infotipri_hasta" className="formLabelReport" style={{width:'90px', paddingTop: '8px',float:'left'}}>Fecha fin</div>
                        <div id="form_field_PanelCampos_Reports_Infotipri_hasta" className="formDateReport" style={{width:'auto',left:'100px',paddingTop: '3px'}}>                                                    
                            <DatePicker onChange={ this.changeDate2.bind(this) } format={"y-MM-dd"} value={this.state.date2} style={{  }}/>
                        </div>                          
                    </div>              
                </div>           
                <DashboardContainer date1={this.state.date1} date2={this.state.date2}/>  
            </div>
        );
    } 
}

export default Dashboard
