import React from 'react'

class PurchasesRow extends React.Component {

  render() {
    return(
      <tr>      
          <td>{this.props.id}</td> 
          <td>{this.props.tipo_compra}</td>     
          <td>{this.props.reciclador}</td> 
          <td>{this.props.peso}</td> 
          <td>{this.props.fecha}</td> 
          <td>{this.props.fecha}</td>     
      </tr>
    )
  }
}

export default PurchasesRow
