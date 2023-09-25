import React, { createContext, useState, useContext } from 'react';

export const CommonContext = createContext()

const CommonProvider = ({ children }) => {
    //profile
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const [darkMode, setDarkMode] = useState(false)
    const [isPopup, setIsPopup] = useState(false)
    const [isActionProfile, setIsActionProfile] = useState(false)
    const [imageChangeAvatar, setImageChangeAvatar] = useState('')
    //chats
    const [addHandle, setAddHandle] = useState(false)
    const [deleteHandle, setDeleteHandle] = useState(false)
    const [leaveGroupHandle,setLeaveGroupHandle] = useState(false)
    return (
        <CommonContext.Provider value={{
            isProfileOpen,
            setIsProfileOpen,
            isOpenMenu,
            setIsOpenMenu,
            darkMode,
            setDarkMode,
            isPopup,
            setIsPopup,
            isActionProfile, 
            setIsActionProfile,
            addHandle,
            setAddHandle,
            deleteHandle, 
            setDeleteHandle,
            leaveGroupHandle,
            setLeaveGroupHandle,
            imageChangeAvatar, 
            setImageChangeAvatar
        }}>
            {children}
        </CommonContext.Provider>
    )
}

export default CommonProvider