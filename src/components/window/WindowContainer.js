/**
* CLASS WindowContainer
*
* Contiene el contenedor de contenido para la ventana
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import FormDataUser from '../desktop/FormDataUser';
import DataGridSelect from '../data_grid/DataGridSelect';

class WindowContainer extends Component {    
    // listado de componentes     
    render() {        
        if(this.props.parametro){
            this.props.params.parametro = this.props.parametro;            
        }
        let componentList = {
            FormDataUser : FormDataUser,  
            DataGridSelect : DataGridSelect,                         
        }     
        let ChildComponent = componentList[this.props.componente];    
        return (        
            <ChildComponent params={this.props.params} funcionClick={this.props.funcionClick} />              
        );  	
  	}
}

export default WindowContainer