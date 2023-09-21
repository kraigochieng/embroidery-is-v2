import { EditOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import React from 'react'

export default function TableEditButton(props) {
    const { record, handleEdit } = props  
    
    return (
        <Tooltip title='Edit'placement='top'>
            <Button
                icon={<EditOutlined/>}
                onMouseUp={() => handleEdit(record)} 
            />
        </Tooltip>
  )
}
