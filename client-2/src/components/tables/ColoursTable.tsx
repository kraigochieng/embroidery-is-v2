import { Key, useState } from 'react'
import column from '../../utils/column'
import { Space, Table } from 'antd'
import TableEditButton from '../buttons/TableEditButton'
import TableDeleteButton from '../buttons/TableDeleteButton'
import TableDeleteManyButton from '../buttons/TableDeleteManyButton'
import messageTemplate from '../../utils/messageTemplate'
import { Colour } from '../../types/colours'
import { MessageTemplateType } from '../../enums/MessageTemplateType'
import { MessageInstance } from 'antd/es/message/interface'
import { useColoursContext } from '../../contexts/ColoursContext'
import { ActionType } from '../../enums/ActionType'
import { admin } from '../../axiosInstances'

type props = {
    handleEditColour: (record: Colour) => void,
    handleDeleteColour: (event: React.MouseEvent<HTMLButtonElement>,id: string) => void,
    colours: Colour[],
    messageApi: MessageInstance
}


export default function ColoursTable(props: props) {
    const {coloursDispatch} = useColoursContext()
    const { handleEditColour, handleDeleteColour, colours, messageApi } = props

    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])

    // messages
    const deleteColourSuccess = () => messageApi.open(messageTemplate(MessageTemplateType.SUCCESS, 'Colour(s) Deleted Successfully'))

    // Column Initialization
    const nameColumn = column('Name', 'name', 'name')

    // Sorting for columns
    nameColumn['sorter'] = (a: Colour, b: Colour) => a.name.localeCompare(b.name)

    // Creating actions column for edit, delete buttons
    const actionsColumn = {
        title: '',
        key: 'actions',
        render: (text: string, record: Colour) => {
            return (
                <>
                    <Space>
                        <TableEditButton record={record} handleEdit={() => handleEditColour(record)}/>
                        <TableDeleteButton record={record} handleDelete={(event: React.MouseEvent<HTMLButtonElement>,id: string) => handleDeleteColour(event, id)}/>
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
    const colourTableColumns = [
        nameColumn,
        actionsColumn,
    ]

    // Handling Delete
    function handleDeleteColours() {
        coloursDispatch({type: ActionType.REQUEST})

        admin.delete('colours', {
            data: {
                ids: selectedRowKeys
            }
        })
            .then(response => coloursDispatch({type: ActionType.DELETE_MANY, ids: selectedRowKeys}))
            .catch(error => coloursDispatch({type: ActionType.FAILURE, error: error.message}))
        
        console.log('deleting many')
        deleteColourSuccess() // Show Message
        setSelectedRowKeys([]) // clear the array since it doesn't clear itself
    }


    return (
        <>
        {
            selectedRowKeys.length > 0 &&
            <TableDeleteManyButton handleDeleteMany={() => handleDeleteColours()} />
        }
            <Table
                rowKey={record => record.id}
                rowSelection={
                    { type: 'checkbox', ...rowSelection }
                } 
                dataSource={colours}
                columns={colourTableColumns} 
                size='small'
            />
        </>
        
    )
}
