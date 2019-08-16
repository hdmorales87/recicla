/**
* CLASS CustomToggleDropdown
*
* Contiene el evento para cargar un contenedor al seleccionar una opcion del menu de informes
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';

class CustomToggleDropdown extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    this.props.onClick(e);
  }
  render() {
    return (
      <div onClick={this.handleClick}>
        {this.props.children}
      </div>
    );
  }
}

export default CustomToggleDropdown