import { useState } from 'react'
import Login from './pages/login/login.jsx'
import SignUp from './pages/signup/signup.jsx'
import Home from './pages/home/home.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='p-4 h-screen flex items-center justify-center'>
       
          < Home />
      
        {/* <SignUp /> */}
        {/* <Login/> */}
      </div>
    </>
  )
}

export default App
