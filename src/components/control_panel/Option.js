import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react';
import './controlpanel.css';
//import Container from './Container';

class Option extends Component {
    handleContainerChange(){
        this.props.funcionClick(this.props.componente);
        //console.log(this.props.funcionClick);
    }
    render() {
        return (
            <li id={this.props.tab} onClick={this.handleContainerChange.bind(this)}>
                <div className="icono"><MaterialIcon size={50} icon={this.props.icono} /></div>
                <div className="data">{this.props.titulo}</div>
            </li>                   
        );
    }
}

export default Option
