import React from 'react'

export default function PositionForm(props) {

    const {positionFormData, items, method, handleChange, handleSubmit} = props

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="item-select">Item</label>
            <select id="item-select" name="itemId" value={positionFormData.itemId} onChange={handleChange}>
                <option value="" disabled>Choose</option>
                {items.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                ))}
            </select>
            <input type="text" placeholder='Position' name="name" value={positionFormData.name} onChange={handleChange}/>
            <button>{method === "POST" ? "Add" : "Edit"} Position</button>
        </form>
    )
}
