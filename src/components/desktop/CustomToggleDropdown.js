/**
* CLASS CustomToggleDropdown
*
* Contiene el evento que le da accion al dropdown
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
      <div href="" onClick={this.handleClick}>
        {this.props.children}
      </div>
    );
  }
}

export default CustomToggleDropdown