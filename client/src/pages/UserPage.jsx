import React, { useEffect, useState } from 'react'
import { server } from '../axiosInstances'
export default function UserPage() {

  const [users, setUsers] = useState([])

  useEffect(() => {
      server.get("admin/users")
        .then(response => {
          setUsers([...response.data])
          console.log(response.data)
        })
        .catch(error => console.error(error))
  }, [])

  function handleDelete(id) {
    server.delete(`admin/users/${id}`)
      .then(response => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id))
      })
      .catch(error => console.error(error))
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Role(s)</th>
          </tr>
        </thead>
        <tbody>
          {
            
            users.map(user => (
              user.roles.length > 0 ?
              user.roles.map((role,index) => (
                <tr key={`${user.id}_${index}`}>
                  { user.roles.indexOf(role) == 0 && <td rowSpan={user.roles.length}>{user.firstName}</td> }
                  { user.roles.indexOf(role) == 0 && <td rowSpan={user.roles.length}>{user.lastName}</td> }
                  { user.roles.indexOf(role) == 0 && <td rowSpan={user.roles.length}>{user.username}</td> }
                  <td>{role.name}</td>
                  { user.roles.indexOf(role) == 0 && <td rowSpan={user.roles.length}><button>Edit</button></td> }
                  { user.roles.indexOf(role) == 0 && <td rowSpan={user.roles.length}><button onClick={() => handleDelete(user.id)}>Delete</button></td> }
                </tr>
              )) :
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.username}</td>
                <td>No roles</td>
                <td><button>Edit</button></td>
                <td><button>Delete</button></td>
              </tr>
            )) 

          }
        </tbody>
      </table>
    </>
  )
}
