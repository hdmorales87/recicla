import React, { Component } from 'react';
import LoginForm from './LoginForm';
import logo_login from '../../images/logo_login.png?v1.0';

class LogoLogin extends Component {
    
    render() {
        return (            
            <div className="LogoLogin">
                <img src={ logo_login } alt="Acecolombia" />
            </div>                                         
        );
    }
}

export default LogoLogin