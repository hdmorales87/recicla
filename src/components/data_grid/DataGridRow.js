/**
* CLASS DataGridRow
*
* Contiene una fila del datagrid
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React from 'react';
import {detectaDispostivo} from '../configuration/GlobalFunctions';
import MaterialIcon from 'material-icons-react';

class DataGridRow extends React.Component {    
    handleEditButton(param){//boton editar           
        if(this.props.automatica === 'true'){
            this.props.funcionClick('FormDataGrid',{ 
                                                        idRow:param,
                                                        mainContainer:this.props.mainContainer,
                                                        titulo:this.props.titulo,
                                                        apiField:this.props.apiField,
                                                        formFields:this.props.formFields,
                                                        enableBtnEdit:this.props.enableBtnEdit,
                                                        enableBtnDel:this.props.enableBtnDel
                                                    });       
        } 
        else{            
            this.props.funcionEdit(param,this.props.funcionEditParams);            
        }
    }    
    handleNothing(){
        //...
    }
    render() {         
        var os = detectaDispostivo().os.toLowerCase();
        //console.log(os);
        var dataRow = this.props.dataRow;   
        var onClick = "";
        var field = "";
        var onDblClick = "";

        if(os === 'android' || os === 'ios'){           
            onClick = this.handleEditButton.bind(this,dataRow);
            onDblClick = this.handleNothing.bind(this);
        } 
        else{            
            onClick = this.handleNothing.bind(this);
            onDblClick = this.handleEditButton.bind(this,dataRow);
        }       

        return(//carga las celdas con los datos y adiciona los botones de editar y eliminar
            <tr style={{ cursor:'pointer'}}>      
                <td style={{fontSize:'12px'}} onClick={ onClick } onDoubleClick={ onDblClick }>{this.props.numberRow+1}</td> 
                {
                    this.props.colsData.map((colsData,i) => {
                        if(colsData.type === 'bd'){
                            field = <td data-title={colsData.label} key={ i } style={{fontSize:'12px'}} onClick={ onClick } onDoubleClick={ onDblClick }>{dataRow[colsData.field]}&nbsp;</td>
                        }
                        else if(colsData.type === 'manual'){
                            field = <td data-title={colsData.label} key={ i } style={{fontSize:'12px'}}>
                                        <div onClick={colsData.colFuncion.bind(this,dataRow.id)} style={{cursor:'pointer'}} ><MaterialIcon id="iconColumna" size={20} icon={colsData.icon} /></div>
                                    </td>
                        }
                        else{
                            return null;
                        }
                        return field; 
                    })
                }    
            </tr>
        )
    }
}

export default DataGridRow