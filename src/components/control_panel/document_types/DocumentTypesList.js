import React from 'react'
import DocumentTypesRow from './DocumentTypesRow'

class DocumentTypesList extends React.Component {

  render() {
      return (
          <tbody>
              {
                  this.props.listado.map((documentTypes,i) => {
                      return <DocumentTypesRow key={ i }
                                           dataRow = {documentTypes}                                                                                     
                                           funcionClick={this.props.funcionClick} />
                  })
              }
          </tbody>
      )
      
  }
}

export default DocumentTypesList
