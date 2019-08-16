/**
* CLASS LogoLogin
*
* Contiene el componente del logo superior del login
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import logo_login1 from '../../images/logo_login1.png?v1.0';

class LogoLogin extends Component {
    
    render() {
        return (            
            <div className="LogoLogin">
                <img src={ logo_login1 } alt="Recicla" />
            </div>                                         
        );
    }
}

export default LogoLogin