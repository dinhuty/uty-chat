import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/AuthContext.jsx'
import './index.scss'
import ChatProvider from './context/ChatContext.jsx'
import MessageProvider from './context/MessageContext.jsx'
import CommonProvider from './context/CommonContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CommonProvider>
          <ChatProvider>
            <MessageProvider>
              <App />
            </MessageProvider>
          </ChatProvider>
        </CommonProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
  ,)
