import './App.css'
import {Routes, Route} from "react-router-dom"


import Navbar from './components/Navbar'
// Pages
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import StorePage from './pages/StorePage'
import AuthPage from './pages/AuthPage'
import UserPage from './pages/UserPage'
import ColourPage from './pages/ColourPage'
import ItemPage from './pages/ItemPage'
import PositionPage from './pages/PositionPage'

function App() {

  return (
    <>
      <Routes>
          <Route path="/" element={<Navbar />}>
              <Route index element={<HomePage />}/>
              <Route path="admin">
                  <Route index element={<AdminPage />} />
                  <Route path="store">
                      <Route index element={<StorePage />} />
                      <Route path="items" element={<ItemPage />} />
                      <Route path="items/:itemId/positions" element={<PositionPage />}/>
                      <Route path="colours" element={<ColourPage />} />
                      {/* <Route path="positions" element={<PositionPage />} /> */}
                  </Route>
                  <Route path="users" element={<UserPage />} />
              </Route>
        </Route>
        {/* Its is not in root because it does ot require a bar */}
        <Route path="/auth" element={<AuthPage />} /> 
      </Routes>
    </>
  )
}

export default App
