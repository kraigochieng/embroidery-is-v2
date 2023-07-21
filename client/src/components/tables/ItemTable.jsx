import React from 'react'

export default function ItemTable(props) {
    const { items, handleEdit, handleRemove } = props

    function ItemRow(props) {
        const {item} = props 
        return  (
            <tr>
                <td>{item.name}</td>
                <td><button onClick={() => handleEdit(item)}>Edit</button></td>
                <td><button onClick={() => handleRemove(item.id)}>Remove</button></td>
            </tr>
        )
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Item Name</th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => <ItemRow key={item.id} item={item} />)}
            </tbody>
        </table>
    )
}
