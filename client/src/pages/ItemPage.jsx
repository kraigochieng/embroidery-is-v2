import React, { useEffect, useRef, useState } from 'react'
import { server } from '../axiosInstances'
export default function ItemPage() {
    const [itemFormData, setItemFormData] = useState({
        id: "",
        name: "",
    })

    const [items, setItems] = useState([])

    useEffect(() => {
        server.get("admin/items")
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
        server.delete(`admin/items/${id}`)
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
            server.post("admin/items", itemFormData)
                .then(response => {
                    setItems(prevItems => [...prevItems, response.data])
                })
                .catch(error => console.error(error))
        } else if(method === "PUT") {
            server.put(`admin/items/${itemFormData.id}`, itemFormData)
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
    <div>
        <button onClick={handleAdd}>Add Item</button>
        <dialog ref={dialogRef}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={itemFormData.name}
                    onChange={handleChange}
                />
                <button>{method === "POST" ? "Add" : "Edit"} Item</button>
            </form>
        </dialog>
        <table>
                <thead>
                    <tr>
                        <th>Item Name</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td><button onClick={() => handleEdit(item)}>Edit</button></td>
                            <td><button onClick={() => handleRemove(item.id)}>Remove</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        
    </div>
  )
}
