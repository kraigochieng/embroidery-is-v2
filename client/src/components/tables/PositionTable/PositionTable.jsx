import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPositions } from '../../../features/positions/positionsSlice'
import '../Table.css'
export default function PositionTable(props) {
    const dispatch = useDispatch()
    const items = useSelector(state => state.positions)
    const { handleDeletePosition, handlePutPosition } = props
    
    useEffect(() => {
        dispatch(getPositions())
    }, [])

    function PositionRow(props) {
        const { item } = props

        return (
            item.positions.length > 0 ? 
            // Put positions if they exist
            item.positions.map(position => (
                <tr key={position.id}>
                    {/*If it is first position in array, include the item name*/}
                    { item.positions.indexOf(position) === 0 && <td rowSpan={item.positions.length}>{item.name}</td>}
                    <td>{position.name}</td>
                    <td><button onClick={() => handlePutPosition(item, position)}>Edit</button></td>
                    <td><button onClick={() => handleDeletePosition(item.id, position.id)}>Remove</button></td>
                </tr> 
            )) :
            <tr key={item.id}>
                <td>{item.name}</td>
                <td>No Positions Found</td>
            </tr>
        )
    }

    return (
        <>
        {
            !items.loading ?
            <table id="position-table">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Position</th>
                </tr>
            </thead>
            <tbody>
                {
                    items.data.map(item => <PositionRow key={item.id} item={item}/>)
                }
            </tbody>
            </table> :
            <p>Loading...</p>
        }
        </>

    )
}
