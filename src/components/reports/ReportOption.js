/**
* CLASS ReportOption
*
* Contiene las opciones del menu de informes
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react';
import Dropdown from 'react-bootstrap/Dropdown';
import {divMouseOver,divMouseOut} from '../configuration/GlobalFunctions';
import configJson from '../configuration/configuration.json';
import CustomToggle from './CustomToggleDropdown';
import './reports.css';

class ReportOption extends Component {
    constructor(props, context) {
        super(props, context); 
        this.handleReportContainerChange = this.handleReportContainerChange.bind(this);         
    }    
    handleReportContainerChange(optionMenu){//CALLBACK PARA ACTUALIZAR EL CONTENEDOR DE REPORTE        
        this.props.funcionClick(optionMenu);        
    }
  	render() { 
        let position = this.props.position*120;        
  	  	return (//contenedor de las opciones del menu de informes
            <Dropdown id={this.props.tab} className="reportBtn" style={{width:'120px',position:'absolute',height:'60px',left:position+'px'}}>  
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components"> 
                    <div id={'div'+this.props.tab} style={{width:'120px'}} data-role="reportOptionButton" data-state="enable" onMouseOut={divMouseOut.bind(this,'div'+this.props.tab,configJson.windowColor)} onMouseOver={divMouseOver.bind(this,'div'+this.props.tab,configJson.windowColor)} > 
                        <div style={{width:'100%',textAlign:'center'}}> 
                            <MaterialIcon size={24} icon="poll" invert />  
                        </div>             
                        <button className="save" os="windows">{this.props.title}</button>
                    </div>
                </Dropdown.Toggle>
                <Dropdown.Menu  style={{ marginTop: '0px',width:this.props.optionWidth}}>
                    {   
                        this.props.optionMenu ? 
                            this.props.optionMenu.map((optionMenu,i) => {
                                return (<Dropdown.Item eventKey="1" key={i} onClick={this.handleReportContainerChange.bind(this,optionMenu)}>
                                    <div id={'divDropdown'+i} style={{height:'25px'}}  onMouseOut={divMouseOut.bind(this,'divDropdown'+i,'#ffffff')} onMouseOver={divMouseOver.bind(this,'divDropdown'+i,'#c6c6c6')}>
                                        <div style={{width:'30px',float:'left'}}>
                                            <MaterialIcon size={24} icon="poll" /> 
                                        </div>
                                        <div style={{color:'#000',height:'25px',float:'left',verticalAlign:'middle',paddingTop:'5px'}}>
                                            {optionMenu.label}
                                        </div>
                                    </div>
                                </Dropdown.Item>)
                            }) 
                        : 'hehehehe'  
                    }                                                                                  
                </Dropdown.Menu>
            </Dropdown>
  				    				
		);
  	}
}

export default ReportOption