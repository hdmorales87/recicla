import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import alertify from 'alertifyjs';
import '../../css/alertify.css';

class ComboBoxFormDataGrid extends Component {
    constructor(props) {
        let  arrayContent = [];
        super(props);
        this.state = {  
                        content :  arrayContent
                     }
    }
    componentWillMount() {
        //obtener el listado de tipos de compra
        if(this.props.dinamic === 'true'){
            axios.get(this.props.apiUrl, {withCredentials: true})
                .then(res => {
                    var response = res.data; 
                    if (response.msg === "error") {
                        alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail);
                    } else {
                        this.setState({ content: response })
                    }
                })
                .catch( err => {            
                    alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+err);
                });
        }
        else{
            this.setState({ content: this.props.options });
        }
        
    }

  	render() {   
        var valueText = this.props.value;    
        if(valueText > 0){
            //this.props.value = 1;
        }
        else{
            valueText = 1;
        }
        //if (this.state.empleados.length > 0) {
        return (
            <Form.Control as="select" name = {this.props.name} onChange={this.props.functionChange} value={valueText}>
                {
                    this.state.content.map((content,i) => {                       
                        return <option key={ i } value={content.id} >{content[this.props.valueName]}</option>

                    })                                        
                }                
            </Form.Control>                         
        )
    } 
}

export default ComboBoxFormDataGrid
