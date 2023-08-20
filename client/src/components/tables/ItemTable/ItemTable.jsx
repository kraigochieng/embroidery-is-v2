import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getItems, deleteItems } from '../../../features/items/itemsSlice'
import { itemTableColumns, idColumn } from './item_table_columns'
import { useTable, useFilters, useSortBy, usePagination, useRowSelect } from 'react-table'
import { CheckBox } from '../CheckBox'
import '../Table.css'
export default function ItemTable(props) {

    // Redux stuff
    const dispatch = useDispatch()
    const items = useSelector(state => state.items)

    // Get colours by default
    useEffect(() => {
        dispatch(getItems())        
    }, [])
    
    // Initialize memos
    const columns = useMemo(() => itemTableColumns, [])
    const data = useMemo(() => items.data, [items.data])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        nextPage,
        previousPage,
        canNextPage,
        pageOptions,
        canPreviousPage,
        gotoPage,
        pageCount,
        prepareRow,
        state,
        selectedFlatRows,
    } = useTable(
        {
            columns,
            data,
            initialState: {
                hiddenColumns: [idColumn.accessor]
            }
        },
        useFilters,
        useSortBy,
        usePagination,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => [
                {
                    id: 'selection', 
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <CheckBox {...getToggleAllRowsSelectedProps()}/>
                    ),
                    Cell: ({ row }) => (
                        <CheckBox {...row.getToggleRowSelectedProps()} />
                    ),
                    className: 'checkbox-column'
                },
                ...columns,]
            )
        }
    )

    const { pageIndex } = state

    function handleDelete() { 
        // Return an object that has the id property only in it
        const itemIdObjects = selectedFlatRows.map(row => ({ id: row.original.id }))
        dispatch(deleteItems(itemIdObjects))
    }

    return (
        <>
            {/* Display delete button if row(s) selected  */}
            {   
                selectedFlatRows.length > 0 && 
                <button onClick={handleDelete}>Delete</button> 
            }
            <table {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map(header => (
                                        <th {...header.getHeaderProps(header.getSortByToggleProps())}>
                                            {header.render('Header')}
                                            <span>
                                                {
                                                    header.isSorted ? 
                                                    (header.isSortedDesc ? <span> &#8595;</span> : <span> &#8593;</span>) : 
                                                    ''
                                                }
                                            </span>
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        rows.map(row => {
                            prepareRow(row)

                            return(
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map(cell => {
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })
                                    }
                                    {/* Edit Button */}
                                    <td><button>Edit</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div>
                {
                    canPreviousPage ? <button onClick={() => gotoPage(0)}>First Page</button> : null
                }
                {
                    canPreviousPage ? <button onClick={() => previousPage()}>Previous</button> : null
                }
                <span>
                    {pageIndex + 1} of {pageOptions.length}
                </span>
                {
                    canNextPage ? <button onClick={() => nextPage()}>Next</button> : null
                }
                {
                    canNextPage ? <button onClick={() => gotoPage(pageCount - 1)}>Last Page</button> : null
                }
                {
                    <input type="number" defaultValue={pageIndex + 1} onChange={(event) => {
                        const pageNumber = event.target.value ? Number(event.target.value) - 1 : 0
                        gotoPage(pageNumber)
                    }}/>
                }
            </div>
        </>
    )
}
