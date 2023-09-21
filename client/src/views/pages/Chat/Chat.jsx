import React, { useContext, useState } from 'react'
import Logo from "../../../assets/svg/login-logo.svg"
import { faBell } from "@fortawesome/free-regular-svg-icons"
import SideMenu from './SideMenu/SideMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ChatSide from './ChatSide/ChatSide'
import ChatWindow from './ChatWindow/ChatWindow'
import avatar from "../../../assets/svg/avatar-boy.svg"
import { AuthContext } from '../../../context/AuthContext'
import { ChatContext } from '../../../context/ChatContext'
import Loading from '../Loading/Loading'
import Profile from '../../components/Profile'
import ChatMenu from './ChatWindow/ChatMenu/ChatMenu'
import { CommonContext } from '../../../context/CommonContext'

const Chat = () => {
  const [checked, setChecked] = useState(false)
  const { userCurrent } = useContext(AuthContext);
  const { loading } = useContext(ChatContext)
  const { isProfileOpen,
    setIsProfileOpen,
    isOpenMenu,
    setIsOpenMenu } = useContext(CommonContext)

  return (
    <div className='app-chat'>
      {loading ? <Loading /> :
        <div className="chat-main">
          <div className={isProfileOpen ? "chat-main__profile active" : "chat-main__profile"}>
            <Profile />
          </div>
          <div className={isOpenMenu ? "chat-main__options active" : "chat-main__options"}>
            <ChatMenu />
          </div>
          <SideMenu />
          <ChatSide />
          <ChatWindow />
        </div>
      }

    </div>
  )
}

export default Chat
