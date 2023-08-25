import React, { useEffect, useRef, useState } from 'react'
import { admin } from '../axiosInstances'
import ItemTable from '../components/tables/ItemTable'
import ItemForm from '../components/forms/ItemForm'
export default function ItemPage() {
  
    const [itemFormData, setItemFormData] = useState({
        id: "",
        name: "",
    })

    const [items, setItems] = useState([])

    useEffect(() => {
        admin.get("items/get")
            .then(response => setItems([...response.data]))
            .catch(error => console.error(error))
    }, [])

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

    function handleAdd() {
        setMethod("POST")
        openDialog()
    }

    function handleEdit(item) {
        setMethod("PUT")
        openDialog()
        setItemFormData({...item})
    }
    
    function handleRemove(id) {
        admin.delete(`items/delete/${id}`)
            .then(response => {
                setItems(prevItems => {
                    return prevItems.filter(item => {
                        return item.id !== id
                    })
                })
            })
    }

    function handleSubmit(event) {
        event.preventDefault()
        if(method === "POST") {
            admin.post("items/post", itemFormData)
                .then(response => {
                    setItems(prevItems => [...prevItems, response.data])
                })
                .catch(error => console.error(error))
        } else if(method === "PUT") {
            admin.put(`items/put/${itemFormData.id}`, itemFormData)
                .then(response => setItems(prevItems => {
                    return prevItems.map(item => {
                        // Update the name
                        return item.id === itemFormData.id ? {...item, name: itemFormData.name } : item 
                    })
                }))
        }
        setItemFormData({id: "", name: "" })
        closeDialog()
    }
  return (
    <div className="page">
        <button onMouseUp={handleAdd}>Add Item</button>
        <dialog ref={dialogRef}>
            <ItemForm
                itemFormData={itemFormData}
                method={method}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </dialog>
        <ItemTable
            items={items}
            handleEdit={handleEdit}
            handleRemove={handleRemove}
        />        
    </div>
  )
}
