/**
* CLASS DataGridRow
*
* Contiene una fila del datagrid
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React from 'react';
import {detectaDispostivo} from '../configuration/GlobalFunctions';

class DataGridRow extends React.Component {    
    handleEditButton(param){//boton editar      
        this.props.funcionClick('FormDataGrid',{ idRow:param,mainContainer:this.props.mainContainer,titulo:this.props.titulo,apiField:this.props.apiField,formFields:this.props.formFields});        
    }    
    handleNothing(){
        //...
    }
    render() {
        var os = detectaDispostivo().os.toLowerCase();
        //console.log(os);
        var dataRow = this.props.dataRow;   
        var onClick = "";
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
            <tr style={{ cursor:'pointer'}} onClick={ onClick } onDoubleClick={ onDblClick }>      
                <td>{this.props.numberRow+1}</td> 
                {
                    this.props.colsData.map((colsData,i) => {                        
                        return <td data-title={this.props.colsHeaders[i]} key={ i }>{dataRow[colsData]}&nbsp;</td>
                    })
                }    
            </tr>
        )
    }
}

export default DataGridRow