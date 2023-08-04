import React, { useEffect, useRef, useState } from 'react'
import { server } from '../axiosInstances'
import { deleteUser, getUsers, postUser } from '../features/users/usersSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getRoles } from '../features/roles/rolesSlice'
export default function UserPage() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
    dispatch(getRoles())
  }, [])

  const users = useSelector(state => state.users)
  const roles = useSelector(state => state.roles)

  const roleDialog = useRef(null)
  const userDialog = useRef(null)

  const [method, setMethod] = useState("")

  const [userFormData, setUserFormData] = useState({
    id: "",
    firstName: "Kraig",
    lastName: "Ochieng",
    username: "kraig",
    password: "password",
    roles: [],
    enabled: false,
    accountNonExpired: false,
    accountNonLocked: false,
    createdAt: "",
    updatedAt: "",
    credentialsNonExpired: ""
  })

  function handleUserFormChange(event) {
    const {name, value} = event.target
    setUserFormData(prevUser => ({
      ...prevUser,
      [name]: value
    }))
  }

  function handleRoleChange(event) {
    const {checked, value} = event.target
    setUserFormData(prevUser => ({
      ...prevUser,
      roles: checked ? [...prevUser.roles, {id: value}] : prevUser.roles.filter(role => role.id != value)
    }))

    // setUserFormData(prevUser => ({
    //   ...prevUser,
    //   roles: checked ? [...prevUser.roles, value] : prevUser.roles.filter(role => role.id !== value)
    // }))
    console.log(userFormData.roles)
  }

  function handlePostUser() {
    setMethod("POST")
    userDialog.current.showModal()
  }

  function handleEditUser(user) {
    setMethod("PUT")
    setUserFormData({...user})
    userDialog.current.showModal()
  }

  function handleDeleteUser(id) {
    dispatch(deleteUser(id))
  }

  function handleSubmit(event) {
    event.preventDefault()
    if(method === "POST") {
      dispatch(postUser(userFormData))
    } else if(method === "PUT") {

    }
  }

  function timeFormatter(timeStamp) {
    const [date, time] = timeStamp.split("T")
    return `${date} ${time.substring(0,8)}`
  }

  function seeRoles(user) {
    console.log(user)
    setUserFormData({...user})
    roleDialog.current.showModal()
  }

  return (
    <>
      <dialog id="role-dialog" ref={roleDialog}>
        {
          userFormData.roles.length > 0 ?
          <div>
            <h3>Roles</h3>
            {userFormData.roles.map(role => <p key={role.id}>{role.name}</p>)}
          </div> :
          <p>No roles assigned to user</p>
        }
        <button onClick={() => roleDialog.current.close()}>Close</button>
      </dialog>

      <dialog ref={userDialog}>
        <form method={method} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="first-name">First Name</label>
            <input id="first-name" type="text" placeholder="First Name" name="firstName" value={userFormData.firstName} onChange={handleUserFormChange}/>
          </div>
          <div>
            <label htmlFor="last-name">Last Name</label>
            <input id="last-name" type="text" placeholder="Last Name" name="lastName" value={userFormData.lastName} onChange={handleUserFormChange}/>
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input id="username" type="text" placeholder="Username" name="username" value={userFormData.username} onChange={handleUserFormChange}/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="Password" name="password" value={userFormData.password} onChange={handleUserFormChange}/>
          </div>

          <fieldset>
            <legend>Roles</legend>
            {roles.data.map(role => (
              <div key={role.id}>
                <input id={role.name} type="checkbox" value={role.id} onChange={handleRoleChange}/>
                <label htmlFor={role.name} >{role.name}</label>
              </div>
            ))}
          </fieldset>
          <button>{method === "POST" ? "Add" : "Edit"} User</button>
        </form>
      </dialog>
      <button onClick={handlePostUser}>Add User</button>
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
              users.data.map(user => (
                <tr key={user.id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.username}</td>
                  <td><button onClick={() => seeRoles(user)}>See Roles</button></td>
                  <td>{!user.accountNonExpired ? "True" : "False" }</td>
                  <td>{!user.accountNonLocked ? "True" : "False"}</td>
                  <td>{timeFormatter(user.createdAt)}</td>
                  <td>{user.updatedAt ? timeFormatter(user.updatedAt) : "Never Updated"}</td>
                  <td><button onClick={() => handleEditUser(user)}>Edit</button></td>
                  <td><button onClick={() => handleDeleteUser(user.id)}>Delete</button></td>
                </tr>
            )) 
          }
        </tbody>
      </table>
    </>
  )
}
