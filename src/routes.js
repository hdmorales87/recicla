import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

//Page Components
//import App from './components/App';
import LoginForm from './components/login/Login';
import ControlPanel from './components/control_panel/ControlPanel';


//Routes for this app (if any route must be protected wrap it with the function requireAuth(ReactComponent)
export default (

    <BrowserRouter>
        <Route exact path="/"  components={LoginForm} />            
        <Route path="control_panel" component={ControlPanel} />            
        <Route path="*" component={LoginForm}/>        
    </BrowserRouter>
)