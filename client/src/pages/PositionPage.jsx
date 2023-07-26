import { useEffect, useState, useRef } from 'react'
import { server } from '../axiosInstances'
import PositionForm from '../components/forms/PositionForm'
import PositionTable from '../components/tables/PositionTable'

export default function PositionPage() {

    const [items, setItems] = useState([]) 

    const [positionFormData, setPositionFormData] = useState({
        positionId: "",
        name: "",
        itemId: "",
    })

    const [method, setMethod] = useState("")
    const dialogRef = useRef(null)

    useEffect(() => {
        server.get("admin/items")
            .then(response => {
                setItems([...response.data])
            })
            .catch(error => console.error(error))
    }, [])

    function openDialog() {
        dialogRef.current.showModal()
    }

    function closeDialog() {
        dialogRef.current.close()
    }

    function handleAdd() {
        setMethod("POST")
        openDialog()
    }

    function handleEdit(item, position) {
        setMethod("PUT")
        setPositionFormData({positionId: position.id,name: position.name,itemId: item.id,})
        openDialog()
    }

    function handleRemove(itemId, positionId) {
        server.delete(`admin/positions/${positionId}`)
            .then(response => {
                setItems(prevItems => {
                    return prevItems.map(item => {
                        return item.id === itemId ?
                        {
                            ...item,
                            positions: item.positions.filter(position => position.id !== positionId)
                        } :
                        item
                    })
                })
            })
            .catch(error => console.error(error))
    }
    function handleSubmit(event) {
        event.preventDefault()
        if(method === "POST") {
            server.post(`admin/positions/${positionFormData.itemId}`, positionFormData)
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
            server.put(`admin/positions/${positionFormData.positionId}`, positionFormData)
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
        <button onClick={handleAdd}>Add Position</button>
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
