/**
* CLASS Option
*
* Contiene el contenedor de las opciones de panel de control
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react';
import {divMouseOver,divMouseOut} from '../configuration/GlobalFunctions';
import './controlpanel.css';

class Option extends Component {
    handleContainerChange(){//Un callback para cargar el datagrid
        this.props.funcionClick(this.props.componente);        
    }
    render() {
        return (
            <li id={this.props.tab} onClick={this.handleContainerChange.bind(this)} onMouseOut={divMouseOut.bind(this,this.props.tab,'#FFFFFF')} onMouseOver={divMouseOver.bind(this,this.props.tab,'#c6c6c6')} >
                <div className="icono"><MaterialIcon size={50} icon={this.props.icono} /></div>
                <div className="data">{this.props.titulo}</div>
            </li>                   
        );
    }
}

export default Option
