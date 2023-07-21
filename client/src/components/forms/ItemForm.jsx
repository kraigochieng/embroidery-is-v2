import React from 'react'

export default function ItemForm(props) {
    const {itemFormData, method ,handleChange, handleSubmit} = props
    
    return (
    <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Name"
            name="name"
            value={itemFormData.name}
            onChange={handleChange}
        />
        <button>{method === "POST" ? "Add" : "Edit"} Item</button>
    </form>
    )
}
