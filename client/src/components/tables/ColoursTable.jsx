import React, { useState } from 'react'
import column from '../../utils/column'
import { Space, Table, message } from 'antd'
import TableEditButton from '../buttons/TableEditButton'
import TableDeleteButton from '../buttons/TableDeleteButton'
import TableDeleteManyButton from '../buttons/TableDeleteManyButton'
import { useDispatch } from 'react-redux'
import { deleteColours } from '../../features/colours/coloursSlice'
import messageTemplate from '../../utils/messageTemplate'

export default function ColoursTable(props) {
    const { handleEditColour, handleDeleteColour, colours, messageApi } = props

    const [selectedRowKeys, setSelectedRowKeys] = useState([])

    // Dispatch
    const dispatch = useDispatch()

    // messages
    const deleteColourSuccess = () => messageApi.open(messageTemplate('success', 'Colour(s) Deleted Successfully'))

    // Column Initialization
    const nameColumn = column('Name', 'name', 'name')

    // Sorting for columns
    nameColumn['sorter'] = (a, b) => a.name.localeCompare(b.name)

    // Creating actions column for edit, delete buttons
    const actionsColumn = {
        title: '',
        key: 'actions',
        render: (text, record) => {
            return (
                <>
                    <Space>
                        <TableEditButton record={record} handleEdit={() => handleEditColour(record)}/>
                        <TableDeleteButton record={record} handleDelete={(event, id) => handleDeleteColour(event, id)}/>
                    </Space>
                </>
            )
        }
    }

    // Config for rows
    const rowSelection = {
        onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys) // Set IDs to be in a state
        }
    }

    // Putting all columns to one array
    const colourTableColumns = [
        nameColumn,
        actionsColumn,
    ]

    // Handling Delete
    function handleDeleteColours(event) {
        dispatch(deleteColours(selectedRowKeys)) // Delete Colours
        console.log('deleting many')
        deleteColourSuccess() // Show Message
        setSelectedRowKeys([]) // clear the array since it doesn't clear itself
    }


    return (
        <>
        {
            selectedRowKeys.length > 0 &&
            <TableDeleteManyButton handleDeleteMany={(event) => handleDeleteColours(event)} />
        }
            <Table
                rowKey={record => record.id}
                rowSelection={
                    { type: 'checkbox', ...rowSelection }
                } 
                dataSource={colours}
                columns={colourTableColumns} 
                size='small'
            />
        </>
        
    )
}
