import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function AdminNavbar() {
  return (
    <div>
        <ul className="navbar">
            <li><Link to="/admin/users">Users</Link></li>
            <li><Link to="/admin/store">Store</Link></li>
            <li><Link to="/">Back To Home</Link></li>
        </ul>
        <Outlet />
    </div>
  )
}
