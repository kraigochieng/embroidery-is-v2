import { Form, Modal, Space, Input, Button, FormInstance } from 'antd'
import { HttpMethod } from '../../enums/HttpMethod'
import { Item, ItemFormData } from '../../types/items'

type props = {
    method: HttpMethod,
    isModalOpen: boolean,
    form: FormInstance,
    items: Item[],
    handleCancel: () => void,
    handleFinish: (values: ItemFormData) => void
}

export default function ItemForm(props: props) {
    const {method, isModalOpen, form, items, handleCancel, handleFinish} = props

    // Custom Form Validation
    function isUnique(_, value: string) {
        console.log(items)
        if(items.map(position => position.name.toLowerCase()).includes(value.toLowerCase())) {
            return Promise.reject(new Error("Item name already exists"))
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
            title= {`${method == HttpMethod.POST ? 'Add' : 'Edit'} Item` }
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[
                <Button key='cancel' onMouseUp={handleCancel}>Cancel</Button>
            ]}
        >
            {/* Form: Add Item*/}
            <Form form={form} onFinish={handleFinish} name= {`${method == HttpMethod.POST ? 'add' : 'edit'}ItemForm` }>
                <Space.Compact block>
                    <Form.Item name="name" rules={[...positionNameRules]}>
                        <Input placeholder='Item Name'/>
                    </Form.Item>
                    <Button type='primary' htmlType='submit'>Submit</Button>
                </Space.Compact>
            </Form>
        </Modal>
    )
}
