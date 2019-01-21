import React, { Component } from 'react';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {identification: ''};
        this.state = {password: ''}; 
    }
    handleLogin(val) {
        console.log("Id: " + this.state.identification); 
        console.log("Password: " + this.state.password); 
        
    }
    handleIdChange(e) { 
        this.setState({identification: e.target.value}); 
    }
    handlePasswordChange(e) { 
        this.setState({password: e.target.value}); 
    } 
    render() {
        return (
            <form>
                <label for="nya">Identificacion</label>
                <br />
                <input type="text" name="identification" id="identification" required onChange={this.handleIdChange.bind(this)}/>
                <br /><br />
                <label for="email">Password</label>
                <br />
                <input type="text" name="password" id="password" required onChange={this.handlePasswordChange.bind(this)}/> 
                <br />
                <button className="btn" onClick={this.handleLogin.bind(this)}>Entrar</button>
            </form>
        );
    }
}

export default LoginForm