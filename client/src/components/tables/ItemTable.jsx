import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getItems } from '../../features/items/itemsSlice'
export default function ItemTable(props) {
    const { handlePutItem, handleDeleteItem } = props
    const items = useSelector(state => state.items)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getItems())
    }, [])

    function ItemRow(props) {
        const {item} = props 
        return  (
            <tr>
                <td>{item.name}</td>
                <td><button onClick={() => handlePutItem(item)}>Edit</button></td>
                <td><button onClick={() => handleDeleteItem(item.id)}>Remove</button></td>
            </tr>
        )
    }

    return (
        <>
        {!items.loading ?
            <table>
                <thead>
                    <tr>
                        <th>Item Name</th>
                    </tr>
                </thead>
                <tbody>
                    {items.data.map(item => <ItemRow key={item.id} item={item} />)}
                </tbody>
            </table> :
            <p>Loading...</p>
        }
        </>
    )
}
