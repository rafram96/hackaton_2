//import { createRoot } from 'react-dom/client'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path='/Dashboard' element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
