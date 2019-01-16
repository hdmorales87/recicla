import React, { Component } from 'react';

class LoginForm extends Component {

  render() {
    return (
      <form>
        <label for="nya">Identificacion</label>
        <br />
        <input type="text" name="nya" id="nya" required />
        <br /><br />
        <label for="email">Password</label>
        <br />
        <input type="text" name="email" id="email" required />
        <br />
        <input type="submit" value="Enviar" />
      </form>
    );
  }
}

export default LoginForm