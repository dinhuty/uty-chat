import React, { useState } from 'react'
import Logo from "../../../../assets/login-logo.svg"
import { faBell } from "@fortawesome/free-regular-svg-icons"
import SideMenu from './SideMenu/SideMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ChatSide from './ChatSide/ChatSide'
import ChatWindow from './ChatWindow/ChatWindow'

const Chat = () => {
  const [checked, setChecked] = useState(false)
  return (
    <div className='app-chat'>
      <div className={`${!checked ? "chat__header" : "chat__header dark"}`}>
        <div className="header__logo">
          <img src={Logo} alt="" />
          <span>UTY Messenger</span>
        </div>
        <div className="header__right">
          <div className="header__right__mode">
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" checked={checked} onChange={() => setChecked(!checked)} />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="header__right__noti">
            <FontAwesomeIcon icon={faBell} />
          </div>
          <div className="header__right__user">
            <img className="w-10 h-10 rounded-full" src="https://i.pinimg.com/1200x/df/be/0c/dfbe0cc954454f9a68e095631e114ba8.jpg" alt="Rounded avatar" />
            <div className="user__info">
              <div className="user__name">
                Dinh Tran
              </div>
              <div className="user__desc">
                Active
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="chat__main">
        <SideMenu />
        <ChatSide />
        <ChatWindow />
      </div>
    </div>
  )
}

export default Chat
