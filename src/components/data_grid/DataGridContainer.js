import React, { Component } from 'react';
import DataGridList from './DataGridList';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import alertify from 'alertifyjs';
import '../../css/alertify.css';

class DataGridContainer extends Component {
    constructor(props) {
        let  arrayContent = [];
        super(props);
        this.state = {  
                        content :  arrayContent
                     }
    }
  	handleClick(val) {
  	  	this.setState({ justClicked: val });
  	}
    
    cargaFilas(){
        let searchWord = '';
        if(this.props.parametro !== undefined){
            searchWord = this.props.parametro.searchWord;            
        }
        
        console.log(this.props.parametro);
        axios.get(this.props.apiUrl, {withCredentials: true, params: { searchWord : searchWord } })
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

    componentWillMount() {
        this.cargaFilas();        
    }

    componentDidUpdate(prevProps){        
        if (this.props.parametro !== prevProps.parametro) {           
           this.cargaFilas(); 
        }       
    }    

  	render() {    
        //console.log(this.props.parametro); 
        if (this.state.content.length > 0) {
            return (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>No</th>
                            {
                                this.props.colsHeaders.map((colsHeaders,i) => {
                                    return <th key={ i }>{colsHeaders}</th>
                                })
                            }                          
                            <th style= {{width: '180px'}}>Acciones</th>
                        </tr>
                    </thead>      
                    <DataGridList listado={this.state.content} 
                                  titulo={this.props.titulo}
                                  funcionClick={this.props.funcionClick} 
                                  colsData={this.props.colsData} 
                                  apiUrl={this.props.apiUrl}
                                  formFields={this.props.formFields}
                                  mainContainer={this.props.mainContainer}/>                                       
                </Table>
            )
        } else {
            return <div className="titulo">No hay registros...</div>
        }
    } 
}

export default DataGridContainer
