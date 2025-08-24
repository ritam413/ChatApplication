import { useState } from 'react'
import Login from './pages/login/login.jsx'
import SignUp from './pages/signup/signup.jsx'
import Home from './pages/home/home.jsx'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './Context/AuthContext.jsx'


function App() {
  const {authUser} = useAuthContext();
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className='p-4 h-screen flex items-center justify-center '>

        <Routes>

          <Route path='/signup' element={ authUser ? <Navigate to="/" /> : <SignUp />} />
          <Route path='/login' element={ authUser? <Navigate to="/" /> : <Login />} />
          <Route path='/' element={authUser ? <Home /> : <Navigate to="/login" />} />

        </Routes>
      </div>
    </>
  )
}

export default App
