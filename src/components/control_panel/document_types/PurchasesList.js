import React from 'react'
import PurchasesRow from './PurchasesRow'

class PurchasesList extends React.Component {

  render() {
      return (
          <tbody>
              {
                  this.props.listado.map((purchases) => {
                      return <PurchasesRow key={ purchases.key }
                                           id={ purchases.key } 
                                           tipo_compra={ purchases.tipo_compra }
                                           reciclador={ purchases.reciclador }
                                           peso={ purchases.peso }
                                           fecha={ purchases.fecha }
                                           funcionClick={this.props.funcionClick} />
                  })
              }
          </tbody>
      )
      
  }
}

export default PurchasesList
