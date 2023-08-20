import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getColours } from '../../features/colours/coloursSlice'
export default function ColourTable(props) {
    const dispatch = useDispatch()
    const { handlePutColour, handleDeleteColour } = props
    const colours = useSelector(state => state.colours)

    useEffect(() => {
        dispatch(getColours())
    }, [])
    
    function ColourRow(props) {
        const {colour} = props 
        return (
            <tr key={colour.id}>
                <td>{colour.name}</td>
                <td><button onClick={() => handlePutColour(colour)}>Edit</button></td>
                <td><button onClick={() => handleDeleteColour(colour.id)}>Remove</button></td>
            </tr>
        )
    }

    

    
    

    return (
        <>
        {
            !colours.loading ?
            <table>
                <thead>
                    <tr>
                        <th>Colour Name</th>
                    </tr>
                </thead>
                <tbody>
                    {colours.data.map(colour => <ColourRow key={colour.id} colour={colour}/>)}
                </tbody>
            </table> :
            <p>Loading...</p>
        }
        </>
        
  )
}
