import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './components/Context/AuthContext.jsx'
import './index.scss'
import ChatProvider from './components/Context/ChatContext.jsx'
import MessageProvider from './components/Context/MessageContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ChatProvider>
          <MessageProvider>
            <App />
          </MessageProvider>
        </ChatProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
  ,)
