import { useState, useRef } from 'react'
import PositionForm from '../components/forms/PositionForm'
import PositionTable from '../components/tables/PositionTable'
import { useDispatch } from 'react-redux'
import {  deletePosition, postPosition, putPosition } from '../features/positions/positionsSlice'

export default function PositionPage() {
    const dispatch = useDispatch()

    const [positionFormData, setPositionFormData] = useState({
        positionId: "",
        name: "",
        itemId: "",
    })

    const [method, setMethod] = useState("")
    const dialogRef = useRef(null)

    function openDialog() {
        dialogRef.current.showModal()
    }

    function closeDialog() {
        dialogRef.current.close()
    }

    function handlePostPosition() {
        setMethod("POST")
        openDialog()
    }

    function handlePutPosition(item, position) {
        setMethod("PUT")
        setPositionFormData({positionId: position.id,name: position.name, itemId: item.id,})
        openDialog()
    }

    function handleDeletePosition(itemId, positionId) {
        dispatch(deletePosition({itemId, positionId}))
    }

    function handleSubmit(event) {
        event.preventDefault()
        if(method === "POST") {
            dispatch(postPosition(positionFormData))
        } else if(method === "PUT") {
            dispatch(putPosition(positionFormData))
        }
        setPositionFormData({positionId: "", name: "", itemId: ""})
        closeDialog()
    }

    function handleChange(event) {
        const {name, value} = event.target
        setPositionFormData(prev => ({...prev, [name]: value}))
    }

    return (
    <div className="page">
        <button onClick={handlePostPosition}>Add Position</button>
        <dialog ref={dialogRef}>
            <PositionForm
                positionFormData={positionFormData}
                method={method}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </dialog>
        <PositionTable
            handlePutPosition={handlePutPosition}
            handleDeletePosition={handleDeletePosition}
        />
    </div>
  )
}
