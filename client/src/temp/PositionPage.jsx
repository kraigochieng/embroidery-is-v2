import { useEffect, useState, useRef } from 'react'
import { admin } from '../axiosInstances'
import PositionForm from '../components/forms/PositionForm'
import PositionTable from '../components/tables/PositionTable'
import { useDispatch } from 'react-redux'
import { getPositions, deletePosition, postPosition, putPosition } from '../features/positions/positionsSlice'

export default function PositionPage() {
    const dispatch = useDispatch()

    const [positionFormData, setPositionFormData] = useState({
        positionId: "",
        name: "",
        itemId: "",
    })

    const [method, setMethod] = useState("")
    const dialogRef = useRef(null)

    useEffect(() => {
        dispatch(getPositions())
    }, [])

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
        setPositionFormData({positionId: position.id,name: position.name,itemId: item.id,})
        openDialog()
    }

    function handlDeletePosition(itemId, positionId) {
        dispatch(deletePosition(itemId, positionId))
    }
    
    function handleSubmit(event) {
        event.preventDefault()
        if(method === "POST") {
            admin.post(`positions/post/${positionFormData.itemId}`, positionFormData)
                .then(response => {
                    setItems(prevItems => {
                        // Return Items array 
                        return prevItems.map(item => {
                            // If id matches update position array...
                            return item.id === parseInt(positionFormData.itemId) ?
                            // add Position to List
                            {...item, positions: [...item.positions, response.data]} : 
                            // If id dosent match, return item
                            item
                        })
                    })

                    setPositionFormData({positionId: "", name: "", itemId: ""})
                })
                .catch(error => console.error(error))
        } else if(method === "PUT") {
            admin.put(`positions/put/${positionFormData.positionId}`, positionFormData)
                .then(response => {
                    console.log(response.data)
                    setItems(prevItems => {
                        // Map Through Items...
                        return prevItems.map(item => {
                            // If Item IDs match...
                            return item.id === parseInt(positionFormData.itemId) ? 
                            // Update Item Object...
                            {
                                ...item,
                                // Map Through positions...  
                                positions: item.positions.map(position => {
                                    // IF Position IDs match...
                                    return position.id === parseInt(positionFormData.positionId) ?
                                    // Update the position
                                    {...response.data} :
                                    // Return position if it is just the same
                                    position
                                })
                            }
                             : 
                            // Return item if it is just the same
                            item
                        })
                    })
                })
        }

        closeDialog()
    }

    function handleChange(event) {
        const {name, value} = event.target
        setPositionFormData(prev => ({...prev, [name]: value}))
    }

    return (
    <div className="page">
        <button onMouseUp={handlePostPosition}>Add Position</button>
        <dialog ref={dialogRef}>
            <PositionForm
                positionFormData={positionFormData}
                items={items}
                method={method}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </dialog>
        <PositionTable
            items={items}
            handleEdit={handleEdit}
            handleRemove={handleRemove}
        />
    </div>
  )
}
