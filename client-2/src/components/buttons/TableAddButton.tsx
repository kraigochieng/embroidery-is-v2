import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

type props = {
    handleAdd: () => void
    text: string
}
export default function TableAddButton(props: props) {
    const { handleAdd, text } = props
    
    return (
        <Button icon={<PlusOutlined />} onMouseUp={handleAdd}>{text}</Button>
    )
}
