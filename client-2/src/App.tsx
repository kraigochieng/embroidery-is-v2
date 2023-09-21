import { useReducer } from 'react'
import './App.css'

import { Route, Routes } from 'react-router-dom'

// Components
import Navbar from "./components/Navbar"

// Pages
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import StorePage from './pages/StorePage'
import ColoursPage from './pages/ColoursPage'
import AuthPage from './pages/AuthPage'
import ItemsPage from './pages/ItemsPage'
import PositionsPage from './pages/PositionsPage'

// Contexts
import { ColoursContext } from './contexts/ColoursContext'
import { ItemsContext } from './contexts/ItemsContext'
import { PositionsContext } from './contexts/PositionsContext'

// Reducers
import { itemsInitialState, itemsReducer } from './reducers/itemsReducer'
import { coloursInitialState, coloursReducer } from './reducers/coloursReducer'
import { positionsInitialState, positionsReducer } from './reducers/positionsReducer'


function App() {

  const [coloursState, coloursDispatch] = useReducer(coloursReducer, coloursInitialState)
  const [itemsState, itemsDispatch]= useReducer(itemsReducer, itemsInitialState)
  const [positionsState, positionsDispatch] = useReducer(positionsReducer, positionsInitialState)
  
  return (
  <>
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<HomePage />} />
        <Route path="admin">
          <Route index element={<AdminPage />} />
          <Route path="store">
            <Route index element={<StorePage />}/>
              <Route path="colours" element={
                <ColoursContext.Provider value={{coloursState, coloursDispatch}}>
                  <ColoursPage />
                </ColoursContext.Provider>
              }/>
              <Route path="items" element={
                <ItemsContext.Provider value={{itemsState, itemsDispatch}}>
                  <ItemsPage />
                </ItemsContext.Provider>
              }/>
          
              <Route path="items/:itemId/positions" element={
                <PositionsContext.Provider value={{positionsState, positionsDispatch}}>
                  <PositionsPage />
                </PositionsContext.Provider>
              }/>

          </Route>
        </Route>
      </Route>
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  </>
)
}

export default App
