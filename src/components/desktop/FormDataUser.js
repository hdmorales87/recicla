/**
* CLASS Option
*
* Contiene el componente opcion de la barra de menu del escritorio
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
                <button onClick={this.handleCloseModal}>Close Modal</button>
            </div>  				
			  );
  	}
}

export default FormDataUser
