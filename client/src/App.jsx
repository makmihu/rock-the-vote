import { useContext } from 'react'
import { UserContext } from './context/UserContext'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/sections/Navbar'
import Profile from './components/pages/Profile'
import Login from './components/pages/Login'
import Issues from './components/pages/AllIssues'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  const { token } = useContext(UserContext)

  return (
    <>
      {token && <Navbar />}

      <Routes>
        <Route 
          path='/'
          element={token ? <Navigate to="/profile"/> :<Login />}
        />
        <Route 
          path='/profile'
          element={<ProtectedRoute token={token}>
            <Profile />
          </ProtectedRoute> }        
        />
        <Route 
          path='/issues'
          element={<ProtectedRoute token={token}>
            <Issues />
          </ProtectedRoute>}        
        />
      </Routes>
    </>
  )
}