import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function StoreNavbar() {
  return (
    <div>
        <ul>
            <li><Link to="items">Items</Link></li>
            <li><Link to="colours">Colours</Link></li>
            <li><Link to="positions">Positions</Link></li>
        </ul>
        <Outlet />
    </div>
  )
}