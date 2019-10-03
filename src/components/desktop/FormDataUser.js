/**
* CLASS Option
*
* Contiene el componente formulario de datos de usuario
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react';
import './desktop.css';

class FormDataUser extends Component {
    handleContainerChange(){
        this.props.funcionClick(this.props.componente);        
    }
  	render() {
  	  	return (
  				  <div>
                Formulario de Empleado
            </div>  				
			  );
  	}
}

export default FormDataUser