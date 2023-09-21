export type MenuItem = {
    label: React.ReactElement<HTMLAnchorElement> | string,
    key: string,
    children: MenuItem[] | null
}
