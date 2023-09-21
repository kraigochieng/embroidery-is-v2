import { useColoursContext } from "../contexts/ColoursContext"
import ColourForm from "../components/forms/ColourForm"
import { Form, message } from "antd"
import React, { useState, useEffect } from "react"
import { MessageTemplateType } from "../enums/MessageTemplateType"
import messageTemplate from "../utils/messageTemplate"
import { HttpMethod } from "../enums/HttpMethod"
import TableAddButton from "../components/buttons/TableAddButton"
import { ActionType } from "../enums/ActionType"
import { admin } from "../axiosInstances"
import ColoursTable from "../components/tables/ColoursTable"
import Loading from "../components/Loading"
import { Colour, ColourFormData } from "../types/colours"

export default function ColoursPage() {
  const { coloursState, coloursDispatch } = useColoursContext()

  useEffect(() => {
    coloursDispatch({type: ActionType.REQUEST})
    admin.get("colours")
      .then(response => {
        console.log(response.data)
        coloursDispatch({type: ActionType.GET, colours: response.data})
      })
      .catch(error => {
        console.error(error)
        coloursDispatch({type: ActionType.FAILURE, error: error.message})
      })
  }, [])

  /// Modals
  const [isAddColourModalOpen, setIsAddColourModalOpen] = useState(false)
  const [isEditColourModalOpen, setIsEditColourModalOpen] = useState(false)
  /// Forms
  const [addColourForm] = Form.useForm() // To clear data after submit
  const [editColourForm] = Form.useForm() // To clear data after submit
  // For messages
  const [messageApi, contextHolder] = message.useMessage()
  const [colourToEditId, setColourToEditId] = useState<string>('')
  
  // Messages
  const addColourSuccess = () => messageApi.open(messageTemplate(MessageTemplateType.SUCCESS, 'Colour Added Succesfully'))
  const editColourSuccess = () => messageApi.open(messageTemplate(MessageTemplateType.SUCCESS, 'Colour Edited Successfully'))
  const deleteColourSuccess = () => messageApi.open(messageTemplate(MessageTemplateType.SUCCESS, 'Colour(s) Deleted Successfully'))
  
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

  function handleEditColour(record: Colour) {
    const initialValues = {
        name: record.name
    }
    editColourForm.setFieldsValue(initialValues)
    setColourToEditId(record.id)
    setIsEditColourModalOpen(true)
  }

  function handleDeleteColour(event: React.MouseEvent<HTMLButtonElement>, id: string) {
    console.log(id)
    coloursDispatch({type: ActionType.REQUEST})
    admin.delete(`colours/${id}`)
    .then(response => {
      console.log(response.data)
      coloursDispatch({type: ActionType.DELETE, id: id})
    })
    .catch(error => {
      coloursDispatch({type: ActionType.FAILURE, error: error.message})
    })
    deleteColourSuccess()
  }
    /// Form Submissions
  function handleAddColourFinish(values: ColourFormData) {
    setIsAddColourModalOpen(false) // Close Modal

    coloursDispatch({type: ActionType.REQUEST})
    console.log(values)

    admin.post('colours', values)
      .then(response => {
        console.log(response.data)
        coloursDispatch({type: ActionType.POST, colour: response.data})
      })
      .catch(error => {
        coloursDispatch({type: ActionType.FAILURE, error: error.message})
      })

    addColourSuccess() // Show Message
    addColourForm.resetFields() // Reset Form
  }

  function handleEditColourFinish(values: ColourFormData) {
      setIsEditColourModalOpen(false) // Close Modal

      coloursDispatch({type: ActionType.REQUEST})

      admin.put(`colours/${colourToEditId}`, values)
        .then(response => {
          coloursDispatch({type: ActionType.PUT, colour: response.data, id: colourToEditId})
        })
        .catch(error => {
          coloursDispatch({type: ActionType.FAILURE, error: error.message})
        })

      editColourSuccess() // Show Message
      editColourForm.resetFields() // Reset Form
  }
  return (
    
    <>
      {contextHolder}
      <TableAddButton text="Add Colour" handleAdd={handleAddColour}/>
      {/* Post Form */}
      <ColourForm 
        method={HttpMethod.POST}
        form={addColourForm}
        colours={coloursState.data}
        isModalOpen={isAddColourModalOpen}
        handleCancel={handleAddColourModalCancel}
        handleFinish={handleAddColourFinish}
      />
      {/* Put Form */}
      <ColourForm 
        method={HttpMethod.PUT}
        form={editColourForm}
        colours={coloursState.data}
        isModalOpen={isEditColourModalOpen}
        handleCancel={handleEditColourModalCancel}
        handleFinish={handleEditColourFinish}
      />
      {/* Table: Colour */}
      {
        coloursState.loading ?
        <Loading /> :
        <ColoursTable
            handleEditColour={(record: Colour) => handleEditColour(record)}
            handleDeleteColour={(event: React.MouseEvent<HTMLButtonElement>, id: string) => handleDeleteColour(event, id)}
            colours={coloursState.data}
            messageApi={messageApi} // for messages, this is passed as props so as not to have two conet
        />
        }
    </>

  )
}
