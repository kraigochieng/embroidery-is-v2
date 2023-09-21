import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { admin } from "../axiosInstances"
import { usePositionsContext } from "../contexts/PositionsContext"
import { ActionType } from "../enums/ActionType"
import PositionsTable from "../components/tables/PositionTable"
import { Button, Form, message } from 'antd'
import messageTemplate from "../utils/messageTemplate"
import { MessageTemplateType } from "../enums/MessageTemplateType"
import { Position, PositionFormData } from "../types/positions"
import TableAddButton from "../components/buttons/TableAddButton"
import PositionForm from "../components/forms/PositionForm"
import { HttpMethod } from "../enums/HttpMethod"
import Loading from "../components/Loading"
import { Link } from "react-router-dom"

export default function PositionsPage() {
  const { itemId } = useParams()
  const { positionsState, positionsDispatch } = usePositionsContext()

  useEffect(() => {
    positionsDispatch({type: ActionType.REQUEST})
    admin.get(`items/${itemId}/positions`)
      .then(response => positionsDispatch({type: ActionType.GET, positions: response.data}))
      .catch(error => positionsDispatch({type: ActionType.FAILURE, error: error.message}))
  }, [])

   /// Modals
   const [isAddPositionModalOpen, setIsAddPositionModalOpen] = useState(false)
   const [isEditPositionModalOpen, setIsEditPositionModalOpen] = useState(false)
   /// Forms
   const [addPositionForm] = Form.useForm() // To clear data after submit
   const [editPositionForm] = Form.useForm() // To clear data after submit
   // For messages
   const [messageApi, contextHolder] = message.useMessage()
   const [positionToEditId, setPositionToEditId] = useState<string>('')
   
   // Messages
   const addPositionSuccess = () => messageApi.open(messageTemplate(MessageTemplateType.SUCCESS, 'Position Added Succesfully'))
   const editPositionSuccess = () => messageApi.open(messageTemplate(MessageTemplateType.SUCCESS, 'Position Edited Successfully'))
   const deletePositionSuccess = () => messageApi.open(messageTemplate(MessageTemplateType.SUCCESS, 'Position(s) Deleted Successfully'))
   
   // Modal Cancels
   function handleEditPositionModalCancel() {
     setIsEditPositionModalOpen(false)
     editPositionForm.resetFields()
   }
 
   function handleAddPositionModalCancel() {
       setIsAddPositionModalOpen(false)
       addPositionForm.resetFields()
   }
 
   // Form
   /// Form Setups
   function handleAddPosition() {
     setIsAddPositionModalOpen(true)
   }
 
   function handleEditPosition(record: Position) {
     const initialValues = {
         name: record.name
     }
     editPositionForm.setFieldsValue(initialValues)
     setPositionToEditId(record.id)
     setIsEditPositionModalOpen(true)
   }
 
   function handleDeletePosition(event: React.MouseEvent<HTMLButtonElement>, id: string) {
     console.log(id)
     positionsDispatch({type: ActionType.REQUEST})
     admin.delete(`positions/${id}`)
     .then(response => {
       console.log(response.data)
       positionsDispatch({type: ActionType.DELETE, id: id})
     })
     .catch(error => {
       positionsDispatch({type: ActionType.FAILURE, error: error.message})
     })
     deletePositionSuccess()
   }
     /// Form Submissions
   function handleAddPositionFinish(values: PositionFormData) {
     setIsAddPositionModalOpen(false) // Close Modal
 
     positionsDispatch({type: ActionType.REQUEST})
     console.log(values)
 
     admin.post(`items/${itemId}/positions`, values)
       .then(response => {
         console.log(response.data)
         positionsDispatch({type: ActionType.POST, position: response.data})
       })
       .catch(error => {
         positionsDispatch({type: ActionType.FAILURE, error: error.message})
       })
 
     addPositionSuccess() // Show Message
     addPositionForm.resetFields() // Reset Form
   }
 
   function handleEditPositionFinish(values: PositionFormData) {
       setIsEditPositionModalOpen(false) // Close Modal
 
       positionsDispatch({type: ActionType.REQUEST})
 
       admin.put(`positions/${positionToEditId}`, values)
         .then(response => {
           positionsDispatch({type: ActionType.PUT, position: response.data, id: positionToEditId})
         })
         .catch(error => {
           positionsDispatch({type: ActionType.FAILURE, error: error.message})
         })
 
       editPositionSuccess() // Show Message
       editPositionForm.resetFields() // Reset Form
   }
     return (
         <>
       {contextHolder}
       <TableAddButton text="Add Position" handleAdd={handleAddPosition}/>
        <Link to="/admin/store/items">
          <Button>Back to Items</Button>
        </Link>
       {/* Post Form */}
       <PositionForm 
         method={HttpMethod.POST}
         form={addPositionForm}
         positions={positionsState.data}
         isModalOpen={isAddPositionModalOpen}
         handleCancel={handleAddPositionModalCancel}
         handleFinish={handleAddPositionFinish}
       />
       {/* Put Form */}
       <PositionForm 
         method={HttpMethod.PUT}
         form={editPositionForm}
         positions={positionsState.data}
         isModalOpen={isEditPositionModalOpen}
         handleCancel={handleEditPositionModalCancel}
         handleFinish={handleEditPositionFinish}
       />
       {/* Table: Position */}
       {
         positionsState.loading ?
         <Loading /> :
         <PositionsTable
             handleEditPosition={(record: Position) => handleEditPosition(record)}
             handleDeletePosition={(event: React.MouseEvent<HTMLButtonElement>, id: string) => handleDeletePosition(event, id)}
             positions={positionsState.data}
             messageApi={messageApi} // for messages, this is passed as props so as not to have two conet
         />
         }
     </>
     )
 }
 
