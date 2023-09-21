import { Button, Menu } from "antd";
import { Outlet } from "react-router-dom";
import { MenuItem } from "../types/menuItem";
import menuItem from "../utils/menuItem";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate()

  function handleLogOut() {
    sessionStorage.removeItem("jwt")
    navigate("/") 
  }

  /// /admin/store/colours
  const coloursMenuItem: MenuItem = menuItem(<Link to="/admin/store/colours">Colours</Link>, 'colours', null)
  /// /admin/store/items
  const itemsMenuItem: MenuItem = menuItem(<Link to="/admin/store/items">Items</Link>, 'items', null)
  /// /admin/store
  const storeMenuItems: MenuItem = menuItem('Store', 'store', [
    coloursMenuItem,
    itemsMenuItem
  ])

  // /admin
  const adminMenuItems: MenuItem = menuItem('Admin', 'admin', [
    storeMenuItems
  ])

  // /
  const homeMenuItem: MenuItem = menuItem(<Link to="/">Home</Link>, 'home', null)

  // main menu
  const menuItems: MenuItem[] = [
    homeMenuItem,
    adminMenuItems
  ]

  return (
    <>
        <Menu
          mode="horizontal"
          items={menuItems}
        />      
        <Button onMouseUp={handleLogOut}>Log Out</Button>
      <Outlet />
    </>
  )
}
