import { useEffect, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [userCurrent, setUserCurrent] = useState(null)
    const [accessToken, setAccessToken] = useState(null)
    console.log(typeof accessToken)
    useEffect(() => {
        const userCurrent = localStorage.getItem('user')
        const token  = localStorage.getItem('token')
        console.log(token)
        if (userCurrent) {
            setUserCurrent(JSON.parse(userCurrent))
            setAccessToken(token)
        }
    }, [])
    return (
        <AuthContext.Provider value={{
            userCurrent,
            setUserCurrent,
            accessToken, 
            setAccessToken
        }} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;