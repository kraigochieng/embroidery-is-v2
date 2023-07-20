import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function AdminNavbar() {
  return (
    <div>
        <ul>
            <li><Link to="/admin/users">Users</Link></li>
            <li><Link to="/admin/store">Store</Link></li>
        </ul>
        <Outlet />
    </div>
  )
}
