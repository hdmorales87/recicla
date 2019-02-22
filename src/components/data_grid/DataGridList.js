import React from 'react'
import DataGridRow from './DataGridRow'

class DataGridList extends React.Component {

  render() {
      return (
          <tbody>
              {
                  this.props.listado.map((listado,i) => {
                      return <DataGridRow key={ i }
                                               dataRow = {listado}  
                                               titulo={this.props.titulo}                                                                                   
                                               funcionClick={this.props.funcionClick} 
                                               colsData={this.props.colsData}
                                               apiUrl={this.props.apiUrl}
                                               formFields={this.props.formFields}
                                               mainContainer={this.props.mainContainer}/>
                  })
              }
          </tbody>
      )
      
  }
}

export default DataGridList
