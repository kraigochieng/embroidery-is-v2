import React from 'react'
import {Link, Outlet, useNavigate } from 'react-router-dom'
export default function HomeNavbar() {

  const navigate = useNavigate()

  function handleLogOut() {
    localStorage.removeItem("jwt")
    navigate("/")
  }
  return (
    <div>
      <ul className="navbar">
        <li><Link to="/admin">Admin</Link></li>
      </ul>
      <button onClick={handleLogOut}>Log Out</button>
      <Outlet />
    </div>
    
  )
}
