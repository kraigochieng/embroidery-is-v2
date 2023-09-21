import { Key, useState } from 'react'
import { Space, Table } from 'antd'
import TableEditButton from '../buttons/TableEditButton'
import TableDeleteButton from '../buttons/TableDeleteButton'
import TableDeleteManyButton from '../buttons/TableDeleteManyButton'
import messageTemplate from '../../utils/messageTemplate'
import { Position } from '../../types/positions'
import { MessageTemplateType } from '../../enums/MessageTemplateType'
import { MessageInstance } from 'antd/es/message/interface'
import { usePositionsContext } from '../../contexts/PositionsContext'
import { ActionType } from '../../enums/ActionType'
import { admin } from '../../axiosInstances'
import { Link } from 'react-router-dom'
import column from '../../utils/column'

type props = {
    handleEditPosition: (record: Position) => void,
    handleDeletePosition: (event: React.MouseEvent<HTMLButtonElement>,id: string) => void,
    positions: Position[],
    messageApi: MessageInstance
}


export default function PositionsTable(props: props) {
    const { handleEditPosition, handleDeletePosition, positions, messageApi } = props
    const { positionsDispatch } = usePositionsContext()
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])

    // messages
    const deletePositionSuccess = () => messageApi.open(messageTemplate(MessageTemplateType.SUCCESS, 'Position(s) Deleted Successfully'))

    // Column Initialization
    const nameColumn = column('Name', 'name', 'name')
    nameColumn['sorter'] = (a: Position, b: Position) => a.name.localeCompare(b.name)

    // Creating actions column for edit, delete buttons
    const actionsColumn = {
        title: '',
        key: 'actions',
        render: (text: string, record: Position) => {
            return (
                <>
                    <Space>
                        <TableEditButton record={record} handleEdit={() => handleEditPosition(record)}/>
                        <TableDeleteButton record={record} handleDelete={(event: React.MouseEvent<HTMLButtonElement>,id: string) => handleDeletePosition(event, id)}/>
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
    const positionTableColumns = [
        nameColumn,
        actionsColumn,
    ]

    // Handling Delete
    function handleDeletePositions() {
        positionsDispatch({type: ActionType.REQUEST})

        admin.delete('positions', {
            data: {
                ids: selectedRowKeys
            }
        })
            .then(response => positionsDispatch({type: ActionType.DELETE_MANY, ids: selectedRowKeys}))
            .catch(error => positionsDispatch({type: ActionType.FAILURE, error: error.message}))
        
        console.log('deleting many')
        deletePositionSuccess() // Show Message
        setSelectedRowKeys([]) // clear the array since it doesn't clear itself
    }


    return (
        <>
        {
            selectedRowKeys.length > 0 &&
            <TableDeleteManyButton handleDeleteMany={() => handleDeletePositions()} />
        }
            <Table
                rowKey={record => record.id}
                rowSelection={
                    { type: 'checkbox', ...rowSelection }
                } 
                dataSource={positions}
                columns={positionTableColumns} 
                size='small'
            />
        </>
        
    )
}
