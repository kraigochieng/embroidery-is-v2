import { DeleteOutlined } from '@ant-design/icons'
import { Button, Popconfirm } from 'antd'

export default function TableDeleteManyButton(props) {
  const { handleDeleteMany } = props

  return (
    <Popconfirm
        title='Delete'
        description='Are you sure?'
        onConfirm={(event) => handleDeleteMany(event)}
        onCancel={null}
        okText='Yes'
        cancelText='No'
    >
        <Button icon={<DeleteOutlined />}>Delete Many</Button>
    </Popconfirm>
  )
}
