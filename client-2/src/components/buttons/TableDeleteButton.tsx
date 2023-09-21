import React from 'react'
import { Popconfirm, Tooltip, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

export default function TableDeleteButton(props) {
    const { record, handleDelete } = props

    return (
    <Tooltip title='Delete' placement='top'>
        <Popconfirm
            title={`Delete`}
            description="Are you sure?"
            onConfirm={(event) => handleDelete(event, record.id)}
            onCancel={null}
            okText='Yes'
            cancelText='No'
            placement='bottom'
        >
            <Button icon={<DeleteOutlined />} />
        </Popconfirm>
    </Tooltip>
    )
}
