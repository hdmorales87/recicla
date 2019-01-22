import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import LoginForm from './components/login/Login';
import Desktop from './components/desktop/Desktop';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>          
          <Redirect
            from="/"
            component={LoginForm} />
          <Switch>
            <Route exact path="/" component={LoginForm} />    
            <Route exact path="/desktop" component={Desktop} /> 
            <Route path="*" component={LoginForm}/>                 
            <Route component={LoginForm} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
