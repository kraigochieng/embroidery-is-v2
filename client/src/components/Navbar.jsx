import React from 'react'
import {Link, Outlet, useNavigate } from 'react-router-dom'
import menuItem from '../utils/menuItem'
import { Button, Menu, Space } from 'antd'

export default function Navbar() {

  const navigate = useNavigate()

  function handleLogOut() {
    console.log("Removing JWT...")
    sessionStorage.removeItem("jwt")
    console.log("JWT Removed...")
    console.log("Navigating to Home...")
    navigate("/")
    console.log("At Home...") 
  }

  // Level 3
  const itemsMenuItem = menuItem(<Link to="/admin/store/items">Items</Link>, 'items', null)
  const coloursMenuItem = menuItem(<Link to="/admin/store/colours">Colours</Link>, 'colours', null)
  
  const usersMenuItem = menuItem(<Link to="/admin/accounts/users">Users</Link>, 'users', null)

  // Level 2
  const storeMenuItem = menuItem('Store', 'store', [
    itemsMenuItem,
    // positionsMenuItem,
    coloursMenuItem
  ])

  const accountsMenuItem = menuItem('Accounts', 'accounts', [
    usersMenuItem
  ])
  // Level 1
  const adminMenuItems = menuItem('Admin', 'admin', [
    accountsMenuItem,
    storeMenuItem
  ])

  const menuItems = [
    adminMenuItems,
  ]
  return (
    <>
      <Space>
        <Menu
          mode='horizontal'
          items={menuItems}
        />
        <Button onMouseUp={handleLogOut}>Log Out</Button>
      </Space>
      <Outlet />
    </>
    
  )
}
