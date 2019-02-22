import React, { Component } from 'react';
import UsersList from './UsersList';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import alertify from 'alertifyjs';
import '../../../css/alertify.css';

class UsersContainer extends Component {
    constructor(props) {
        let  users = [];
        super(props);
        this.state = {  
                        users :  users
                     }
    }
  	handleClick(val) {
  	  	this.setState({ justClicked: val });
  	}
    componentWillMount() {
        //obtener el listado de tipos de compra
        axios.get('http://localhost:5000/users', {withCredentials: true})
            .then(res => {
                var response = res.data; 
                if (response.msg === "error") {
                    alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail);
                } else {
                    this.setState({ users: response })
                }
            })
            .catch( err => {            
                alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+err);
            });
    }
  	render() {       
        if (this.state.users.length > 0) {
            return (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Tipo Documento</th>
                            <th>Documento</th>
                            <th>Nombre</th> 
                            <th>Username</th>  
                            <th>Direccion</th>
                            <th>Telefono</th>                                                     
                            <th style= {{width: '180px'}}>Acciones</th>
                        </tr>
                    </thead>      
                    <UsersList listado={this.state.users} funcionClick={this.props.funcionClick}/>                                       
                </Table>
            )
        } else {
            return <div className="titulo">No hay registros...</div>
        }
    } 
}

export default UsersContainer
