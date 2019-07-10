import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react';
import Dropdown from 'react-bootstrap/Dropdown';
import CustomToggle from './CustomToggleDropdown';
import CustomMenu from './CustomMenuDropdown';
import './reports.css';
//import Container from './Container';

class ReportOption extends Component {
    handleMenuItem(){
        this.props.funcionClick(this.props.componente);
        //console.log(this.props.funcionClick);
    }

  	render() {
  	  	return (
            <Dropdown id={this.props.tab} className="reportBtn" style={{width:'120px',position:'absolute'}}>  
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components"> 
                    <div style={{width:'120px'}} data-role="win-btn" data-state="enable"> 
                        <div style={{width:'100%',textAlign:'center'}}> 
                            <MaterialIcon size={24} icon="poll" invert />  
                        </div>             
                        <button className="save" os="windows">{this.props.titulo}</button>
                    </div>
                </Dropdown.Toggle>
                <Dropdown.Menu  style={{ marginTop: '-50px'}}>
                    <Dropdown.Item eventKey="1">Datos del Usuario</Dropdown.Item>
                    <Dropdown.Item eventKey="1" onClick={this.handleMenuItem.bind(this)}>Cerrar Sesi&oacute;n</Dropdown.Item>           
                </Dropdown.Menu>
            </Dropdown>
  				    				
			  );
  	}
}

export default ReportOption