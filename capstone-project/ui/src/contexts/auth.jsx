import * as React from "react"
import { createContext, useState, useContext } from "react"
import apiClient from "../services/apiClient"

const AuthContext = createContext(null)


export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [initialized, setInitialized] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState("")
    
    React.useEffect(() => {

        const fetchUser = async () => {

          const { data, error } = await apiClient.getUserFromToken()

          if (error) {
            setError(error)
          }

          if (data) {
            setUser(data.user)
            setError(null)
          }

          setInitialized(true);
        }
    
        const token = localStorage.getItem("capstone_token")

        if (token) {
            apiClient.setToken(token)
            setIsProcessing(true)
            setError(null)
            fetchUser()
        } else {
            setIsProcessing(false)
            setInitialized(true)
        }
      }, [setUser])

    const logoutUser = async () => {
        await apiClient.logoutUser()
        setUser({})
        setError(null)
    }

    const authValue = { user, 
        setUser ,
        error,
        setError,
        initialized,
        setInitialized,
        isProcessing,
        setIsProcessing,
        logoutUser
    }

    return (
        <AuthContext.Provider value={authValue}>
            <>{children}</>
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)