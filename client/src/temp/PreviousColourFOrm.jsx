import { Button, Input, Space } from 'antd'
import React from 'react'

export default function ColourForm(props) {
    const {colourFormData, method, handleChange, handleSubmit} = props
  return (
    <form onSubmit={handleSubmit}>
            {/* <input
                type="text"
                placeholder="Name"
                name="name"
                value={colourFormData.name}
                onChange={handleChange}
            /> */}
            <Space.Compact block>
              <Input placeholder='Colour Name'/>
              <Button type='primary' htmlType='submit'>Submit</Button>
            </Space.Compact>
        {/* <button>{method === "POST" ? "Add" : "Edit"} Colour</button> */}
    </form>
  )
}
