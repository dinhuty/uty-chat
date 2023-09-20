import React, { createContext, useState, useContext } from 'react';

export const ProfileContext = createContext()

const ProfileProvider = ({ children }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isOpenMenu, setIsOpenMenu] = useState(false)

    return (
        <ProfileContext.Provider value={{
            isProfileOpen,
            setIsProfileOpen,
            isOpenMenu,
            setIsOpenMenu
        }}>
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileProvider