import React from 'react'
import { Button } from 'antd'
export default function ModalCancelButton(props) {
    const {handleCancel, text} = props
    return (
        <Button key='cancel' onMouseUp={handleCancel}>{text}</Button>
    )
}
