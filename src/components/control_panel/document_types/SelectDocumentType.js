import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import alertify from 'alertifyjs';
import '../../../css/alertify.css';

class SelectDocumentType extends Component { 
    constructor(props) {
        let  documentTypes = [];
        super(props);
        this.state = {  
                        documentTypes :  documentTypes
                     }
        //obtener el listado de tipos de compra
        axios.get('http://localhost:5000/document_types', {withCredentials: true})
            .then(res => {
                var response = res.data; 
                if (response.msg === "error") {
                    alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail);
                } else {
                    this.setState({ documentTypes: response })
                }
            })
            .catch( err => {            
                alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+err);
            });
    }  	   
  	componentWillMount() {
        
    }
    handleDocumentTypeChange(){

    }    
    render() {
        var documentTypes = this.state.documentTypes;
        //if (this.state.empleados.length > 0) {
        return (
            <Form.Control as="select" onChange={ this.props.functionChange }>
                {
                    documentTypes.map((documentTypes,i) => {
                        return <option key={ i } value={ documentTypes.id }>{ documentTypes.nombre }</option>
                    })                                                                                                          
                }
            </Form.Control>             
        )
    } 
}

export default SelectDocumentType
