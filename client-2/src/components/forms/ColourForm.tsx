import { Form, Modal, Space, Input, Button, FormInstance } from 'antd'
import { HttpMethod } from '../../enums/HttpMethod'
import { Colour, ColourFormData } from '../../types/colours'

type props = {
    method: HttpMethod,
    isModalOpen: boolean,
    form: FormInstance,
    colours: Colour[],
    handleCancel: () => void,
    handleFinish: (values: ColourFormData) => void
}

export default function ColourForm(props: props) {
    const {method, isModalOpen, form, colours, handleCancel, handleFinish} = props

    // Custom Form Validation
    function isUnique(_, value: string) {
        console.log(colours)
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
            title= {`${method == HttpMethod.POST ? 'Add' : 'Edit'} Colour` }
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[
                <Button key='cancel' onMouseUp={handleCancel}>Cancel</Button>
            ]}
        >
            {/* Form: Add Colour*/}
            <Form form={form} onFinish={handleFinish} name= {`${method == HttpMethod.POST ? 'add' : 'edit'}ColourForm` }>
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
