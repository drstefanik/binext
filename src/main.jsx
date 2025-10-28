import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles.css'
import Home from './screens/Home.jsx'
import Login from './screens/Login.jsx'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/signup-school', element: <div className="p-8">Signup School (OTP) – in arrivo</div> },
  { path: '/signup-student', element: <div className="p-8">Signup Student – in arrivo</div> },
])

createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)
