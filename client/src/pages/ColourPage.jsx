// React Imports
import React, { useEffect, useState } from 'react'

// Asynchornous functions
import { deleteColour, deleteColours, getColours, postColour, putColour } from '../features/colours/coloursSlice'
// Redux
import { useDispatch, useSelector } from 'react-redux'
// Ant Design
import { Form, Space, Input, Table, Modal, Button, message, Popconfirm, Spin, Tooltip } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons'
// Utilities
import column from '../utils/column'
import messageTemplate from '../utils/messageTemplate'
import Icon from '@ant-design/icons/lib/components/Icon'

export default function ColourPage() {
    // State
    const [isAddColourModalOpen, setIsAddColourModalOpen] = useState(false) // Add Colour Modal Boolean
    const [isEditColourModalOpen, setIsEditColourModalOpen] = useState(false) // Edit Colour Modal Boolean
    const [messageApi, contextHolder] = message.useMessage() // For messages
    const [addColourForm] = Form.useForm() // To clear data after submit
    const [editColourForm] = Form.useForm() // To clear data after submit
    const [selectedRowKeys, setSelectedRowKeys] = useState([]) // To extract selectedRows freom rowSelection to state
    const [colourToEditId, setColourToEditId] = useState('')

    // Dispatch
    const dispatch = useDispatch()
    const colours = useSelector(state => state.colours)
    useEffect(() => {
        dispatch(getColours())
    }, [])

    // Modals Opening and Closing Logic
    const handleAddColourModalOpen = () => setIsAddColourModalOpen(true)
    const handleAddColourModalCancel = () => {
        setIsAddColourModalOpen(false)
        addColourForm.resetFields()
    }
    const handleEditColourModalOpen =() => setIsEditColourModalOpen(true)
    const handleEditColourModalCancel = () => setIsEditColourModalOpen(false)

    // Custom Form Validation
    function isUnique(_, value) {
        if(colours.data.map(colour => colour.name.toLowerCase()).includes(value.toLowerCase())) {
            return Promise.reject(new Error("Colour name already exists"))
        } else {
            return Promise.resolve()
        }
    }

    const colourNameRules = [
        { required: true, message: 'Please enter colour name' },
        { validator: isUnique }
    ]

    // Messages
    const addColourSuccess = () => messageApi.open(messageTemplate('success', 'Colour Added Succesfully'))
    const editColourSuccess = () => messageApi.open(messageTemplate('success', 'Colour Edited Successfully'))
    const deleteColourSuccess = () => messageApi.open(messageTemplate('success', 'Colour(s) Deleted Successfully'))

    // Form Submissions
    function handleAddItemFinish(values) {
        dispatch(postColour(values)) // Actually post the colour
        setIsAddColourModalOpen(false) // Close Modal
        addColourSuccess() // Show Message
        addColourForm.resetFields() // Reset Form
    }

    function handlEditColourFinish(values) {
        const body = {
            id: colourToEditId,
            colour: values
        }
        dispatch(putColour(body))
        setIsEditColourModalOpen(false) // Close Modal
        editColourSuccess() // Show Message
        editColourForm.resetFields() // Reset Form
    }

    // Form Setups
    function handleEditColour(record) {
        setColourToEditId(record.id) // Store id
        // Get former name
        const initialValues = {
            name: record.name
        }
        editColourForm.setFieldsValue(initialValues) // Set form with name selected
        handleEditColourModalOpen() // Open Modal
    }

    function handleDeleteColour(event, id) {
        dispatch(deleteColour(id))
        deleteColourSuccess()
    }

    // Table
    // Column Definitions
    // Setting headers and names
    const nameColumn = column('Name', 'name', 'name')
    // Sorting for coumns
    nameColumn['sorter'] = (a, b) => a.name.localeCompare(b.name)

    // Creating actions column for edit, delete buttons
    const actionsColumn = {
        title: '',
        key: 'actions',
        render: (text, record) => {
            return (
                <>
                    <Space>
                        <Tooltip title="Edit" placement='top'>
                            <Button onMouseUp={() => handleEditColour(record)} icon={<EditOutlined />} />
                        </Tooltip>
                        <Tooltip title="Delete" placement='top'>
                        <Popconfirm
                            title={`Delete Colour ${record.name}`}
                            description='Are you sure?'
                            onConfirm={(event) => handleDeleteColour(event, record.id)}
                            onCancel={null}
                            okText='Yes'
                            cancelText='No'
                            placement='bottom'
                        >
                            <Button danger icon={<DeleteOutlined />} />       
                        </Popconfirm>
                        </Tooltip>
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
        deleteColourSuccess() // Show Message
        setSelectedRowKeys([]) // clear the array since it doesn't clear itself
    }
    
    return (
        <>
            {contextHolder}
            {/* Button: Add Colour */}
            <Button icon={<PlusOutlined />} onMouseUp={handleAddColourModalOpen}>Add Colour</Button>
            {/* Modal: Add Colour */}
            <Modal
                title='Add Colour'
                open={isAddColourModalOpen}
                onCancel={handleAddColourModalCancel}
                footer={[
                    <Button key='cancel' onMouseUp={handleAddColourModalCancel}>Cancel</Button>
                ]}
            >
                {/* Form: Add Colour*/}
                <Form form={addColourForm} onFinish={handleAddItemFinish} name='addColourForm' >
                    <Space.Compact block>
                        <Form.Item name="name" rules={[...colourNameRules]}>
                            <Input placeholder='Colour Name'/>
                        </Form.Item>
                        <Button type='primary' htmlType='submit'>Submit</Button>
                    </Space.Compact>
                </Form>
            </Modal>
            {/* Button: Delete Many */}
            {
                selectedRowKeys.length > 0 &&
                <Popconfirm
                    title='Delete Colour(s)'
                    description='Are you sure?'
                    onConfirm={handleDeleteColours}
                    onCancel={null}
                    okText='Yes'
                    cancelText='No'
                >
                    <Button icon={<DeleteOutlined />}>Delete Many</Button>
                </Popconfirm>
            }
            {/* Table: Colour */}
            {
                colours.loading ?
                <Space direction='vertical' style={{display: 'block'}} >
                    <LoadingOutlined/>
                    <p>Loading...</p>
                </Space> :
                <Table
                    rowKey={record => record.id}
                    rowSelection={
                        { type: 'checkbox', ...rowSelection }
                    } 
                    dataSource={colours.data}
                    columns={colourTableColumns} 
                    size='small'
                />
            }
            {/* Modal: Edit Colours */}
            <Modal
                title='Edit Colour'
                open={isEditColourModalOpen}
                onCancel={handleEditColourModalCancel}
                footer={[
                    <Button key='cancel' onMouseUp={handleEditColourModalCancel}>Cancel</Button>
                ]}
            >  
                {/* Form: Edit Colour */}
                <Form form={editColourForm} onFinish={handlEditColourFinish} name='editColourForm'>
                    <Space.Compact block>
                        <Form.Item name="name" rules={[...colourNameRules]}>
                            <Input placeholder='Colour Name'/>
                        </Form.Item>
                        <Button type='primary' htmlType='submit'>Submit</Button>
                    </Space.Compact>
                </Form>
            </Modal>
        </>
    )
}
