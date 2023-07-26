import React from 'react'
import {Link, Outlet } from 'react-router-dom'
export default function HomeNavbar() {
  return (
    <div>
      <ul className="navbar">
        <li><Link to="/admin">Admin</Link></li>
      </ul>
        <Outlet />
    </div>
    
  )
}
