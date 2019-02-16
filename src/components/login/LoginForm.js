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
        this.state = {identification: ''};
        this.state = {password: ''}; 
        this.handleLogin = this.handleLogin.bind(this);
    }
    handleLogin(val) {       
        //consulta si el usuario existe con los datos ingresados
        axios.get('http://localhost:5000/login/'+this.state.identification+'/'+this.state.password)
        .then(res => {
          var response = res.data;
          //response = response.json();
          console.log(response.msg);
          if(response.msg == 'notExist'){
                alertify.error('Datos de ingreso incorrectos!'); 
          }
          else{
               this.props.history.push('/desktop'); 
          }
          
        }) 
    }
    handleIdChange(e) { 
        this.setState({identification: e.target.value}); 
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