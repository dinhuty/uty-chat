import React, { useContext, useEffect, useState } from 'react'
import { CommonContext } from '../../../context/CommonContext'
import { ChatContext } from '../../../context/ChatContext'
import { AuthContext } from '../../../context/AuthContext'
import { createGroupChat } from '../../../services/Api/chat'
import avatar from '../../../assets/svg/avatar-boy.svg'
import leftArrowIcon from '../../../assets/svg/left-arrow-backup-2-svgrepo-com.svg'
import Avatar from '../Avatar'
import { searchUser } from '../../../services/Api/search'


const CreateGroup = () => {
    const [searchText, setSearchText] = useState('')
    const { isPopup,
        setIsPopup,
        setIsOpenMenu
    } = useContext(CommonContext)
    const [listSearch, setListSearch] = useState(null)
    const { infoChatCurrent, setIdChatCurrent } = useContext(ChatContext)
    const { userCurrent } = useContext(AuthContext)
    const [listCheck, setListCheck] = useState(null)
    const hanldeCreateGroupChat = async () => {
        const data = {
            name: "",
            participantIds: listCheck
        }
        const res = await createGroupChat(data)
        console.log(res)
        setIdChatCurrent(res.data.chat._id)
        setSearchText('')
        setIsPopup(false)
        setIsOpenMenu(false)

    }
    useEffect(() => {
        if (!searchText.trim()) {
            setListSearch([])
            return
        }
        const getData = setTimeout(async () => {
            const list = await searchUser(searchText, infoChatCurrent.participants.map(user => user._id));
            setListSearch(list)
        }, 500)
        return () => clearTimeout(getData)
    }, [searchText])
    useEffect(() => {
        if (infoChatCurrent && isPopup) {
            setListCheck(infoChatCurrent.participants.map(user => user._id))
        }
    }, [isPopup])
    const toggleCheck = (userId) => {
        if (listCheck.includes(userId)) {
            setListCheck(listCheck.filter((id) => id !== userId));
        } else {
            setListCheck([...listCheck, userId]);
        }
    };
    return (
        <div className="wrapper-create__popup">
            <div className="popup-header">
                <div className="popup__back" onClick={() => {
                    setIsPopup(false)
                    setSearchText('')
                }}>
                    <img src={leftArrowIcon} alt="" />
                </div>
                <span>Tạo nhóm mới</span>
            </div>
            <div className="popup-box">
                <div className="popup-search">
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder='nhập tên thành viên'
                    />
                    <button onClick={hanldeCreateGroupChat}>Create</button>
                </div>
                <div className="popup-list">
                    {listSearch?.length > 0 && listSearch.map((user, index) => (
                        <div className="list__item" key={index} onClick={() => toggleCheck(user._id)}>
                            <div className="item-info">
                                <div className="avatar">
                                    <Avatar avatar={avatar} />
                                </div>
                                <div className="name">
                                    <span>{user.firstName}</span>
                                    <span>{user.lastName}</span>
                                </div>
                            </div>
                            <div className="item-check" >
                                {listCheck.includes(user._id) ? "✓" : "◻"}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CreateGroup
