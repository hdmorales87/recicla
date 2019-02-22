import React from 'react'
import UsersRow from './UsersRow'

class UsersList extends React.Component {

  render() {
      return (
          <tbody>
              {
                  this.props.listado.map((users,i) => {
                      return <UsersRow key={ i }
                                           dataRow = {users}                                                                                     
                                           funcionClick={this.props.funcionClick} />
                  })
              }
          </tbody>
      )
      
  }
}

export default UsersList
