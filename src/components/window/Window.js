/**
* CLASS Window
*
* Contiene el componente principal de la ventana
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React, { Component } from 'react';
import Modal from 'react-modal';
import WindowContainer from './WindowContainer';
import MaterialIcon from 'material-icons-react';
import './window.css';

Modal.setAppElement('#root');

const customStyles = {
  content : {
    top         : '50%',
    left        : '50%',
    right       : 'auto',
    bottom      : 'auto',
    marginRight : '-50%',
    padding     : '0px',
    transform   : 'translate(-50%, -50%)',    
  }
};

class Window extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            showModal: false
        };        
        this.handleCloseModal = this.handleCloseModal.bind(this); 
        customStyles.content.width = this.props.width;   
    }    
    componentWillReceiveProps(next_props){
        console.log('componentWillReceiveProps', next_props);
        this.setState({ showModal: next_props.showModal });
    }       
    handleCloseModal () {
        this.setState({ showModal: false });
    }    
  	render() {
  	  	return (
  				  <Modal 
               isOpen={this.state.showModal}
               contentLabel="Minimal Modal Example"
               style={customStyles}
            >
                <div className="windowTitle" os="windows" id="windowTitleFrame">
                    <div id="windowTitleTextFrame" className="windowTitleText" os="windows">{this.props.title}</div>
                    <div className="windowTitleBoton" style={{ top: '-4px',left:'-2px'}} os="windows" id="btnCloseVentanaFrame" onClick={this.handleCloseModal}>
                        <MaterialIcon size={24} icon="close" invert id="iconClose"/>
                    </div> 
                </div>                      
                <WindowContainer componente="FormDataUser"/>
            </Modal>  				
			  );
  	}
}

export default Window