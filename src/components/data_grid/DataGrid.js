import React, { Component } from 'react';
import DataGridContainer from './DataGridContainer';
import Button from 'react-bootstrap/Button';

class DataGrid extends Component {    
  	handleNewButton(){
        console.log(this.props.funcionClick);
        this.props.funcionClick('FormDataGrid',{ idRow:0,mainContainer:this.props.mainContainer,titulo:this.props.titulo,apiUrl:this.props.apiUrl,formFields:this.props.formFields});
        //console.log(this.props.funcionClick);
    }    
  	render() {
        //if (this.state.empleados.length > 0) {
        return (
            <div className="container">
                <div className="content">
                    <div className="table-responsive mt-4">
                        <div className="titulo">{this.props.titulo}</div>
                    </div>
                    <hr />
                    <div className="table-responsive mb-3">
                        <Button variant="primary" onClick={this.handleNewButton.bind(this)}>AGREGAR NUEVO</Button>
                    </div>                    
                    <div className="table-responsive" style={{height:'500px'}}>
                        <DataGridContainer funcionClick={this.props.funcionClick} 
                                           titulo={this.props.titulo}
                                           colsHeaders={this.props.colsHeaders} 
                                           colsData={this.props.colsData}
                                           apiUrl={this.props.apiUrl}
                                           formFields={this.props.formFields}
                                           mainContainer={this.props.mainContainer}/>
                    </div>                    
                </div>
            </div>             
        )
    } 
}

export default DataGrid
