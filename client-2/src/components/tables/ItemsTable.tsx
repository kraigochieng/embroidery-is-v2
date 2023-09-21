import { Key, useState } from 'react'
import { Space, Table } from 'antd'
import TableEditButton from '../buttons/TableEditButton'
import TableDeleteButton from '../buttons/TableDeleteButton'
import TableDeleteManyButton from '../buttons/TableDeleteManyButton'
import messageTemplate from '../../utils/messageTemplate'
import { Item } from '../../types/items'
import { MessageTemplateType } from '../../enums/MessageTemplateType'
import { MessageInstance } from 'antd/es/message/interface'
import { useItemsContext } from '../../contexts/ItemsContext'
import { ActionType } from '../../enums/ActionType'
import { admin } from '../../axiosInstances'
import { Link } from 'react-router-dom'

type props = {
    handleEditItem: (record: Item) => void,
    handleDeleteItem: (event: React.MouseEvent<HTMLButtonElement>,id: string) => void,
    items: Item[],
    messageApi: MessageInstance
}


export default function ItemsTable(props: props) {
    const { handleEditItem, handleDeleteItem, items, messageApi } = props
    const { itemsDispatch } = useItemsContext()
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])

    // messages
    const deleteItemSuccess = () => messageApi.open(messageTemplate(MessageTemplateType.SUCCESS, 'Item(s) Deleted Successfully'))

    // Column Initialization
    const nameColumn = {
        title: 'Name',
        key: 'name',
        render: (text: string, record: Item) => {
            return (
                <Link to={`/admin/store/items/${record.id}/positions`}>{record.name}</Link>
            )
        },
        sorter: (a: Item, b: Item) => a.name.localeCompare(b.name)
    }


    // Creating actions column for edit, delete buttons
    const actionsColumn = {
        title: '',
        key: 'actions',
        render: (text: string, record: Item) => {
            return (
                <>
                    <Space>
                        <TableEditButton record={record} handleEdit={() => handleEditItem(record)}/>
                        <TableDeleteButton record={record} handleDelete={(event: React.MouseEvent<HTMLButtonElement>,id: string) => handleDeleteItem(event, id)}/>
                    </Space>
                </>
            )
        }
    }

    // Config for rows
    const rowSelection = {
        onChange: (selectedRowKeys: Key[]) => {
            setSelectedRowKeys(selectedRowKeys) // Set IDs to be in a state
        }
    }

    // Putting all columns to one array
    const itemTableColumns = [
        nameColumn,
        actionsColumn,
    ]

    // Handling Delete
    function handleDeleteItems() {
        itemsDispatch({type: ActionType.REQUEST})

        admin.delete('items', {
            data: {
                ids: selectedRowKeys
            }
        })
            .then(response => itemsDispatch({type: ActionType.DELETE_MANY, ids: selectedRowKeys}))
            .catch(error => itemsDispatch({type: ActionType.FAILURE, error: error.message}))
        
        console.log('deleting many')
        deleteItemSuccess() // Show Message
        setSelectedRowKeys([]) // clear the array since it doesn't clear itself
    }


    return (
        <>
        {
            selectedRowKeys.length > 0 &&
            <TableDeleteManyButton handleDeleteMany={() => handleDeleteItems()} />
        }
            <Table
                rowKey={record => record.id}
                rowSelection={
                    { type: 'checkbox', ...rowSelection }
                } 
                dataSource={items}
                columns={itemTableColumns} 
                size='small'
            />
        </>
        
    )
}
