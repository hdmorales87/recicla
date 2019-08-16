/**
* CLASS CustomMenuDropdown
*
* Contiene el contenedor del menu desplegable para las opciones de los informes
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';

class CustomMenuDropdown extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: '' };
  }
  handleChange(e) {
    this.setState({ value: e.target.value.toLowerCase().trim() });
  }
  render() {
      const {
        children,
        style,
        className,
        'aria-labelledby': labeledBy,
      } = this.props;
      const { value } = this.state;

      return (
        <div style={style} className={className} aria-labelledby={labeledBy}>        
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              child =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
  }
}

export default CustomMenuDropdown