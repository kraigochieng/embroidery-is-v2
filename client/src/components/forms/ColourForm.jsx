import React from 'react'

export default function ColourForm(props) {
    const {colourFormData, method, handleChange, handleSubmit} = props
  return (
    <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                name="name"
                value={colourFormData.name}
                onChange={handleChange}
            />
        <button>{method === "POST" ? "Add" : "Edit"} Colour</button>
    </form>
  )
}
