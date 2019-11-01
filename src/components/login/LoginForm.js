/**
* CLASS LoginForm
*
* Contiene el formulario del login de la aplicacion
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import './login.css';
import empresa_login from './../../images/empresa_login.png?v1.0';
import usuario_login from './../../images/usuario_login.png?v1.0';
import password_login from './../../images/password_login.png?v1.0';
import globalState from '../configuration/GlobalState';
import loadingImg from '../../images/loading.gif?v1.0';
import Modal from 'react-modal';
import Window from '../window/Window';
import {login,validaEmpresa} from '../api_calls/ApiCalls';
import alertify from 'alertifyjs';
import '../../css/alertify.css';

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

class LoginForm extends Component {    
    constructor(props) {
        super(props);
        this.inputEmpresa = React.createRef();
        //traer los datos de inicio si ya estan en localstorage 
        let empresa = '';
        if(localStorage.empresa > 0){
            empresa = localStorage.empresa;
        }           
        let id_empresa = '';
        if(localStorage.id_empresa > 0){
            id_empresa = localStorage.id_empresa;
        } 
        let username = '';
        if(localStorage.username !== ''){
            username = localStorage.username;
        } 
        this.state = {
            empresa: empresa,
            id_empresa: id_empresa,
            username: username,
            password: '',
            showLoading : false,
            unmount : false,
        };  
        this.handleLogin = this.handleLogin.bind(this);
    }
    componentDidMount() {//cada que se monte el escritorio debe alistar la ventana del loading      
        //... 
        globalState.subscribe( ()=>{ 
            if(globalState.getState().type==="modalLoading1"){ 
                this.setState({showLoading  : globalState.getState().modalLoading1});                                           
            }
        });          
    }    
    handleLogin(val) {   
        
        //validacion de datos       
        if(this.state.empresa === undefined || this.state.empresa === ''){
            alertify.error('Digite la empresa!'); 
            return;
        }
        else if(this.state.username === undefined || this.state.username === ''){
            alertify.error('Digite el nombre de usuario!'); 
            return;
        }   
        else if(this.state.password === undefined || this.state.password === ''){
            alertify.error('Digite el password!'); 
            return;
        }         
        //consulta si el usuario existe con los datos ingresados
        login(this.state.id_empresa,this.state.username,this.state.password)        
        .then(res => {
            var response = res.data; 
                      
            if(response.msg === 'notExist'){
                alertify.error('Datos de ingreso incorrectos!');                 
            }
            else if(response.msg === 'error'){
                alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail);
            }
            else{                
                //almacenar en localstorage los datos del login
                localStorage.id_empresa = this.state.id_empresa;
                localStorage.empresa    = this.state.empresa;
                localStorage.username   = this.state.username;
                this.props.history.push({pathname: '/recicla/desktop', state : { usuario : this.state.username,empresa : this.state.empresa }}); 
            }          
        }) 
        .catch( err => {            
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+err);            
        })
    }
    validacionEmpresa(val) {        
        //consulta si la empresa existe        
        validaEmpresa(this.state.empresa)        
        .then(res => {
            var response = res.data;                       
            if(response.msg === 'notExist'){//aqui no me dejara continuar si la empresa noe xiste
                alertify.error('La empresa no existe!'); 
                this.inputEmpresa.current.focus();
            }
            else if(response.msg === 'error'){//aqui no me dejara continuar si hay un error
                alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail);
                this.inputEmpresa.current.focus();
            }
            else{
                this.setState({id_empresa: response[0].id}); //CARGAR EL ID EMPRESA                
                alertify.success(response[0].razon_social);                
            }          
        }) 
        .catch( err => {            
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+err);
            this.inputEmpresa.current.focus();
        })
    }//actualizacion de los datos del formulario
    handleNitChange(e) { 
        this.setState({empresa: e.target.value}); 
    }
    handleUserChange(e) { 
        this.setState({username: e.target.value}); 
    }
    handlePasswordChange(e) { 
        this.setState({password: e.target.value}); 
    } 
    handleOlvidoClave(e) {
        globalState.dispatch({
                type   : "windowResetPassword1",
                params : {
                              visible : true,
                              params  : {
                                            email : '',
                                            idWin : "windowResetPassword1"//identificador de la ventana
                                        }
                         }
            }); 
    }
    render() {
        return (//carga del formulario
            <form className="DivLogin">
                <div className="ContentField">
                    <div className="FieldImage">
                        <img alt="Empresa" src={ empresa_login } />
                    </div>
                    <div className="FieldDiv">
                        <input type="text" value={this.state.empresa} className="inputLogin mytext" name="empresa" id="empresa" placeholder="NIT Empresa" required onBlur={this.validacionEmpresa.bind(this)} onChange={this.handleNitChange.bind(this)}  ref={this.inputEmpresa}/>
                    </div>
                </div>
                <div className="ContentField">
                    <div className="FieldImage">
                        <img alt="Usuario" src={ usuario_login } />
                    </div>
                    <div className="FieldDiv">
                        <input type="text" value={this.state.username} className="inputLogin mytext" name="usuario" id="usuario" placeholder="Usuario" required onChange={this.handleUserChange.bind(this)}/>
                    </div>
                </div>
                <div className="ContentField" styles= {{marginTop: '20px',marginBottom: '20px'}}>
                    <div className="FieldImage">
                        <img alt="Contraseña" src={ password_login } />
                    </div>
                    <div className="FieldDiv">
                        <input type="password" className="inputLogin mytext" name="password" id="password" placeholder="Contraseña" required onChange={this.handlePasswordChange.bind(this)} />
                    </div>
                </div>
                <div className="ContentField" styles={{padding:'5px 15px 10px', margin:'0px', textAlign:'right'}}>
                    <div style={{fontSize:'11px',cursor:'pointer',fontWeight:'bold',color:'#848484',textAlign:'right',paddingRight:'10px'}} onClick={this.handleOlvidoClave.bind(this)}>
                        Olvide mi Contrase&ntilde;a
                    </div>
                </div>
                <div className="DivBoton">
                    <input type="button" id="validateUser" onClick={this.handleLogin.bind(this)} value=" " />
                </div>
                <Window 
                    id = "windowResetPassword1"                      
                    title='Cambiar Password'
                    width='300px' 
                    height='240px'                     
                    tbar='false'
                    componente="WindowResetPassword"
                    params="" 
                />
                <Modal //la ventana del loading
                   isOpen={this.state.showLoading}
                   contentLabel="Minimal Modal Example"
                   style={stylesLoading}
                > 
                    <img src={loadingImg}  alt="Loading"/>
                </Modal>
            </form>           
        );
    }
}

export default LoginForm