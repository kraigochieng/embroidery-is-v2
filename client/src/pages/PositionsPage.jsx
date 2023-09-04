// React
import React, {  useEffect, useState } from 'react'
// React Router
import { Link, useLocation } from 'react-router-dom'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { putPosition, deletePosition, postPosition, getPositions, deletePositions } from '../features/positions/positionsSlice'
// Ant Design
import { Form, Input, Table, Space, Button, Popconfirm, Modal, message, Tooltip } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined, LoadingOutlined, CloseOutlined, SendOutlined } from '@ant-design/icons'
// Utitlies
import column from '../utils/column'
import messageTemplate from '../utils/messageTemplate'

import { useParams } from 'react-router-dom'

export default function PositionsPage() {
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [positionIdToEdit, setPositionIdToEdit] = useState('')
    const [isAddPositionModalOpen, setIsAddPositionModalOpen] = useState(false) // Add Position Modal
    const [isEditPositionModalOpen, setIsEditPositionModalOpen] = useState(false) // Edit Position Modal
    const [addPositionForm] = Form.useForm()
    const [editPositionForm] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage()

    // Params
    const { itemId } = useParams()

    // Dispatch
    const dispatch = useDispatch()
    const positions = useSelector(state => state.positions)

    const location = useLocation()
    const item = location.state

    useEffect(() =>  {
        dispatch(getPositions(itemId))
    }, [])


    // Modal Logic
    function handleAddPositionModalOpen() {
        setIsAddPositionModalOpen(true)
    }

    function handleAddPositionModalCancel() {
        setIsAddPositionModalOpen(false)
    }

    function handleEditPositionModalOpen() {
        setIsEditPositionModalOpen(true)
    }

    function handleEditPositionModalCancel() {
        setIsEditPositionModalOpen(false)
    }

    // Form Validation
    function isUnique(_, value) {
        console.log(value)
        if(positions.data.map(position => position.name.toLowerCase()).includes(value.toLowerCase())) {
            return Promise.reject(new Error("Position name already exists"))
        } else {
            return Promise.resolve()
        }

    }
    const positionNameRules = [
        {required: true, message: 'Please enter position name'},
        {validator: isUnique}
    ]

    // Messages
    const addPositionSuccess = () => messageApi.open(messageTemplate('success', 'Position Added Succesfully'))
    const editPositionSuccess = ()  => messageApi.open(messageTemplate('success', 'Position Edited Successfully'))
    const deletePositionSuccess = () => messageApi.open(messageTemplate('success', 'Position(s) Deleted Successfully'))
    
    // Table
    /// Convert data into proper column definitions
    /// Column Definitions
    const nameColumn = column('Name', 'name', 'name')
    nameColumn['sorter'] = (a,b) => a.name.localeCompare(b.name)

    const actionsColumn = column('', 'actions', 'actions')
    actionsColumn['render'] = (text, record) => {
        return (
            <Space>
                <Tooltip title='Edit' placement='top'>
                    <Button icon={<EditOutlined />} onMouseUp={() => handleEditPosition(record)}/>
                </Tooltip>
                <Tooltip title='Delete' placement='top'>
                    <Popconfirm
                        title={`Delete position ${record.name}`}
                        description="Are you sure?"
                        onConfirm={(event) => handleDeletePosition(event, record.id)}
                        onCancel={null}
                        okText='Yes'
                        cancelText='No'
                        placement='bottom'
                    >
                        <Button icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Tooltip>
            </Space>
        )
    }

    const positionTableColumns = [
        nameColumn,
        actionsColumn
    ]

    // Table Config
    const rowSelection = {
        onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys)
        }
    }

    // Table Events
    function handleEditPosition(record) {
        setPositionIdToEdit(record.id)
        const initialValues = {
            name: record.name
        }
        editPositionForm.setFieldsValue(initialValues) // Set previous values
        handleEditPositionModalOpen() // Open Modal
        console.log(record)
    }

    function handleDeletePosition(event, positionId) {
        dispatch(deletePosition(positionId))
        deletePositionSuccess()
    }


    // Form Submissions
    function handleAddPositionFormFinish(values) {
        dispatch(postPosition({
            position: values,
            itemId: item.id
        })) // send values
        setIsAddPositionModalOpen(false)// close modal
        addPositionSuccess()// show message
    }

    function handleEditPositionFormFinish(values) {
        const body = {
            position: values,
            positionId: positionIdToEdit
        }

        dispatch(putPosition(body)) // send values
        setIsEditPositionModalOpen(false)// close modal
        editPositionSuccess()// show message
        editPositionForm.resetFields()
    }

    function handleDeleteMany(event) {
        console.log(selectedRowKeys)
        // const body = {
        //     itemId: item.id,
        //     positionIds: selectedRowKeys
        // }
        // console.log(body)
        dispatch(deletePositions(selectedRowKeys)) // send event
        setSelectedRowKeys([])
        
    }
    return (
        <>
            {contextHolder}
            <Link to="/admin/store/items">Back To Items</Link>
            <Button  onMouseUp={handleAddPositionModalOpen} icon={<PlusOutlined />}>Add Position</Button>
            <p>{item.name}</p>
            <Modal
                title={`Add Position for ${location.state.name}`}
                open={isAddPositionModalOpen}
                footer={[
                    <Button key='cancel' onMouseUp={handleAddPositionModalCancel} icon={<CloseOutlined />}>Cancel</Button>
                ]}
                onCancel={handleAddPositionModalCancel}
            >
                <Form
                    name='addPosition'
                    form={addPositionForm}
                    onFinish={handleAddPositionFormFinish}
                >
                    <Space.Compact>
                        <Form.Item name='name' rules={[...positionNameRules]}>
                            <Input placeholder='Position Name'/>
                        </Form.Item>
                        <Button htmlType='submit' icon={<SendOutlined />}>Submit</Button>
                    </Space.Compact>
                </Form>
            </Modal>
            {
                selectedRowKeys.length > 0 &&
                <Popconfirm
                    title="Delete Position(s)"
                    description="Are you sure?"
                    onConfirm={(event) => handleDeleteMany(event)}
                    onCancel={null}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button icon={<DeleteOutlined />}>Delete Many</Button>
                </Popconfirm>
            }
            {
                positions.loading ?
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
                    columns={positionTableColumns}
                    dataSource={positions.data}
                    size='small'
                />
            }
            <Modal
                title={`Edit position for item ${item.name}`}
                open={isEditPositionModalOpen}
                onCancel={handleEditPositionModalCancel}
                footer={[
                    <Button key='cancel' icon={<CloseOutlined />} onMouseUp={handleEditPositionModalCancel}>Cancel</Button>
                ]}
            >
                <Form
                    name='editPosition'
                    form={editPositionForm}
                    onFinish={handleEditPositionFormFinish}
                >
                    <Space.Compact block>
                        <Form.Item name='name' rules={[...positionNameRules]}>
                            <Input placeholder='Position Name' />
                        </Form.Item>
                        <Button icon={<SendOutlined />} htmlType='submit'>Submit</Button>
                    </Space.Compact>
                </Form>
            </Modal>
        </>
    )
}
