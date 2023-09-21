export default function column(title: string | React.ReactElement<HTMLAnchorElement>, dataIndex: string, key: string) {
    return {
        title: title,
        dataIndex: dataIndex,
        key: key
    }
}