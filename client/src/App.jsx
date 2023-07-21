import './App.css'
import {Routes, Route} from "react-router-dom"
import AdminNavbar from './components/navbars/AdminNavbar'
import UserPage from './pages/UserPage'
import ColourPage from './pages/ColourPage'
import ItemPage from './pages/ItemPage'
import StoreNavbar from './components/navbars/StoreNavbar'
import PositionPage from './pages/PositionPage'

function App() {

  return (
    <>
      <Routes>
        <Route path="/admin" element={<AdminNavbar />}>
          <Route path="store" element={<StoreNavbar />}>
            <Route path="items" element={<ItemPage />} />
            <Route path="colours" element={<ColourPage />} />
            <Route path="positions" element={<PositionPage />} />
          </Route>
          <Route path="users" element={<UserPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
