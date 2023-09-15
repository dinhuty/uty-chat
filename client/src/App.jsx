import { Route, Routes, Navigate } from 'react-router-dom'
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './components/views/pages/Login/Login'
import Register from './components/views/pages/Register/Register'
import Chat from './components/views/pages/Chat/Chat'
import { AuthContext } from './components/Context/AuthContext'
import { useContext } from 'react'

function App() {
  const { userCurrent } = useContext(AuthContext);
  return (
    <div className='uty-app'>
      <Routes>
        <Route element={!userCurrent ? <Login /> : <Chat />} path='/login' />
        <Route element={!userCurrent ? <Register /> : <Chat />} path='/register' />
        <Route element={userCurrent ? <Chat /> : <Login />} path='/' />
        <Route element={userCurrent ? <Chat /> : <Login />} path='/*' />

      </Routes>
    </div>
  )
}

export default App
