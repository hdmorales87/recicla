import React, { Component } from 'react';
import './login.css';
import usuario_login from '../../images/usuario_login.png?v1.0';
import password_login from '../../images/password_login.png?v1.0';
import axios from 'axios';
import alertify from 'alertifyjs';
import '../../css/alertify.css';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {username: ''};
        this.state = {password: ''}; 
        this.handleLogin = this.handleLogin.bind(this);
    }
    handleLogin(val) {    
        //validacion de datos       
        if(this.state.username === undefined || this.state.username === ''){
            alertify.error('Digite el nombre de usuario!'); 
            return;
        }   
        else if(this.state.username === undefined || this.state.password === ''){
            alertify.error('Digite el password!'); 
            return;
        }
        //consulta si el usuario existe con los datos ingresados
        axios.get('http://localhost:5000/login/'+this.state.username+'/'+this.state.password, {withCredentials: true})
        .then(res => {
            var response = res.data; 
                      
            if(response.msg === 'notExist'){
                alertify.error('Datos de ingreso incorrectos!'); 
            }
            else if(response.msg === 'error'){
                alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail);
            }
            else{
                this.props.history.push({pathname: '/desktop', state : { usuario : response }}); 
            }          
        }) 
        .catch( err => {            
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+err);
        })
    }
    handleIdChange(e) { 
        this.setState({username: e.target.value}); 
    }
    handlePasswordChange(e) { 
        this.setState({password: e.target.value}); 
    } 
    render() {
        return (
            <form className="DivLogin">
                <div className="ContentField">
                    <div className="FieldImage">
                        <img alt="Usuario" src={ usuario_login } />
                    </div>
                    <div className="FieldDiv">
                        <input type="text" className="mytext" name="usuario" id="usuario" placeholder="Usuario" required onChange={this.handleIdChange.bind(this)} />
                    </div>
                </div>
                <div className="ContentField" styles= {{marginTop: '20px'}}>
                    <div className="FieldImage">
                        <img alt="Contraseña" src={ password_login } />
                    </div>
                    <div className="FieldDiv">
                        <input type="password" className="mytext" name="password" id="password" placeholder="Contraseña" required onChange={this.handlePasswordChange.bind(this)} />
                    </div>
                </div>
                <div className="ContentField" styles={{padding:'5px 15px 10px', margin:'0px', textAlign:'right'}}>
                    <div style={{color:'#FFF'}}>
                        <input id="recordarme" name="recordarme" type="checkbox" value="true" style={{height:'auto'}} />Recordar mi Usuario
                    </div>
                </div>
                <div className="DivBoton">
                    <input type="button" id="validateUser" onClick={this.handleLogin.bind(this)} value=" " />
                </div>
            </form>           
        );
    }
}

export default LoginForm