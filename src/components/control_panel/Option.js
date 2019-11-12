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
import {validarPermiso} from '../api_calls/ApiCalls';
import alertify from 'alertifyjs';
import '../../css/alertify.css';
import globalState from '../configuration/GlobalState';
import './controlpanel.css';

class Option extends Component {
    constructor(props){
        super(props);
        var permiso = this.props.permiso;
        this.state={ enabled : 'false' };       
        var idRol = globalState.getState().idRol;
        validarPermiso(idRol,permiso).then(res => {
            var response = res.data;
            if(response.msg === 'error'){
                alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail); 
            }
            else {
                this.setState({ enabled : response.msg});
            }
        })
        .catch( err => {            
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+err);                            
        });
    }     
    handleContainerChange(){//Un callback para cargar el datagrid
        this.props.funcionClick(this.props.componente);        
    }
    render() {
        return (
            <div>
            {
                this.state.enabled === true ? 
                    <li id={this.props.tab} onClick={this.handleContainerChange.bind(this)} onMouseOut={divMouseOut.bind(this,this.props.tab,'#FFFFFF')} onMouseOver={divMouseOver.bind(this,this.props.tab,'#c6c6c6')} >
                        <div className="icono"><MaterialIcon size={50} icon={this.props.icono} /></div>
                        <div className="data">{this.props.titulo}</div>
                    </li> 
                : ''
            }
            </div>                  
        );
    }
}

export default Option
