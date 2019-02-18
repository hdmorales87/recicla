import React, { Component } from 'react';
import logo_login1 from '../../images/logo_login1.png?v1.0';

class LogoLogin extends Component {
    
    render() {
        return (            
            <div className="LogoLogin">
                <img src={ logo_login1 } alt="Acecolombia" />
            </div>                                         
        );
    }
}

export default LogoLogin