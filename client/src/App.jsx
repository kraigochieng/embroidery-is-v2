import './App.css'
import {Routes, Route} from "react-router-dom"
import AdminNavbar from './components/navbars/AdminNavbar'
import UserPage from './pages/UserPage'
import ColourPage from './pages/ColourPage'
import ItemPage from './pages/ItemPage'
import StoreNavbar from './components/navbars/StoreNavbar'
import PositionPage from './pages/PositionPage'
import HomePage from './pages/HomePage'
import HomeNavbar from './components/navbars/HomeNavbar'
import AdminPage from './pages/AdminPage'
import StorePage from './pages/StorePage'
import AuthPage from './pages/AuthPage'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomeNavbar />}>
         <Route index element={<HomePage />}/>
        </Route>
        <Route path="/admin" element={<AdminNavbar />}>
          <Route index element={<AdminPage />} />
          <Route path="store" element={<StoreNavbar />}>
            <Route index element={<StorePage />} />
            <Route path="items" element={<ItemPage />} />
            <Route path="colours" element={<ColourPage />} />
            <Route path="positions" element={<PositionPage />} />
          </Route>
          <Route path="users" element={<UserPage />} />
        </Route>
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </>
  )
}

export default App
