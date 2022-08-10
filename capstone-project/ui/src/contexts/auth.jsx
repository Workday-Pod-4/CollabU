import * as React from "react"
import { createContext, useState, useEffect, useContext } from "react"
import apiClient from "../services/apiClient"

const AuthContext = createContext(null)

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [initialized, setInitialized] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState("")
    const [isUpdating, setIsUpdating] = useState(false)
    const [firstTime, setFirstTime] = useState(false)
    const [chatOpen, setChatOpen] = useState(false)
    const [prefModal, setPrefModal] = useState(false);
    const [settingsModal, setSettingsModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [reportModal, setReportModal] = useState(false);
    const [inRoom, setInRoom] = useState(false);
    const [matchModal, setMatchModal] = useState(false);
    const [exiting, setExiting] = useState(false);
    const [findingAnotherBuddy, setFindingAnotherBuddy] = useState(false);
    const [chatMessages, setChatMessages] = React.useState([]);
    const [disconnected, setDisconnected] = React.useState(false);

    //function for toggling report issue modal
    function toggleReportModal() {
      setReportModal(!reportModal)
    }

    // function for toggling settings modal, 
    // should be set to true if user clicks settings  
    // and false if user presses close button on modal
    function toggleSettingsModal() {
    setSettingsModal(!settingsModal)
    }

    // function for toggling pref modal, 
    // should be set to true if user clicks find a buddy 
    // and false if user presses close button on modal
    function togglePrefModal() {
      setPrefModal(!prefModal)
    }

    // Fetchs user from database and sets token
    useEffect(() => {

        const fetchUser = async () => {

          const { data, error } = await apiClient.fetchUserFromToken()

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

    // Log users out
    const logoutUser = async () => {
        await apiClient.logoutUser()
        setUser({})
        setError(null)
    }
    
    const authValue = { user, 
      setUser,
      error,
      setError,
      initialized,
      setInitialized,
      isProcessing,
      setIsProcessing,
      logoutUser,
      isUpdating,
      setIsUpdating,
      prefModal,
      setPrefModal,
      togglePrefModal,
      firstTime,
      setFirstTime,
      settingsModal,
      setSettingsModal,
      toggleSettingsModal,
      chatOpen,
      setChatOpen,
      isLoading,
      setIsLoading,
      reportModal,
      setReportModal,
      toggleReportModal,
      setInRoom,
      inRoom, 
      setMatchModal, 
      matchModal,
      exiting,
      setExiting,
      findingAnotherBuddy, 
      setFindingAnotherBuddy,
      chatMessages,
      setChatMessages,
      disconnected,
      setDisconnected
    }

    return (
        <AuthContext.Provider value={authValue}>
            <>{children}</>
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)