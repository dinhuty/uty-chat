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
import Profile from '../../components/Profile'
import { CommonContext } from '../../../context/CommonContext'
import ChatMenu from './ChatMenu/ChatMenu'
import ChatLoading from '../Loading/ChatLoading'
import { MessageContext } from '../../../context/MessageContext'
import { ImageDetail } from '../../components/ImageDetail'
import { ImagePreview } from '../../components/Modal/ImagePreview'
import { AppLoading } from '../Loading/AppLoading'

const Chat = () => {
  const { loading } = useContext(ChatContext)
  const { imageOpen } = useContext(MessageContext)
  const { isProfileOpen, isOpenMenu, imageChangeAvatar, isChatting } = useContext(CommonContext)

  return (
    <div className='app-chat'>
      {loading ? <AppLoading /> :
        <div className="chat-main">
          <div className={imageChangeAvatar ? "chat-main__img-preview active" : "chat-main__img-preview"}>
            <ImagePreview />
          </div>
          <div className={imageOpen ? "chat-main__img-detail active" : "chat-main__img-detail"}>
            <ImageDetail />
          </div>
          <div className={isProfileOpen ? "chat-main__profile active" : "chat-main__profile"}>
            <Profile />
          </div>
          <div className={isOpenMenu ? "chat-main__options active" : "chat-main__options"}>
            <ChatMenu />
          </div>
          <div className="app-chat__menu">
            <SideMenu />
          </div>
          <div className={isChatting ? "app-chat__side mobile desktop" : "app-chat__side"}>
            <ChatSide />
          </div>
          <ChatWindow />
        </div>
      }

    </div>
  )
}

export default Chat
