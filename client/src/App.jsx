import { Route, Routes } from 'react-router-dom'
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './components/views/pages/Login/Login'
import Register from './components/views/pages/Register/Register'
import Chat from './components/views/pages/Chat/Chat'

function App() {

  return (
    <div className='uty-app'>
      <Routes>
        <Route element={<Login />} path='/login' />
        <Route element={<Register />} path='/register' />
        <Route element={<Chat />} path='/' />
        <Route element={<Chat />} path='*' />

      </Routes>
    </div>
  )
}

export default App
