import React, { useEffect, useRef, useState } from 'react'
import { server } from '../axiosInstances'
export default function ColourPage() {
    const [colourFormData, setColourFormData] = useState({
        id: "",
        name: "",
    })

    const [colours, setColours] = useState([])

    useEffect(() => {
        server.get("admin/colours")
            .then(response => setColours([...response.data]))
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
        setColourFormData(prevColourFormData => ({...prevColourFormData, [name]: value}))
    }

    function handleAdd() {
        setMethod("POST")
        openDialog()
    }

    function handleEdit(colour) {
        setMethod("PUT")
        openDialog()
        setColourFormData({...colour})
    }
    
    function handleRemove(id) {
        server.delete(`admin/colours/${id}`)
            .then(response => {
                setColours(prevColours => {
                    return prevColours.filter(colour => {
                        return colour.id !== id
                    })
                })
            })
    }

    function handleSubmit(event) {
        event.preventDefault()
        if(method === "POST") {
            server.post("admin/colours", colourFormData)
                .then(response => {
                    setColours(prevColours => [...prevColours, response.data])
                })
                .catch(error => console.error(error))
        } else if(method === "PUT") {
            server.put(`admin/colours/${colourFormData.id}`, colourFormData)
                .then(response => setColours(prevColours => {
                    return prevColours.map(colour => {
                        // Update the name
                        return colour.id === colourFormData.id ? {...colour, name: colourFormData.name } : colour 
                    })
                }))
        }
        setColourFormData({id: "", name: "" })
        closeDialog()
    }
  return (
    <div>
        <button onClick={handleAdd}>Add Colour</button>
        <dialog ref={dialogRef}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={colourFormData.name}
                    onChange={handleChange}
                />
                <button>{method === "POST" ? "Add" : "Edit"} Colour</button>
            </form>
        </dialog>
        <table>
                <thead>
                    <tr>
                        <th>Colour Name</th>
                    </tr>
                </thead>
                <tbody>
                    {colours.map(colour => (
                        <tr key={colour.id}>
                            <td>{colour.name}</td>
                            <td><button onClick={() => handleEdit(colour)}>Edit</button></td>
                            <td><button onClick={() => handleRemove(colour.id)}>Remove</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        
    </div>
  )
}
