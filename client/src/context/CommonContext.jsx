import React, { createContext, useState, useContext } from 'react';

export const CommonContext = createContext()

const CommonProvider = ({ children }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const [darkMode, setDarkMode] = useState(false)
    const [isPopup, setIsPopup] = useState(false)
    const [addHandle, setAddHandle] = useState(false)

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
            addHandle,
            setAddHandle
        }}>
            {children}
        </CommonContext.Provider>
    )
}

export default CommonProvider