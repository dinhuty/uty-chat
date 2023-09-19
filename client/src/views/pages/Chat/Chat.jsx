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

const Chat = () => {
  const [checked, setChecked] = useState(false)
  const { userCurrent } = useContext(AuthContext);
  const { loading } = useContext(ChatContext)
  console.log(loading)
  return (
    <div className='app-chat'>
      {/* <div className={`${!checked ? "chat__header" : "chat__header dark"}`}>
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
            <img className="w-10 h-10 rounded-full" src={avatar} alt="Rounded avatar" />
            <div className="user__info">
              <div className="user__name">
                <span>{userCurrent.lastName}</span>
                <span>{userCurrent.firstName}</span>
              </div>
              <div className="user__desc">
                {userCurrent.email}
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {loading ? <Loading /> :
        <div className="chat__main">
          <SideMenu />
          <ChatSide />
          <ChatWindow />
        </div>
      }

    </div>
  )
}

export default Chat
