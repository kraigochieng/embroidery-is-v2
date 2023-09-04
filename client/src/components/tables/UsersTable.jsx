import React, {useState} from 'react'
import { Space, Table, Button } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import TableDeleteButton from '../buttons/TableDeleteButton'
import TableEditButton from '../buttons/TableEditButton'
import column from '../../utils/column'
import { admin } from '../../axiosInstances'
export default function UsersTable(props) {
    const {users, handleViewUser, handleEditUser, handleDeleteUser} = props
      // State
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [user, setUser] = useState({
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

    
    
  // Async calls
  async function getUser(id) {
    let response = await admin.get(`users/${id}`)
    return response.data
  }

  // Table
  /// Column Definition
  const firstNameColumn = column('First Name', 'firstName', 'firstName')
  firstNameColumn['sorter'] = (a,b) => a.firstName.localeCompare(b.firstName)

  const usernameColumn = column('Username', 'username', 'username')
  usernameColumn['sorter'] = (a,b) => a.username.localeCompare(b.username)

  const lastNameColumn = column('Last Name', 'lastName', 'lastName')
  lastNameColumn['sorter'] = (a,b) => a.lastName.localeCompare(b.lastName)

  /// Row config
  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys)
    }
  }

  /// Table Events
  // function handleEditUser(record) {
  //   console.log(record)
  // }

  // function handleDeleteUser(event, id) {
  //   console.log(record)
  // }

  // function handleViewUser(record) {
  //   // Get user
  //   getUser(record.id)
  //     .then(user => {
  //       setUser(user)
  //       console.log(user)
  //     })
  //     .catch(error => console.error(error))

      
  // }

  const actionsColumn = {
    title: '',
    key: 'actions',
    render: (text, record) => {
        return (
            <>
                <Space>
                    <Button onMouseUp={() => handleViewUser(record)} icon={<EyeOutlined />}/>
                    <TableEditButton record={record} handleEdit={() => handleEditUser(record)}/>
                    <TableDeleteButton record={record} handleDelete={(event) => handleDeleteUser(event, record.id)}/>
                </Space>
            </>
        )
    }
}
  const usersTableColumns = [
    usernameColumn,
    firstNameColumn,
    lastNameColumn,
    actionsColumn
  ]

  return (
    <>
        <Table
            rowKey={record => record.id}
            rowSelection={
                { type: 'checkbox', ...rowSelection}
            }
            dataSource={users}
            columns={usersTableColumns}
            size='small'
        />
    </>
  )
}
