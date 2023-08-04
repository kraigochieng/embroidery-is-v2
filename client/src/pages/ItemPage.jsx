import React, {  useRef, useState } from 'react'
import ItemTable from '../components/tables/ItemTable'
import ItemForm from '../components/forms/ItemForm'
import { useDispatch } from 'react-redux'
import { putItem, deleteItem, postItem } from '../features/items/itemsSlice'

export default function ItemPage() {
    const dispatch = useDispatch()

    const [itemFormData, setItemFormData] = useState({
        id: "",
        name: "",
    })

    const dialogRef = useRef(null)

    const [method, setMethod] = useState("")

    function openDialog() {
        dialogRef.current.showModal()
    }

    function closeDialog() {
        dialogRef.current.close()
    }

    function handleChange(event) {
        const {name, value} = event.target
        setItemFormData(prevItemFormData => ({...prevItemFormData, [name]: value}))
    }

    function handlePostItem() {
        setMethod("POST")
        openDialog()
    }
    
    function handlePutItem(item) {
        setMethod("PUT")
        openDialog()
        setItemFormData({...item})
    }

    function handleDeleteItem(id) {
        dispatch(deleteItem(id))
    }

    function handleSubmit(event) {
        event.preventDefault()
        if(method === "POST") {
            dispatch(postItem(itemFormData))
        } else if(method === "PUT") {
            dispatch(putItem(itemFormData))
        }
        setItemFormData({id: "", name: "" })
        closeDialog()
    }

    return (
    <div className="page">
        <button onClick={handlePostItem}>Add Item</button>
        <dialog ref={dialogRef}>
            <ItemForm
                itemFormData={itemFormData}
                method={method}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </dialog>
        <ItemTable
            handlePutItem={handlePutItem}
            handleDeleteItem={handleDeleteItem}
        />        
    </div>
    )
}
