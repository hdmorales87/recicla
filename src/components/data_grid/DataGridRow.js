/**
* CLASS DataGridRow
*
* Contiene una fila del datagrid
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React from 'react';
import Button from 'react-bootstrap/Button';
import {eliminarFilas} from '../api_calls/ApiCalls';
import configJson from '../configuration/configuration.json';
import {divMouseOver,divMouseOut} from '../configuration/GlobalFunctions';
import alertify from 'alertifyjs';
import '../../css/alertify.css';

class DataGridRow extends React.Component {
    constructor(props, context) {
        super(props, context);           
        this.handleConfirmAction = this.handleConfirmAction.bind(this);
    }
    handleEditButton(param){//boton editar      
        this.props.funcionClick('FormDataGrid',{ idRow:param,mainContainer:this.props.mainContainer,titulo:this.props.titulo,apiField:this.props.apiField,formFields:this.props.formFields});        
    }
    handleDeleteButton(id){//boton eliminar
        alertify.confirm('Confirmacion', 'Esta seguro(a) de eliminar este item?', this.handleConfirmAction.bind(this,id), function(){});
    }   
    handleConfirmAction(id) {        
        //CODIGO PARA ELIMINAR LA FILA        
        eliminarFilas(this.props.apiField,id)
        .then(response => {            
            response = response.data;
            if(response.msg === 'error'){
                alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail); 
            }
            else if(response.msg === 'notExist'){
                alertify.alert('Error!', 'El dato a eliminar no existe!'); 
            }
            this.props.funcionClick('WelcomePage'); 
            this.props.funcionClick(this.props.mainContainer);
        })
        .catch(function (error) {
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+error);
        });        
    }
    render() {
        var dataRow = this.props.dataRow;        
        return(//carga las celdas con los datos y adiciona los botones de editar y eliminar
            <tr>      
                <td>{dataRow.id}</td> 
                {
                    this.props.colsData.map((colsData,i) => {                        
                        return <td data-title={this.props.colsHeaders[i]} key={ i }>{dataRow[colsData]}&nbsp;</td>
                    })
                }                                 
                <td className="filaBotones"> 
                    <div style={{width:'160px'}}>
                        <div id="divBotonEditar" className="float-left mr-3">
                            <Button id="dataGridBtnEdit" variant="primary" onClick={this.handleEditButton.bind(this,dataRow)} style={{backgroundColor:configJson.fondoBotonGrilla}} onMouseOut={divMouseOut.bind(this,'dataGridBtnEdit',configJson.fondoBotonGrilla)} onMouseOver={divMouseOver.bind(this,'dataGridBtnEdit',configJson.fondoBotonGrilla)}>EDITAR</Button>
                        </div>
                        <div className="float-left">
                            <Button id="dataGridBtnDelete" variant="danger" onClick={this.handleDeleteButton.bind(this,dataRow.id)} onMouseOut={divMouseOut.bind(this,'dataGridBtnDelete','#dc3545')} onMouseOver={divMouseOver.bind(this,'dataGridBtnDelete','#dc3545')}>ELIMINAR</Button>                        
                        </div>
                    </div>
                </td>     
            </tr>
        )
    }
}

export default DataGridRow