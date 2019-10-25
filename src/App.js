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

class App extends Component {
  render() {
    return (//router de la aplicacion
      <BrowserRouter>               
          <Switch>
              <Route exact path="/" component={Login} /> 
              <Route exact path="/resetPassword" component={Login} />    
              <Route exact path="/desktop" component={Desktop} />                          
              <Route path="*" component={Login}/>                 
              <Route component={Login} />
          </Switch>        
      </BrowserRouter>
    );
  }
}
export default App;
