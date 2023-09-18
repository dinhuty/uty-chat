import { useEffect, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [userCurrent, setUserCurrent] = useState(null)
    const [token, setToken] = useState(null)
    console.log(userCurrent)
    useEffect(() => {
        const userCurrent = localStorage.getItem('user')

        if (userCurrent) {
            console.log("đã có user")
            setUserCurrent(JSON.parse(userCurrent))
        } else {
            console.log("chưa có user")
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