/**
* CLASS App
*
* Contenedor principal de la aplicacion
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/login/Login';
import Desktop from './components/desktop/Desktop';
import ResetPasswordForm from './components/reset_password/ResetPasswordForm'

class App extends Component {
  render() {
    return (//router de la aplicacion
      <BrowserRouter>               
          <Switch>
              <Route exact path="/recicla/" component={Login} /> 
              <Route exact path="/recicla/resetPassword/:token/:user" component={ResetPasswordForm} />    
              <Route exact path="/recicla/desktop" component={Desktop} />              
          </Switch>        
      </BrowserRouter>
    );
  }
}
export default App;
