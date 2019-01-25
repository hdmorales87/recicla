import React, { Component } from 'react';
import LoginForm from './LoginForm';
import LogoLogin from './LogoLogin';
import './login.css';

class Login extends Component {
    
    render() {
        return (
            <div id="table_login">                
                <LogoLogin />
                <LoginForm />                
            </div>                          
        );
    }
}

export default Login