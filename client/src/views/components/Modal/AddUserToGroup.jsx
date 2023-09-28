import React, { useContext, useEffect, useState } from 'react'
import { CommonContext } from '../../../context/CommonContext'
import { ChatContext } from '../../../context/ChatContext'
import { AuthContext } from '../../../context/AuthContext'
import { addUserToGroupChat } from '../../../services/Api/chat'
import avatar from '../../../assets/svg/avatar-boy.svg'
import leftArrowIcon from '../../../assets/svg/left-arrow-backup-2-svgrepo-com.svg'
import Avatar from '../Avatar'
import radioCheck from '../../../assets/svg/gui-form-radio-svgrepo-com.svg'
import radioChecked from '../../../assets/svg/gui-form-radio-checked-svgrepo-com.svg'
import { searchUser } from '../../../services/Api/search'
import Image from '../../common/Image'

export const AddUserToGroup = () => {
    const [searchText, setSearchText] = useState('')
    const { isPopup,
        setIsPopup,
        setIsOpenMenu,
        addHandle,
        setAddHandle,
    } = useContext(CommonContext)
    const [listSearch, setListSearch] = useState(null)
    const { infoChatCurrent,
        idChatCurrent,
        sentRef,
        setSent,
    } = useContext(ChatContext)
    const { userCurrent, accessToken } = useContext(AuthContext)
    const [listCheck, setListCheck] = useState([])
    const [listBoxCurrent, setListBoxCurrent] = useState()

    const hanldeAddUserToGroupChat = async () => {
        const data = {
            chatId: idChatCurrent,
            userIds: listCheck
        }
        const res = await addUserToGroupChat(data, accessToken)
        console.log("hanldeAddUserToGroupChat", res)
        setSearchText('')
        setIsPopup(false)
        setIsOpenMenu(false)
        sentRef.current = !sentRef.current;
        setSent(sentRef.current);
        setListCheck([])
        setAddHandle(!addHandle)
    }
    useEffect(() => {
        if (!searchText.trim()) {
            setListSearch([])
            return
        }
        const getData = setTimeout(async () => {
            const list = await searchUser(searchText, [...listBoxCurrent]);
            setListSearch(list)
        }, 500)
        return () => clearTimeout(getData)
    }, [searchText])
    useEffect(() => {
        if (infoChatCurrent) {
            const idList = infoChatCurrent.participants.map(participant => participant._id);
            setListBoxCurrent([userCurrent._id, ...idList])
        }
    }, [isPopup])
    const toggleCheck = (userId) => {

        if (listCheck.includes(userId)) {
            setListCheck(listCheck.filter((id) => id !== userId));
        } else {
            setListCheck([...listCheck, userId]);
        }
    };
    console.log("listCurrent", listBoxCurrent)
    console.log("LISTCHECK", listCheck)
    return (
        <div className="wrapper-add__popup">
            <div className="popup-header">
                <div className="popup__back" onClick={() => {
                    setIsPopup(false)
                    setSearchText('')
                    setListCheck([])
                }}>
                    <img src={leftArrowIcon} alt="" />
                </div>
                <span>Thêm thành viên</span>
            </div>
            <div className="popup-box">
                <div className="popup-search">
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder='nhập tên thành viên'
                    />
                    <button className={listCheck.length < 1 ? "disable" : ""} onClick={hanldeAddUserToGroupChat}>Thêm</button>
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
                                {listCheck && listCheck?.includes(user._id) ?
                                    <Image image={radioChecked} className="image" />
                                    :
                                    <Image image={radioCheck} className="image" />}

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
