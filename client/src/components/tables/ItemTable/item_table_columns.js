import column from "../column";

export const idColumn = column('ID', 'id')
const nameColumn = column('Name', 'name')

export const itemTableColumns = [
    idColumn,
    nameColumn
]