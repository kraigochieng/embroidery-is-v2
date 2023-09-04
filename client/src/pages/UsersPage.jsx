import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../features/users/usersSlice'
import column from '../utils/column'
import { admin } from '../axiosInstances'

import { Table, Button, Popconfirm, Tooltip, Space } from 'antd'

import { DeleteOutlined, EyeOutlined, EditOutlined} from '@ant-design/icons'
import UsersTable from '../components/tables/UsersTable'
import UserDetailsView from '../components/views/UserDetailsView'

export default function UsersPage() {
  // State
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  const [userDetails, setUserDetails] = useState({
    id: '',
        firstName: '',
        lastName: '',
        username: '',
        roles: [],
        isAccountNonExpired: false,
        isAccountNonLocked: false,
        isCredentialsNonExpired:false,
        isEnabled: false,
        createdAt: '',
        updatedAt: '',
  }) 
  
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false)

  // Dispatch
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  useEffect(() => {
    dispatch(getUsers())
  }, [])


  // Async calls
  async function getUserDetails(id) {
    let response = await admin.get(`users/${id}`)
    return response.data
  }

  /// Table Events
  function handleEditUser(record) {
    console.log(record)
  }

  function handleDeleteUser(event, id) {
    console.log(record)
  }

  function handleViewUser(record) {
    // Get user
    getUserDetails(record.id)
      .then(user => {
        setUserDetails(user)
        setIsUserDetailsOpen(true)
      })
      .catch(error => console.error(error))
  }

  function handleUserDetailsCancel() {
    setIsUserDetailsOpen(false)
  }

  return (
    <>
      <UsersTable
        users={users.data}
        handleEditUser={(record) => handleEditUser(record)}
        handleViewUser={handleViewUser}
        handleDeleteUser={(event, id) =>  handleDeleteUser(event, id)}
      />

      <UserDetailsView
        userDetails={userDetails}
        open={isUserDetailsOpen}
        handleCancel={handleUserDetailsCancel}
      />

    </>
  )
}
