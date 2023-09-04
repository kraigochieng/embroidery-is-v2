import React from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

export default function TableAddButton(props) {
    const { handleAdd, text } = props
    
    return (
        <Button icon={<PlusOutlined />} onMouseUp={handleAdd}>{text}</Button>
    )
}
