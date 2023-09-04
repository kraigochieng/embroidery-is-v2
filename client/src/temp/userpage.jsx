import React, { useEffect, useRef, useState } from 'react'
import { admin } from '../axiosInstances'
import { deleteUser, getUsers, postUser } from '../features/users/usersSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getRoles } from '../features/roles/rolesSlice'
import { stringify } from 'postcss'
export default function UsersPage() {
  const dispatch = useDispatch()

  const users = useSelector(state => state.users)
  const roles = useSelector(state => state.roles)

  useEffect(() => {
    dispatch(getUsers())
    dispatch(getRoles())    
  }, [])

  // // This use effect ensures that roles.data has been populated
  // useEffect(() => {
  //   console.log(roles.data)
  //   roles.data.map(role => {
  //     setUserFormData(prevUserFormData => ({
  //       ...prevUserFormData,
  //       [role.name]: false,
  //     }))
  //   })
  // }, [roles.data])


  const roleDialog = useRef(null)
  const userDialog = useRef(null)

  const [method, setMethod] = useState("")

  const [userFormData, setUserFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    enabled: false,
    accountNonExpired: false,
    accountNonLocked: false,
    createdAt: "",
    updatedAt: "",
    credentialsNonExpired: ""
  })

  function handleUserFormChange(event) {
    const {name, value, type, checked} = event.target
    setUserFormData(prevUser => ({
      ...prevUser,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  // function handleRoleChange(event) {
  //   const {checked, value} = event.target
  //   setUserFormData(prevUser => ({
  //     ...prevUser,
  //     roles: checked ? [...prevUser.roles, {id: value}] : prevUser.roles.filter(role => role.id != value)
  //   }))

  //   console.log(userFormData.roles)
  // }

  function handlePostUser() {
    setMethod("POST")
    // Set the normal userEntity details first
    setUserFormData({
      id: "",
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      enabled: false,
      accountNonExpired: false,
      accountNonLocked: false,
      createdAt: "",
      updatedAt: "",
      credentialsNonExpired: ""
    })

    // Add the roles
    roles.data.map(role => {
      setUserFormData(prevUserFormData => ({
        ...prevUserFormData,
        [role.name]: false,
      }))
    })
    userDialog.current.showModal()
  }

  function handleEditUser(userEntity) {
    setMethod("PUT")

    const newFormDataWithoutRoles = {
      id: userEntity.id,
      firstName: userEntity.firstName,
      lastName: userEntity.lastName,
      username: userEntity.username,
      enabled: userEntity.enabled,
      accountNonExpired: userEntity.accountNonExpired,
      accountNonLocked: userEntity.accountNonLocked,
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,
      credentialsNonExpired: userEntity.credentialsNonExpired
    }

    // Set userEntity form data without the roles array, maintain the roles boolean
    setUserFormData({
      ...newFormDataWithoutRoles, // Put this to put the new userEntity details overwriting the previous ones
    })

    // Reset all roles to false
    roles.data.map(role => {
      setUserFormData(prevUserFormData => ({
        ...prevUserFormData,
        [role.name]: false,
      }))
    })

    // Set the roles found to true...
    userEntity.roles.map(role => {
      setUserFormData(prevUserFormData => ({
        ...prevUserFormData,
        [role.name]: true
      }))
    })
    // for(let i = 0; i < userEntity.roles.length; i++) {
    //   setUserFormData(prevUserFormData => ({
    //     ...prevUserFormData,
    //     [userEntity.roles[i].name]: true
    //   }))
    // }

    console.log(userEntity.roles)
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
      const {password, ...userFormDataWithoutPassword} = userFormData
      dispatch(putUser(userFormDataWithoutPassword))
    }
  }

  function timeFormatter(timeStamp) {
    const [date, time] = timeStamp.split("T")
    return `${date} ${time.substring(0,8)}`
  }

  function seeRoles(userEntity) {
    setUserFormData({...userEntity})
    roleDialog.current.showModal()
  }

  return (
    <>
      {/* <dialog id="role-dialog" ref={roleDialog}>
        {
          userFormData.roles.length > 0 ?
          <div>
            <h3>Roles</h3>
            {userFormData.roles.map(role => <p key={role.id}>{role.name}</p>)}
          </div> :
          <p>No roles assigned to userEntity</p>
        }
        <button onMouseUp={() => roleDialog.current.close()}>Close</button>
      </dialog> */}

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
          {
            // Only show password field wen posting a userEntity
            method === "POST" &&
            <div>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="Password" name="password" value={userFormData.password} onChange={handleUserFormChange}/>
          </div>
          }
          

          <fieldset>
            <legend>Roles</legend>
            {
            roles.data.map(role => (
              <div key={role.id}>
                <input id={role.name} type="checkbox" name={role.name} checked={role[role.name]} onChange={handleUserFormChange}/>
                <label htmlFor={role.name} >{role.name}</label>
              </div>
            ))
            }
          </fieldset>
          <button>{method === "POST" ? "Add" : "Edit"} User</button>
        </form>
      </dialog>

      <button type="button" onMouseUp={handlePostUser}>Add User</button>
      {
        users.loading ?
        <p>Loading...</p> :
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
              users.data.map(userEntity => (
                <tr key={userEntity.id}>
                  <td>{userEntity.firstName}</td>
                  <td>{userEntity.lastName}</td>
                  <td>{userEntity.username}</td>
                  <td><button onMouseUp={() => seeRoles(userEntity)}>See Roles</button></td>
                  <td>{!userEntity.accountNonExpired ? "True" : "False" }</td>
                  <td>{!userEntity.accountNonLocked ? "True" : "False"}</td>
                  <td>{timeFormatter(userEntity.createdAt)}</td>
                  <td>{userEntity.updatedAt ? timeFormatter(userEntity.updatedAt) : "Never Updated"}</td>
                  <td><button onMouseUp={() => handleEditUser(userEntity)}>Edit</button></td>
                  <td><button onMouseUp={() => handleDeleteUser(userEntity.id)}>Delete</button></td>
                </tr>
            )) 
          }
        </tbody>
      </table>
      }

    </>
  )
}
