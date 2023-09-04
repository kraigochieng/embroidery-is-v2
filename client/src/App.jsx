import './App.css'
import {Routes, Route} from "react-router-dom"


import Navbar from './components/Navbar'
// Pages
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import StorePage from './pages/StorePage'
import AuthPage from './pages/AuthPage'
import UsersPage from './pages/UsersPage'
import ColoursPage from './pages/ColoursPage'
import ItemsPage from './pages/ItemsPage'
import PositionsPage from './pages/PositionsPage'
import AccountsPage from './pages/AccountsPage'

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
                      <Route path="items" element={<ItemsPage />} />
                      <Route path="items/:itemId/positions" element={<PositionsPage />}/>
                      <Route path="colours" element={<ColoursPage />} />
                  </Route>
                  <Route path="accounts">
                    <Route index element={<AccountsPage />} />
                      <Route path="users" element={<UsersPage />}/>
                  </Route>
              </Route>
        </Route>
        {/* Its is not in root because it does ot require a bar */}
        <Route path="/auth" element={<AuthPage />} /> 
      </Routes>
    </>
  )
}

export default App
