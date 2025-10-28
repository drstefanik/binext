import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles.css'
import Home from './screens/Home.jsx'
import Login from './screens/Login.jsx'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
])

createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)
