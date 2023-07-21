import React from 'react'

export default function ColourTable(props) {
    const { colours, handleEdit, handleRemove } = props

    function ColourRow(props) {
        const {colour} = props 
        return (
            <tr key={colour.id}>
                <td>{colour.name}</td>
                <td><button onClick={() => handleEdit(colour)}>Edit</button></td>
                <td><button onClick={() => handleRemove(colour.id)}>Remove</button></td>
            </tr>
        )
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Colour Name</th>
                </tr>
            </thead>
            <tbody>
                {colours.map(colour => <ColourRow key={colour.id} colour={colour}/>)}
            </tbody>
        </table>
  )
}
