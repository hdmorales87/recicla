/**
* CLASS WindowAccesoEmpresas
*
* Contiene el componente que lista las empresas
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import {listadoPermisos} from '../api_calls/ApiCalls';
import globalState from '../configuration/GlobalState';
import alertify from 'alertifyjs';
//import './windowResetPassword.css';

class WindowAccesoEmpresas extends Component {
    constructor(props) {        
        super(props);   
        this.state = {
            objEmpresasAccesos : ''
        };        
    } 
    componentWillMount(){
        var idRol = this.props.params.idRol;
        listadoPermisos(idRol).then(response => { 
            response = response.data;            
            if(response.msg === 'error'){//aqui no me dejara continuar si la empresa noe xiste
                alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail); 
            }
            else{
                this.setState({objEmpresasAccesos:response},()=>{
                    globalState.dispatch({//cargamos los datos de los permisos
                        type   : "configPermisos",
                        params : {}
                    });
                    response.forEach((objEmpresasAccesos,i) => {//chequear los que tengan el permiso activido en el rol
                        var checked = false;                        
                        if(objEmpresasAccesos.checked > 0){
                            checked = true;
                        }                        
                        this.setState({ [objEmpresasAccesos.id]: checked },()=>{
                            globalState.getState().configPermisos[objEmpresasAccesos.id] = checked;                             
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
                    (this.state.objEmpresasAccesos !== '') ?
                        this.state.objEmpresasAccesos.map((objEmpresasAccesos,i) => {
                            var padding = 5;
                            var fontWeight = 'bold';
                            if(objEmpresasAccesos.nivel > 1){
                                padding = objEmpresasAccesos.nivel*10;
                                fontWeight = 'normal';
                            }                                                         
                            return <div key={i} style={{width:'100%',height:'24px'}}>
                                        <div style={{float:'left'}}>
                                            <input name={objEmpresasAccesos.id} type="checkbox" onChange={this.handleCheckBox.bind(this)} checked={this.state[objEmpresasAccesos.id] || false } />
                                        </div>
                                        <div style={{paddingLeft:padding+'px',float:'left',fontWeight:fontWeight }}>
                                            {objEmpresasAccesos.nombre} 
                                        </div>
                                    </div>
                        })
                    : ''
                }  
                </div>  				
			  );
  	}
}

export default WindowAccesoEmpresas