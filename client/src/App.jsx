import { Route, Routes, Navigate } from 'react-router-dom'
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './views/pages/Login/Login'
import Register from './views/pages/Register/Register'
import Chat from './views/pages/Chat/Chat'
import { AuthContext } from './context/AuthContext'
import { useContext } from 'react'
import { ForgotPassword } from './views/pages/Auth/ForgotPassword'
import { CommonContext } from './context/CommonContext'

function App() {
  const { userCurrent } = useContext(AuthContext);
  const { theme, setTheme } = useContext(CommonContext)

  return (
    <div className='uty-app' data-theme={theme}>
      <Routes>
        <Route element={!userCurrent ? <Login /> : <Chat />} path='/login' />
        <Route element={!userCurrent ? <Register /> : <Chat />} path='/register' />
        <Route element={!userCurrent ? <ForgotPassword /> : <Chat />} path='/forgot-password' />
        <Route element={userCurrent ? <Chat /> : <Login />} path='/' />
        <Route element={userCurrent ? <Chat /> : <Login />} path='/*' />
      </Routes>
    </div>
  )
}

export default App
