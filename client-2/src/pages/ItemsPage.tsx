import React, { useState, useEffect } from 'react'
import { useItemsContext } from '../contexts/ItemsContext'
import { admin } from '../axiosInstances'
import { ActionType } from '../enums/ActionType'
import { Item } from '../types/items'
import Loading from '../components/Loading'
import ItemsTable from '../components/tables/ItemsTable'
import { Form, message } from 'antd'
import { MessageTemplateType } from "../enums/MessageTemplateType"
import { HttpMethod } from "../enums/HttpMethod"
import messageTemplate from '../utils/messageTemplate'
import { ItemFormData } from '../types/items'
import TableAddButton from '../components/buttons/TableAddButton'
import ItemForm from '../components/forms/ItemForm'

export default function ItemsPage() {
    const { itemsState, itemsDispatch} = useItemsContext()

    useEffect(() => {
        itemsDispatch({type: ActionType.REQUEST})
        admin.get("items")
            .then(response => itemsDispatch({type: ActionType.GET, items: response.data}))
            .catch(error => itemsDispatch({type: ActionType.FAILURE, error: error.message}))
    }, [])

    /// Modals
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false)
  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false)
  /// Forms
  const [addItemForm] = Form.useForm() // To clear data after submit
  const [editItemForm] = Form.useForm() // To clear data after submit
  // For messages
  const [messageApi, contextHolder] = message.useMessage()
  const [itemToEditId, setItemToEditId] = useState<string>('')
  
  // Messages
  const addItemSuccess = () => messageApi.open(messageTemplate(MessageTemplateType.SUCCESS, 'Item Added Succesfully'))
  const editItemSuccess = () => messageApi.open(messageTemplate(MessageTemplateType.SUCCESS, 'Item Edited Successfully'))
  const deleteItemSuccess = () => messageApi.open(messageTemplate(MessageTemplateType.SUCCESS, 'Item(s) Deleted Successfully'))
  
  // Modal Cancels
  function handleEditItemModalCancel() {
    setIsEditItemModalOpen(false)
    editItemForm.resetFields()
  }

  function handleAddItemModalCancel() {
      setIsAddItemModalOpen(false)
      addItemForm.resetFields()
  }

  // Form
  /// Form Setups
  function handleAddItem() {
    setIsAddItemModalOpen(true)
  }

  function handleEditItem(record: Item) {
    const initialValues = {
        name: record.name
    }
    editItemForm.setFieldsValue(initialValues)
    setItemToEditId(record.id)
    setIsEditItemModalOpen(true)
  }

  function handleDeleteItem(event: React.MouseEvent<HTMLButtonElement>, id: string) {
    console.log(id)
    itemsDispatch({type: ActionType.REQUEST})
    admin.delete(`items/${id}`)
    .then(response => {
      console.log(response.data)
      itemsDispatch({type: ActionType.DELETE, id: id})
    })
    .catch(error => {
      itemsDispatch({type: ActionType.FAILURE, error: error.message})
    })
    deleteItemSuccess()
  }
    /// Form Submissions
  function handleAddItemFinish(values: ItemFormData) {
    setIsAddItemModalOpen(false) // Close Modal

    itemsDispatch({type: ActionType.REQUEST})
    console.log(values)

    admin.post('items', values)
      .then(response => {
        console.log(response.data)
        itemsDispatch({type: ActionType.POST, item: response.data})
      })
      .catch(error => {
        itemsDispatch({type: ActionType.FAILURE, error: error.message})
      })

    addItemSuccess() // Show Message
    addItemForm.resetFields() // Reset Form
  }

  function handleEditItemFinish(values: ItemFormData) {
      setIsEditItemModalOpen(false) // Close Modal

      itemsDispatch({type: ActionType.REQUEST})

      admin.put(`items/${itemToEditId}`, values)
        .then(response => {
          itemsDispatch({type: ActionType.PUT, item: response.data, id: itemToEditId})
        })
        .catch(error => {
          itemsDispatch({type: ActionType.FAILURE, error: error.message})
        })

      editItemSuccess() // Show Message
      editItemForm.resetFields() // Reset Form
  }
    return (
        <>
      {contextHolder}
      <TableAddButton text="Add Item" handleAdd={handleAddItem}/>
      {/* Post Form */}
      <ItemForm 
        method={HttpMethod.POST}
        form={addItemForm}
        items={itemsState.data}
        isModalOpen={isAddItemModalOpen}
        handleCancel={handleAddItemModalCancel}
        handleFinish={handleAddItemFinish}
      />
      {/* Put Form */}
      <ItemForm 
        method={HttpMethod.PUT}
        form={editItemForm}
        items={itemsState.data}
        isModalOpen={isEditItemModalOpen}
        handleCancel={handleEditItemModalCancel}
        handleFinish={handleEditItemFinish}
      />
      {/* Table: Item */}
      {
        itemsState.loading ?
        <Loading /> :
        <ItemsTable
            handleEditItem={(record: Item) => handleEditItem(record)}
            handleDeleteItem={(event: React.MouseEvent<HTMLButtonElement>, id: string) => handleDeleteItem(event, id)}
            items={itemsState.data}
            messageApi={messageApi} // for messages, this is passed as props so as not to have two conet
        />
        }
    </>
    )
}
