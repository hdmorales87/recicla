/**
* CLASS DataGridList
*
* Contiene el cuerpo de la tabla del datagrid
*
* @author Hector Morales <warrior1987@gmail.com>
*/

import React from 'react'
import DataGridRow from './DataGridRow'

class DataGridList extends React.Component {

  render() {
      return (
          <tbody>
              {
                  this.props.listado.map((listado,i) => {
                      return <DataGridRow key={ i }
                                               numberRow = {i}
                                               dataRow = {listado}  
                                               titulo={this.props.titulo}                                                                                   
                                               funcionClick={this.props.funcionClick} 
                                               colsData={this.props.colsData}
                                               apiField={this.props.apiField}
                                               formFields={this.props.formFields}
                                               mainContainer={this.props.mainContainer}
                                               parametro={this.props.parametro}
                                               colsHeaders={this.props.colsHeaders}
                                               automatica={this.props.automatica}
                                               funcionEdit = {this.props.funcionEdit}
                                               funcionEditParams = {this.props.funcionEditParams}/>
                  })
              }
          </tbody>
      )
      
  }
}

export default DataGridList