// React
import React, {  useEffect, useState } from 'react'
// React Router
import { Link } from 'react-router-dom'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { putItem, deleteItem, postItem, getItems, deleteItems } from '../features/items/itemsSlice'
// Ant Design
import { Form, Input, Table, Space, Button, Popconfirm, Modal, message, Tooltip } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons'

// Utitlies
import column from '../utils/column'
import messageTemplate from '../utils/messageTemplate'

export default function ItemsPage() {
    // State
    const [selectedRowKeys, setSelectedRowKeys] = useState([]) //  To maintain the selected rows keys
    const [itemToEditId, setItemToEditId] = useState('')
    const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false) // Add Item Modal
    const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false) // Edit Item Modal
    const [addItemForm] = Form.useForm()
    const [editItemForm] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage()

    // Dispatch
    const dispatch = useDispatch()
    const items = useSelector(state => state.items)
    useEffect(() =>  {
        dispatch(getItems()) }
    , [])

    // Modal Logic
    const handleAddItemModalOpen = () => setIsAddItemModalOpen(true)
    function handleAddItemModalCancel() {
        setIsAddItemModalOpen(false)
        addItemForm.resetFields()
    }
    const handleEditItemModalOpen = () => setIsEditItemModalOpen(true)
    const handleEditItemModalCancel = () => setIsEditItemModalOpen(false)
    
    // Messages
    const addItemSuccess = () => messageApi.open(messageTemplate('success', 'Item Added Succesfully'))
    const editItemSuccess = ()  => messageApi.open(messageTemplate('success', 'Item Edited Successfully'))
    const deleteItemSuccess = () => messageApi.open(messageTemplate('success', 'Item(s) Deleted Successfully'))

    // Form
    /// Form Validation
    function isUnique(_, value) {
        if(items.data.map(item => item.name.toLowerCase()).includes(value)) {
            return Promise.reject(new Error('Item name Already Exists'))
        } else {
            return Promise.resolve()
        }
    }

    const itemNameRules = [
        { required: true, message: 'Please enter item name'},
        { validator: isUnique}
    ]

    /// Form Submissions
    function handleAddItemFinish(values) {
        dispatch(postItem(values)) // This is the actual posting
        setIsAddItemModalOpen(false) // Close Modal
        addItemSuccess() // Show message
        addItemForm.resetFields()// Reset Form
    }

    function handleEditItemFinish(values) {
        const body = {
            id: itemToEditId,
            item: values // get other values
        }
        dispatch(putItem(body)) // actual async response
        setIsEditItemModalOpen(false)// Close Modal
        editItemSuccess() // Show Message
        editItemForm.resetFields() // Reset Form
    }

    // Table
    /// Column Definitions
    const nameColumn = column('Name', 'name', 'name')
    nameColumn['sorter'] = (a,b) => a.name.localeCompare(b.name)
    nameColumn['render'] = (text, record) => <Link to={`/admin/store/items/${record.id}/positions`} state={record}>{text}</Link>
    const actionsColumn = {
        title: '',
        key: 'actions',
        render: (text, record) => {
            return (
                <Space>
                    <Tooltip title='Edit' placement='top'>
                        <Button  onMouseUp={() => handleEditItem(record)} icon={<EditOutlined />} />
                    </Tooltip>
                    <Tooltip title="Delete" placement='top'>
                        <Popconfirm
                            title={`Delete Item ${record.name}`}
                            description='Are you sure?'
                            onConfirm={(event) => handleDeleteItem(event, record.id)}
                            onCancel={null}
                            okText='Yes'
                            cancelText='No'
                            placement='bottom'
                        >
                            <Button danger icon={<DeleteOutlined />} />
                        </Popconfirm>
                    </Tooltip>  
                </Space>
            )
        }
    }

    const itemTableColumns = [
        nameColumn,
        actionsColumn
    ]

    // Table Config
    const rowSelection = {
        onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys)
        }
    }

    // Table events
    function handleDeleteItem(event, id) {
        dispatch(deleteItem(id))
        deleteItemSuccess() // show message
    }

    function handleEditItem(record) {
        const initialValues = {
            name: record.name
        }

        editItemForm.setFieldsValue(initialValues)
        handleEditItemModalOpen()
        setItemToEditId(record.id) // Store ID temporarily
    }

    // Handling Delete
    function handleDeleteItems(event) {
        const itemsIdsObject = {
            ids: selectedRowKeys
        }
        dispatch(deleteItems(itemsIdsObject)) // Delete Colours
        deleteItemSuccess() // Show Message
        setSelectedRowKeys([]) // clear the array since it doesn't clear itself
    }
    return (
    <>
        {contextHolder}
        <Button icon={<PlusOutlined />} onMouseUp={handleAddItemModalOpen}>Add Item</Button>
        {/* Modal: Add Item */}
        <Modal
            title='Add Item'
            open={isAddItemModalOpen}
            onCancel={handleAddItemModalCancel}
            footer={[
                <Button key='cancel' onMouseUp={handleAddItemModalCancel}>Cancel</Button>
            ]}
        >
            {/* Form: Add Item */}
            <Form form={addItemForm} onFinish={handleAddItemFinish} name='addItemForm'>
                <Space.Compact>
                    <Form.Item name='name' rules={[...itemNameRules]}>
                        <Input placeholder='Item Name'/>
                    </Form.Item>
                    <Button htmlType='submit'>Submit</Button>
                </Space.Compact>
            </Form>
        </Modal>
        {/* Table: Item Table */}
        {
            selectedRowKeys.length > 0 &&
            <Popconfirm
                title='Delete Items(s)'
                description='Are you sure?'
                onConfirm={(event) => handleDeleteItems(event)}
                onCancel={null}
                okText='Yes'
                cancelText='No'
            >
                <Button icon={<DeleteOutlined />}>Delete Many</Button>
            </Popconfirm>
        }
         {
            items.loading ?
            <Space direction='vertical' style={{display: 'block'}} >
                <LoadingOutlined/>
                <p>Loading...</p>
            </Space> :
            <Table
                rowKey={(record) => record.id}
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection
                }}
                columns={itemTableColumns}
                dataSource={items.data}
                size='small'
            />
        }
        {/* Modal: Edit Item */}
        <Modal
            title='Edit Item'
            open={isEditItemModalOpen}
            onCancel={handleEditItemModalCancel}
            footer={[
                <Button key='cancel' onMouseUp={handleEditItemModalCancel}>Cancel</Button>
            ]}
        >
            {/* Form: Edit Item */}
            <Form form={editItemForm} onFinish={handleEditItemFinish} name='editItemForm'>
                <Space.Compact>
                    <Form.Item name='name' rules={[...itemNameRules]}>
                        <Input placeholder='Item Name'/>
                    </Form.Item>
                    <Button htmlType='submit'>Submit</Button>
                </Space.Compact>
            </Form>
        </Modal>
    </>
    )
}
