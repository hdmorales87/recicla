/**
* CLASS Desktop
*
* Contiene el escritorio de la aplicacion
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import NameUser from './NameUser';
import OptionMenu from './OptionMenu';
import MaterialIcon from 'material-icons-react';
import Modal from 'react-modal';
import configJson from '../configuration/configuration.json';
import globalState from '../configuration/GlobalState';
import {checkSession,cargarFilas,validaEmpresa} from '../api_calls/ApiCalls';
import loadingImg from '../../images/loading.gif?v1.0';
import Container from './Container';
import alertify from 'alertifyjs';
import '../../css/alertify.css';
import './desktop.css?v1.5'; 

const stylesLoading = {
  content : {
    top         : '50%',
    left        : '50%',
    width       : '202px',
    height      : '202px',
    right       : 'auto',
    bottom      : 'auto',
    marginRight : '-50%',
    padding     : '0px',
    transform   : 'translate(-50%, -50%)',    
  }
};


class Desktop extends Component {
	constructor(props) {//al cargarse trae los datos del usuario 		
      	super(props);          

      	this.state = { 
      		loading: true,
          	redirect: false,	 		                
      	 	componente: "WelcomePage",
      	 	parametro : "",
            checkMenu : false,
            showLoading : false
	    }; 

        var usuario = '';
        var empresa = '';
        if(this.props.location.state !== undefined){
            usuario = this.props.location.state.usuario; 
            empresa = this.props.location.state.empresa;
        }        
          
        checkSession()
        .then(res => {
            var response = res.data; 
            if (response.session === "true") {
                validaEmpresa(empresa)        
                .then(res => {
                    var response1 = res.data;                       
                    if(response1.msg === 'notExist'){//aqui no me dejara continuar si la empresa noe xiste
                        alertify.error('La empresa no existe!');                         
                    }
                    else if(response1.msg === 'error'){//aqui no me dejara continuar si hay un error
                        alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail);
                    }
                    else{
                        globalState.dispatch({
                                type   : "companyData",
                                params : response1
                            });
                        let sqlParams = {
                            sqlCols : [
                                'T1.id',
                                'T1.id_tipo_documento',
                                'DT.nombre AS tipo_documento',
                                'T1.documento',
                                'T1.nombre',
                                'T1.primer_nombre',
                                'T1.segundo_nombre',
                                'T1.primer_apellido',
                                'T1.segundo_apellido',
                                'T1.email',
                                'T1.direccion',
                                'T1.telefono',
                                'T1.id_rol',
                                'RL.nombre AS rol',
                                'T1.imagen_usuario'
                            ],
                            sqlWhere : [ ' AND T1.email = \''+usuario+'\'' ],                            
                            sqlJoin : [
                                'INNER JOIN document_types AS DT ON (DT.id = T1.id_tipo_documento)', 
                                'INNER JOIN roles AS RL ON (RL.id = T1.id_rol)' 
                            ],
                            mode : 'rows'                                                 
                        }
                        cargarFilas('users',usuario,1,0,'','',sqlParams,'rows')
                        .then(res => {
                            var response = res.data; 
                            if (response.msg === "error") {
                                alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail);
                            } 
                            else{                                  
                                this.setState({ loading: false },()=>{
                                    globalState.dispatch({
                                        type   : "userData",
                                        params : response
                                    });                                      
                                    globalState.dispatch({
                                        type   : "nameUser",
                                        params : response[0].primer_nombre.toUpperCase()+' '+response[0].primer_apellido.toUpperCase()
                                    });
                                    globalState.dispatch({
                                        type   : "nameCompany",
                                        params : response1[0].razon_social.toUpperCase()
                                    });
                                    globalState.dispatch({
                                        type   : "imageUser",
                                        params : response[0].imagen_usuario
                                    }); 
                                    globalState.dispatch({
                                        type   : "idRol",
                                        params : response[0].id_rol
                                    });
                                });
                            }
                        })
                        .catch( err => {            
                            alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+err);                            
                        });            
                    }          
                }) 
                .catch( err => {            
                    alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+err);                            
                });             
            } else {
                this.setState({ loading: false, redirect: true });
            }
        })
        .catch(err => {
            console.error(err);
            this.setState({ loading: false, redirect: true });
        });
	    this.actualizarContainer = this.actualizarContainer.bind(this);
	} 
    
	componentDidMount() {//cada que se monte el escritorio debe alistar la ventana del loading      
        //... 
        this.unsubscribe1 = globalState.subscribe( ()=>{ 
            if(globalState.getState().type==="menuNavegacion"){                             
                this.setState({checkMenu  : globalState.getState().menuNavegacion});                               
            }
        });
        this.unsubscribe2 = globalState.subscribe( ()=>{ 
            if(globalState.getState().type==="modalLoading"){
                this.setState({showLoading  : globalState.getState().modalLoading});                                           
            }
        });          
    } 
    componentWillUnmount(){         
        this.unsubscribe1();
        this.unsubscribe2();
    }	

    actualizarContainer(val,param){//carga dinamica del lado derecho	
    	this.setState({ componente: val });
    	this.setState({ parametro : param });		
    }	

    handleButtonMenu(e){//el boton que muestra esconde la barra de navegacion   
        var opcionCheck = true;
        if(this.state.checkMenu === true){
            opcionCheck = false;
        } 
        globalState.dispatch({
                            type   : "menuNavegacion",
                            params : opcionCheck
                        });
    }

    changeNavigationTrigger(e){
        //........
    }

  	render() {
  		const { loading, redirect } = this.state;        
  		if (loading) {
        	return null;
      	}
      	if (redirect) {//sesion inexistente, cargar login
            alert('Su sesion ha finalizado, debe registrarse de nuevo!');
        	return <Redirect to={configJson.mainPath} />;
      	}  			 		
  	  	return (//carga el entorno del escritorio, barra de menu, barra superior y contenedor 	  		  
  	  		<div className="App">
                <input type="checkbox" id="navigationTrigger" className="navigationTrigger" checked={this.state.checkMenu} onChange={this.changeNavigationTrigger.bind(this)} />     
                <label id="labelnavigationTrigger" htmlFor="navigationTrigger" onClick={this.handleButtonMenu.bind(this)}>
                    <MaterialIcon size={24} icon="menu" invert/>                    
                </label>            
	 		          <div id="pestanas" className="menuNavegacion" style={{backgroundColor:configJson.fondoMenu}}>
	 		          	  <div className="LogoCabecera">
	 		          	  	  
	 		          	  </div>
	 		          	  <OptionMenu funcionClick = {this.actualizarContainer} />
	 		          </div>
                <div id="ContenedorDerechoEscritorio" className="ContenedorDerechoEscritorio">
	 		              <div id="cabeceraEscritorio" className="cabeceraEscritorio" style={{backgroundColor:configJson.fondoCabecera}}>
	 		              	  <NameUser className="ContentUser" history={this.props.history}/>  	    		
	 		              </div>
	    		          <div id="contenidopestanas" className="contenidoEscritorio">
	    		 	           <Container componente={this.state.componente} funcionClick = {this.actualizarContainer} parametro={this.state.parametro}/>
	    		          </div>	
                </div>
                <Modal //la ventana del loading
                   isOpen={this.state.showLoading}
                   contentLabel="Minimal Modal Example"
                   style={stylesLoading}
                > 
                    <img src={loadingImg}  alt="Loading"/>
                </Modal>		     
	       </div>   	
		);
  	}
}

export default Desktop