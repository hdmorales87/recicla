import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import alertify from 'alertifyjs';
import '../../../css/alertify.css';

class PurchaseTypesRow extends React.Component {
    constructor(props, context) {
        super(props, context);           
        this.handleConfirmAction = this.handleConfirmAction.bind(this);
    }
    handleEditButton(param){      
        this.props.funcionClick('FormPurchaseTypes',param);        
    }
    handleDeleteButton(id){
        alertify.confirm('Confirmacion', 'Esta seguro(a) de eliminar este item?', this.handleConfirmAction.bind(this,id), function(){});
    }   
    handleConfirmAction(id) {        
        //CODIGO PARA ELIMINAR LA FILA
        axios.delete('http://localhost:5000/purchase_types',{            
            data: {id : id},
            withCredentials: true
        })
        .then(response => {            
            var response = response.data;
            if(response.msg === 'error'){
                alertify.alert('Error!', 'Ha ocurrido un error accesando a la base de datos!<br />Codigo de Error: '+response.detail); 
            }
            else if(response.msg === 'notExist'){
                alertify.alert('Error!', 'El dato a eliminar no existe!'); 
            }
            this.props.funcionClick('WelcomePage'); 
            this.props.funcionClick('PurchaseTypes');
        })
        .catch(function (error) {
            alertify.alert('Error!', 'No se ha logrado la conexion con el servidor!<br />'+error);
        });        
    }
    render() {
        var dataRow = this.props.dataRow;
        return(
            <tr>      
                <td>{dataRow.id}</td> 
                <td>{dataRow.nombre}</td>     
                <td>{dataRow.precio}</td>                 
                <td>
                    <div className="float-left mr-3">
                        <Button variant="primary" onClick={this.handleEditButton.bind(this,dataRow)}>EDITAR</Button>
                    </div>
                    <div className="float-left">
                        <Button variant="danger" onClick={this.handleDeleteButton.bind(this,dataRow.id)}>ELIMINAR</Button>                        
                    </div>
                </td>     
            </tr>
        )
    }
}

export default PurchaseTypesRow
