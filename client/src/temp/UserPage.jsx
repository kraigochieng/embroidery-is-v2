import React, { useEffect, useRef, useState } from 'react'
import { admin } from '../axiosInstances'
export default function UserPage() {

  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])

  const roleDialog = useRef(null)
  const editUserDialog = useRef(null)

  const [userEntity, setUser] = useState({
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
      admin.get("users/get")
        .then(response => {
          setUsers([...response.data])
          console.log(response.data)
        })
        .catch(error => console.error(error))

      admin.get("roles/get")
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
    console.log(userEntity.roles)
  }

  function handleEdit(userEntity) {
    setUser({...userEntity})
    editUserDialog.current.showModal()
  }

  function handleDelete(id) {
    admin.delete(`users/${id}`)
      .then(response => {
        setUsers(prevUsers => prevUsers.filter(userEntity => userEntity.id !== id))
      })
      .catch(error => console.error(error))
  }

  function timeFormatter(timeStamp) {
    const [date, time] = timeStamp.split("T")
    return `${date} ${time.substring(0,8)}`
  }

  function seeRoles(userEntity) {
    console.log(userEntity)
    setUser({...userEntity})
    roleDialog.current.showModal()
  }

  return (
    <>
      <dialog id="role-dialog" ref={roleDialog}>
        {
          userEntity.roles.length > 0 ?
          <div>
            <h3>Roles</h3>
            {userEntity.roles.map(role => <p key={role.id}>{role.name}</p>)}
          </div> :
          <p>No roles assigned to userEntity</p>
        }
        <button onMouseUp={() => roleDialog.current.close()}>Close</button>
      </dialog>

      <dialog ref={editUserDialog}>
        <form>
          <label htmlFor="first-name">First Name</label>
          <input id="first-name" type="text" placeholder="First Name" name="firstName" value={userEntity.firstName} onChange={handleEditUserChange}/>
          <label htmlFor="last-name">Last Name</label>
          <input id="last-name" type="text" placeholder="Last Name" name="lastName" value={userEntity.lastName} onChange={handleEditUserChange}/>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" placeholder="Username" name="username" value={userEntity.username} onChange={handleEditUserChange}/>
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
              users.map(userEntity => (
                <tr key={userEntity.id}>
                  <td>{userEntity.firstName}</td>
                  <td>{userEntity.lastName}</td>
                  <td>{userEntity.username}</td>
                  <td><button onMouseUp={() => seeRoles(userEntity)}>See Roles</button></td>
                  <td>{!userEntity.accountNonExpired ? "True" : "False" }</td>
                  <td>{!userEntity.accountNonLocked ? "True" : "False"}</td>
                  <td>{timeFormatter(userEntity.createdAt)}</td>
                  <td>{userEntity.updatedAt ? timeFormatter(userEntity.updatedAt) : "Never Updated"}</td>
                  <td><button onMouseUp={() => handleEdit(userEntity)}>Edit</button></td>
                  <td><button onMouseUp={() => handleDelete(id)}>Delete</button></td>
                </tr>
            )) 
          }
        </tbody>
      </table>
    </>
  )
}
