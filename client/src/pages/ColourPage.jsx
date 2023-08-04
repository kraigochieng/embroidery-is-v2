import React, { useEffect, useRef, useState } from 'react'
import { server } from '../axiosInstances'
import ColourForm from '../components/forms/ColourForm'
import ColourTable from '../components/tables/ColourTable'
import { deleteColour, postColour, putColour } from '../features/colours/coloursSlice'
import { useDispatch } from 'react-redux'
export default function ColourPage() {
    const dispatch = useDispatch()
    const [colourFormData, setColourFormData] = useState({
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
        setColourFormData(prevColourFormData => ({...prevColourFormData, [name]: value}))
    }

    function handlePostColour() {
        setMethod("POST")
        openDialog()
    }

    function handlePutColour(colour) {
        setMethod("PUT")
        openDialog()
        setColourFormData({...colour})
    }
    
    function handleDeleteColour(id) {
        dispatch(deleteColour(id))
    }

    function handleSubmit(event) {
        event.preventDefault()
        if(method === "POST") {
            dispatch(postColour(colourFormData))
        } else if(method === "PUT") {
            dispatch(putColour(colourFormData))
        }
        setColourFormData({id: "", name: "" })
        closeDialog()
    }
  return (
    <div className="page">
        <button onClick={handlePostColour}>Add Colour</button>
        <dialog ref={dialogRef}>
            <ColourForm
                colourFormData={colourFormData}
                method={method}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </dialog>
        <ColourTable 
            handlePutColour={handlePutColour}
            handleDeleteColour={handleDeleteColour}
        />
        
    </div>
  )
}
