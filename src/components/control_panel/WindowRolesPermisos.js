/**
* CLASS WindowRolesPermisos
*
* Contiene el componente que lista los permisos del rol
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import {modalLoadingRstPwd} from '../configuration/GlobalFunctions';
import {listadoPermisos} from '../api_calls/ApiCalls';
import globalState from '../configuration/GlobalState';
import alertify from 'alertifyjs';
//import './windowResetPassword.css';

class WindowRolesPermisos extends Component {
    constructor(props) {        
        super(props);   
        this.state = {
            objPermisos : ''
        };        
    } 
    componentWillMount(){
        listadoPermisos().then(response => { 
            response = response.data;            
            if(response.msg === 'error'){//aqui no me dejara continuar si la empresa noe xiste
                alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail); 
            }
            else{
                this.setState({objPermisos:response},()=>{
                    globalState.dispatch({//cargamos lo datos del formulario y los dejamos disponibles en toda la sesion
                        type   : "configPermisos",
                        params : {}
                    });
                    response.map((objPermisos,i) => {                        
                        this.setState({ [objPermisos.id]: false },()=>{
                            globalState.getState().configPermisos[objPermisos.id] = false;  
                        });  
                    });
                });
            }
        })
        .catch(function (error) {
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+error);
        });
    } 
    handleCheckBox(e){//control del check de los checkbox
        var checkBox = e.target.name;
        var checked  = e.target.checked;        
        this.setState({ [checkBox]: checked },()=>{
            globalState.getState().configPermisos[checkBox] = checked;  
        });          
    }    
  	render() {             
  	  	return (
                <div id="contenedorPermisos" style={{paddingLeft: '7px',paddingTop: '7px',paddingBottom: '5px',height:'calc(100% - 92px)',overflowY : 'auto' }}>   
                {
                    (this.state.objPermisos !== '') ?
                        this.state.objPermisos.map((objPermisos,i) => {
                            var padding = 5;
                            var fontWeight = 'bold';
                            if(objPermisos.nivel > 1){
                                padding = objPermisos.nivel*10;
                                fontWeight = 'normal';
                            }                                                         
                            return <div key={i} style={{width:'100%',height:'24px'}}>
                                        <div style={{float:'left'}}>
                                            <input name={objPermisos.id} type="checkbox" onChange={this.handleCheckBox.bind(this)} checked={this.state[objPermisos.id] || false } />
                                        </div>
                                        <div style={{paddingLeft:padding+'px',float:'left',fontWeight:fontWeight }}>
                                            {objPermisos.nombre} 
                                        </div>
                                    </div>
                        })
                    : ''
                }  
                </div>  				
			  );
  	}
}

export default WindowRolesPermisos