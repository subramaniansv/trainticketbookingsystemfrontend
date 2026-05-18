import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'

import TicketHistory from './pages/TicketHistory'
import Ticket from './pages/Ticket'
import Booking from './pages/Booking'
import Train from './pages/Train'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  const userID = localStorage.getItem("userId")

  const PrivateRoute = ({ children }) => {
    return userID ? children : <Navigate to="/login"/>
  }

  return (

    <BrowserRouter>
<ToastContainer/>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Booking />
            </PrivateRoute>
          }
        />

        <Route
          path="/history"
          element={
            <PrivateRoute>
              <TicketHistory />
            </PrivateRoute>
          }
        />

        <Route
          path="/ticket/:id"
          element={
            <PrivateRoute>
              <Ticket />
            </PrivateRoute>
          }
        />

        <Route
          path="/train/:id/:km"
          element={
            <PrivateRoute>
              <Train />
            </PrivateRoute>
          }
        />

        <Route path="/admin" element={<AdminDashboard />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App