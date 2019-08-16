/**
* CLASS Login
*
* Contiene el contenedor principal del login de la aplicacion
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import LoginForm from './LoginForm';
import LogoLogin from './LogoLogin';
import './login.css';

class Login extends Component {    
    render() {   		
        return (
            <div id="table_login"> 
            	<div>               
                	<LogoLogin />
                	<LoginForm history={this.props.history}/>
            	</div>                
            </div>                          
        );
    }
}

export default Login