import { Form, Modal, Space, Input, Button, FormInstance } from 'antd'
import { HttpMethod } from '../../enums/HttpMethod'
import { Position, PositionFormData } from '../../types/positions'

type props = {
    method: HttpMethod,
    isModalOpen: boolean,
    form: FormInstance,
    positions: Position[],
    handleCancel: () => void,
    handleFinish: (values: PositionFormData) => void
}

export default function PositionForm(props: props) {
    const {method, isModalOpen, form, positions, handleCancel, handleFinish} = props

    // Custom Form Validation
    function isUnique(_, value: string) {
        console.log(positions)
        if(positions.map(position => position.name.toLowerCase()).includes(value.toLowerCase())) {
            return Promise.reject(new Error("Position name already exists"))
        } else {
            return Promise.resolve()
        }
    }

    const positionNameRules = [
        { required: true, message: 'Please enter position name' },
        { validator: isUnique }
    ]
    
    return (
        <Modal
            title= {`${method == HttpMethod.POST ? 'Add' : 'Edit'} Position` }
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[
                <Button key='cancel' onMouseUp={handleCancel}>Cancel</Button>
            ]}
        >
            {/* Form: Add Position*/}
            <Form form={form} onFinish={handleFinish} name= {`${method == HttpMethod.POST ? 'add' : 'edit'}PositionForm` }>
                <Space.Compact block>
                    <Form.Item name="name" rules={[...positionNameRules]}>
                        <Input placeholder='Position Name'/>
                    </Form.Item>
                    <Button type='primary' htmlType='submit'>Submit</Button>
                </Space.Compact>
            </Form>
        </Modal>
    )
}
