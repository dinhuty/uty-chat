import { useEffect, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [userCurrent, setUserCurrent] = useState(null)
    const [token, setToken] = useState(null)

    useEffect(() => {
        const userCurrent = localStorage.getItem('user')

        if (userCurrent) {
            setUserCurrent(JSON.parse(userCurrent))
        }
    }, [])
    return (
        <AuthContext.Provider value={{
            userCurrent,
            setUserCurrent,
            token,
            setToken
        }} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;