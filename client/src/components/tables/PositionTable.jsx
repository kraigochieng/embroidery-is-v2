import React from 'react'

export default function PositionTable(props) {
    
    function PositionRow(props) {
        const { item } = props

        return (
            item.positions.length > 0 ? 
            // Put positions if they exist
            item.positions.map(position => (
                <tr key={position.id}>
                    {/*If it is first position in array, include the item name*/}
                    { item.positions.indexOf(position) === 0 && <td rowSpan={item.positions.length}>{item.name} </td>}
                    <td>{position.name}</td>
                    <td><button onClick={() => handleEdit(item, position)}>Edit</button></td>
                    <td><button onClick={() => handleRemove(item.id, position.id)}>Remove</button></td>
                </tr> 
            )) :
            <tr key={item.id}>
                <td>{item.name}</td>
                <td>No Positions Found</td>
            </tr>
        )
    }
    const {items, handleEdit, handleRemove} = props

    return (
        <table id="position-table">
        <thead>
            <tr>
                <th>Item</th>
                <th>Position</th>
            </tr>
        </thead>
        <tbody>
            {
                items.map(item => <PositionRow key={item.id} item={item}/>)
            }
        </tbody>
        </table>
    )
}
