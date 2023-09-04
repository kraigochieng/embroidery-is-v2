// React Imports
import React, { useEffect, useState } from 'react'
// Asynchronous functions
import { deleteColour, deleteColours, getColours, postColour, putColour } from '../features/colours/coloursSlice'
// Redux
import { useDispatch, useSelector } from 'react-redux'
// Ant Design
import { Form, Space, Input, Table, Modal, Button, message, Popconfirm, Spin, Tooltip } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons'
// Utilities
import messageTemplate from '../utils/messageTemplate'
import ColourForm from '../components/forms/ColourForm'
import ColoursTable from '../components/tables/ColoursTable'
import Loading from '../components/Loading'
import TableAddButton from '../components/buttons/TableAddButton'

export default function ColoursPage() {
    // State
    /// Modals
    const [isAddColourModalOpen, setIsAddColourModalOpen] = useState(false)
    const [isEditColourModalOpen, setIsEditColourModalOpen] = useState(false)
    /// Forms
    const [addColourForm] = Form.useForm() // To clear data after submit
    const [editColourForm] = Form.useForm() // To clear data after submit
    // For messages
    const [messageApi, contextHolder] = message.useMessage()
    const [colourToEditId, setColourToEditId] = useState('')
    // Dispatch
    const dispatch = useDispatch()
    const colours = useSelector(state => state.colours)
    useEffect(() => {
        dispatch(getColours())
    }, [])

    // Messages
    const addColourSuccess = () => messageApi.open(messageTemplate('success', 'Colour Added Succesfully'))
    const editColourSuccess = () => messageApi.open(messageTemplate('success', 'Colour Edited Successfully'))
    const deleteColourSuccess = () => messageApi.open(messageTemplate('success', 'Colour(s) Deleted Successfully'))


    // Modal Cancels
    function handleEditColourModalCancel() {
        setIsEditColourModalOpen(false)
        editColourForm.resetFields()
    }

    function handleAddColourModalCancel() {
        setIsAddColourModalOpen(false)
        addColourForm.resetFields()
    }

    // Form
    /// Form Setups
    function handleAddColour() {
        setIsAddColourModalOpen(true)
    }

    function handleEditColour(record) {
        const initialValues = {
            name: record.name
        }
        editColourForm.setFieldsValue(initialValues)
        setColourToEditId(record.id)
        setIsEditColourModalOpen(true)
    }

    /// Form Submissions
    function handleAddColourFinish(values) {
        setIsAddColourModalOpen(false) // Close Modal
        dispatch(postColour(values)) // Actually post the colour
        addColourSuccess() // Show Message
        addColourForm.resetFields() // Reset Form
    }

    function handleEditColourFinish(values) {
        setIsEditColourModalOpen(false) // Close Modal
        const body = {
            id: colourToEditId,
            colour: values
        }
        dispatch(putColour(body))
        editColourSuccess() // Show Message
        editColourForm.resetFields() // Reset Form
    }

    // Table Events
    function handleDeleteColour(event, id) {
        dispatch(deleteColour(id))
        deleteColourSuccess()
    }


    
    return (
        <>
            {contextHolder}
            {/* Button: Add Colour */}
            <TableAddButton
                text='Add Colour'
                handleAdd={handleAddColour}
            />
            {/* Post Form */}
            <ColourForm 
                method='POST'
                form={addColourForm}
                colours={colours.data}
                isModalOpen={isAddColourModalOpen}
                handleCancel={handleAddColourModalCancel}
                handleFinish={handleAddColourFinish}
            />
            {/* Put Form */}
            <ColourForm 
                method='PUT'
                form={editColourForm}
                colours={colours.data}
                isModalOpen={isEditColourModalOpen}
                handleCancel={handleEditColourModalCancel}
                handleFinish={handleEditColourFinish}
            />
            
            {/* Button: Delete Many */}
            
            {/* Table: Colour */}
            {
                colours.loading ?
                <Loading /> :
                <ColoursTable
                    handleEditColour={(record) => handleEditColour(record)}
                    handleDeleteColour={(event, id) => handleDeleteColour(event, id)}
                    colours={colours.data}
                    messageApi={messageApi} // for messages, this is passed as props so as not to have two conet
                />
        }
        </>
    )
}
