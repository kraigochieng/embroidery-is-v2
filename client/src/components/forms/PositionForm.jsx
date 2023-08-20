import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getItems } from '../../features/items/itemsSlice'

export default function PositionForm(props) {
    const items  = useSelector(state => state.items)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getItems())
    }, [])
    
    const {positionFormData, method, handleChange, handleSubmit} = props

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="item-select">Item</label>
            <select id="item-select" name="itemId" value={positionFormData.itemId} onChange={handleChange}>
                <option value="" disabled>Choose</option>
                {items.data.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                ))}
            </select>
            <input type="text" placeholder='Position' name="name" value={positionFormData.name} onChange={handleChange}/>
            <button>{method === "POST" ? "Add" : "Edit"} Position</button>
        </form>
    )
}
