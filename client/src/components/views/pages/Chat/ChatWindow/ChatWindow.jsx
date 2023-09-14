import React from 'react'
import { faList, faPaperPlane, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'

const ChatWindow = () => {
    return (
        <div className='chat-window'>
            <div className="header">
                <div className="header__left">
                    <img src="https://i.pinimg.com/1200x/df/be/0c/dfbe0cc954454f9a68e095631e114ba8.jpg" alt="Avatar" />
                    <div>Dinh tran</div>
                </div>
                <div className="header__right">
                    <div className="icon__call">
                        <FontAwesomeIcon icon={faPhone} />
                    </div>
                    <div className="icon__list">
                        <FontAwesomeIcon icon={faList} />
                    </div>
                </div>
            </div>
            <div className="chat__display">
                <div className='chat-message'>
                    <p>Hôm na Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia ex corporis nam, consequatur molestias ratione labore corrupti reiciendis tenetur aspernatur maxime sequi esse ducimus cumque consequuntur ipsa veritatis dolorem nihil?</p>
                    <span>
                        <FontAwesomeIcon icon={faClock} />
                        1 phút trước
                    </span>
                </div>
                <div className='chat-message user-chat'>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio earum, expedita itaque, sunt obcaecati illum laborum hic libero tenetur perspiciatis labore tempora, dolor delectus voluptas tempore ipsam aliquid nihil repellendus.</p>
                    <span>
                        <FontAwesomeIcon icon={faClock} />
                        1 phút trước
                    </span>
                </div>
                {Array.from({ length: 13 }).map((_, index) => (
                    <div className='chat-message'>
                        <p>Hôm nay la thứ mấy</p>
                        <span>
                            <FontAwesomeIcon icon={faClock} />
                            1 phút trước
                        </span>
                    </div>
                ))}
            </div>
            <div className="chat__bottom">
                <div className="bottom-box">
                    <input type="text" placeholder='Nhập tin nhắn' />
                    <button>
                        Gửi
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChatWindow
