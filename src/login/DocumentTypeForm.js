import React, { Component } from 'react';

class DocumentTypeForm extends Component {

  render() {
    return (
      <form>
        <label for="nya">Nombres y Apellidos: (Solo lectura)</label>
        <br />
        <input type="text" name="nya" id="nya" readonly="true" />
        <br /><br />
        <label for="email">Email: (Campo Obligatorio)</label>
        <br />
        <input type="text" name="email" id="email" required />
        <br /><br />
        <label for="edad">Edad: (Ejemplo)</label>
        <br/>
        <input type="text" name="edad" id="edad" placeholder="Ejemplo: 23 años" />
        <br /><br />
        <input type="submit" value="Enviar" />
      </form>
    );
  }
}

export default DocumentTypeForm