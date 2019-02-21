import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class PurchasesRow extends React.Component {
    constructor(props, context) {
        super(props, context);
    
        this.handleConfirmShow = this.handleConfirmShow.bind(this);
        this.handleConfirmClose = this.handleConfirmClose.bind(this);
    
        this.state = {
          show: false,
        };
    }
    handleEditButton(param){      
        this.props.funcionClick('FormPurchases',param);
        //console.log(this.props.funcionClick);
    }
    handleDeleteButton(param){
        this.handleConfirmShow();
        //alert(param);
        //this.props.funcionClick('FormPurchase',param);
        //console.log(this.props.funcionClick);
    }
    handleConfirmClose() {
        this.setState({ show: false });
    }
  
    handleConfirmShow() {
        this.setState({ show: true });
    }
    handleConfirmAction(id) {
        this.setState({ show: false });
        //CODIGO PARA ELIMINAR LA FILA
        alert(id);
    }
    render() {
        return(
            <tr>      
                <td>{this.props.id}</td> 
                <td>{this.props.tipo_compra}</td>     
                <td>{this.props.reciclador}</td> 
                <td>{this.props.peso}</td> 
                <td>{this.props.fecha}</td> 
                <td>
                    <div className="float-left mr-3">
                        <Button variant="primary" onClick={this.handleEditButton.bind(this,this.props.id)}>EDITAR</Button>
                    </div>
                    <div className="float-left">
                        <Button variant="danger" onClick={this.handleDeleteButton.bind(this,this.props.id)}>ELIMINAR</Button>
                        <Modal show={this.state.show} onHide={this.handleConfirmClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Confirmar Borrado</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Esta seguro(a) de eliminar este item?</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleConfirmClose}>
                                    Cancelar
                                </Button>
                                <Button variant="danger" onClick={this.handleConfirmAction.bind(this,this.props.id)}>
                                    Eliminar
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </td>     
            </tr>
        )
    }
}

export default PurchasesRow
