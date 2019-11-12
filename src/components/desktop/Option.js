/**
* CLASS Option
*
* Contiene el componente opcion de la barra de menu del escritorio
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react';
import {divMouseOver,divMouseOut} from '../configuration/GlobalFunctions';
import configJson from '../configuration/configuration.json';
import globalState from '../configuration/GlobalState';
import alertify from 'alertifyjs';
import '../../css/alertify.css';
import {validarPermiso} from '../api_calls/ApiCalls';
import './desktop.css';

class Option extends Component {
    constructor(props){
        super(props);
        var permiso = this.props.permiso;
        this.state={ enabled : 'false', idRol : 0 };
        //validacion de los permisos
        this.unsubscribe1 = globalState.subscribe( ()=>{             
            if(globalState.getState().type==="idRol"){
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
        });
    }    
    handleContainerChange(){//mostrar/esconder la barra de menu
        this.props.funcionClick(this.props.componente);
        var anchoPantalla = window.innerWidth; 
        if(anchoPantalla < 1115){            
            globalState.dispatch({
                            type   : "menuNavegacion",
                            params : false
                        });
        }     
    }
    componentWillUnmount(){         
        this.unsubscribe1();        
    }
  	render() {        
  	  	return (
            <div>
            {
                this.state.enabled === true ? 
                    <li id={this.props.tab} status="enable">
                       <div id={'div'+this.props.tab} className="divOptionMenu" onClick={this.handleContainerChange.bind(this)} style={{height:'100%'}} onMouseOut={divMouseOut.bind(this,'div'+this.props.tab,configJson.fondoMenu)} onMouseOver={divMouseOver.bind(this,'div'+this.props.tab,configJson.fondoMenu)} >
                          <div className="LiIcon"><MaterialIcon size={50} icon={this.props.icono} invert /></div>
                          <div className="LiTitle">{this.props.titulo}</div>
                          <div className="LiDescrip">{this.props.subtitulo}</div>
                       </div>
                    </li>
                : ''
            }
            </div>
			  );
  	}
}

export default Option