import React from 'react'
import { Form, Modal, Space, Input, Button } from 'antd'
export default function ColourForm(props) {
    const {method, isModalOpen, form, colours, handleOpen, handleCancel, handleFinish} = props

    // Custom Form Validation
    function isUnique(_, value) {
        if(colours.map(colour => colour.name.toLowerCase()).includes(value.toLowerCase())) {
            return Promise.reject(new Error("Colour name already exists"))
        } else {
            return Promise.resolve()
        }
    }

    const colourNameRules = [
        { required: true, message: 'Please enter colour name' },
        { validator: isUnique }
    ]
    
    return (
        <Modal
            title= {`${method == 'POST' ? 'Add' : 'Edit'} Colour` }
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[
                <Button key='cancel' onMouseUp={handleCancel}>Cancel</Button>
            ]}
        >
            {/* Form: Add Colour*/}
            <Form form={form} onFinish={handleFinish} name= {`${method == 'POST' ? 'add' : 'edit'}ColourForm` }>
                <Space.Compact block>
                    <Form.Item name="name" rules={[...colourNameRules]}>
                        <Input placeholder='Colour Name'/>
                    </Form.Item>
                    <Button type='primary' htmlType='submit'>Submit</Button>
                </Space.Compact>
            </Form>
        </Modal>
    )
}
