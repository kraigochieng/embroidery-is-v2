import React, { useEffect, useRef, useState } from 'react'
import { server } from '../axiosInstances'
export default function UserPage() {

  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])

  const roleDialog = useRef(null)
  const editUserDialog = useRef(null)

  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    roles: [],
    enabled: false,
    accountNonExpired: false,
    accountNonLocked: false,
    createdAt: "",
    updatedAt: "",
    credentialsNonExpired: ""
  })

  useEffect(() => {
      server.get("admin/users/get")
        .then(response => {
          setUsers([...response.data])
          console.log(response.data)
        })
        .catch(error => console.error(error))

      server.get("admin/roles/get")
        .then(response => {
          setRoles([...response.data])
        })
        .catch(error => console.error)
  }, [])

  function handleEditUserChange(event) {
    const {name, value} = event.target
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }))
  }

  function handleEditRole(event) {
    const {checked, value} = event.target
    setUser(prevUser => ({
      ...prevUser,
      roles: checked ? [...prevUser.roles, value] : prevUser.roles.filter(role => role.id !== value)
    }))
    console.log(user.roles)
  }

  function handleEdit(user) {
    setUser({...user})
    editUserDialog.current.showModal()
  }

  function handleDelete(id) {
    server.delete(`admin/users/${id}`)
      .then(response => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id))
      })
      .catch(error => console.error(error))
  }

  function timeFormatter(timeStamp) {
    const [date, time] = timeStamp.split("T")
    return `${date} ${time.substring(0,8)}`
  }

  function seeRoles(user) {
    console.log(user)
    setUser({...user})
    roleDialog.current.showModal()
  }

  return (
    <>
      <dialog id="role-dialog" ref={roleDialog}>
        {
          user.roles.length > 0 ?
          <div>
            <h3>Roles</h3>
            {user.roles.map(role => <p key={role.id}>{role.name}</p>)}
          </div> :
          <p>No roles assigned to user</p>
        }
        <button onClick={() => roleDialog.current.close()}>Close</button>
      </dialog>

      <dialog ref={editUserDialog}>
        <form>
          <label htmlFor="first-name">First Name</label>
          <input id="first-name" type="text" placeholder="First Name" name="firstName" value={user.firstName} onChange={handleEditUserChange}/>
          <label htmlFor="last-name">Last Name</label>
          <input id="last-name" type="text" placeholder="Last Name" name="lastName" value={user.lastName} onChange={handleEditUserChange}/>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" placeholder="Username" name="username" value={user.username} onChange={handleEditUserChange}/>
          <fieldset>
            <legend>Roles</legend>
            {roles.map(role => (
              <div>
                <input id={role.name} type="checkbox" value={role.id} onChange={handleEditRole}/>
                <label htmlFor={role.name} >{role.name}</label>
              </div>
            ))}
          </fieldset>
          
        </form>
      </dialog>

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Role&#40;s&#41;</th>
            <th>Expired</th>
            <th>Locked</th>
            <th>Created</th>
            <th>Last Updated</th>
          </tr>
        </thead>

        <tbody>
          {
              users.map(user => (
                <tr key={user.id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.username}</td>
                  <td><button onClick={() => seeRoles(user)}>See Roles</button></td>
                  <td>{!user.accountNonExpired ? "True" : "False" }</td>
                  <td>{!user.accountNonLocked ? "True" : "False"}</td>
                  <td>{timeFormatter(user.createdAt)}</td>
                  <td>{user.updatedAt ? timeFormatter(user.updatedAt) : "Never Updated"}</td>
                  <td><button onClick={() => handleEdit(user)}>Edit</button></td>
                  <td><button onClick={() => handleDelete(id)}>Delete</button></td>
                </tr>
            )) 
          }
        </tbody>
      </table>
    </>
  )
}
