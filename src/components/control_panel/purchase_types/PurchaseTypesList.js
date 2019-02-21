import React from 'react'
import PurchaseTypesRow from './PurchaseTypesRow'

class PurchaseTypesList extends React.Component {

  render() {
      return (
          <tbody>
              {
                  this.props.listado.map((purchaseTypes,i) => {
                      return <PurchaseTypesRow key={ i }
                                           dataRow = {purchaseTypes}                                                                                     
                                           funcionClick={this.props.funcionClick} />
                  })
              }
          </tbody>
      )
      
  }
}

export default PurchaseTypesList
