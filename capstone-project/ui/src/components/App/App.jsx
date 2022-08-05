import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider, useAuthContext } from "../../contexts/auth";
import Navbar from "../Navbar/Navbar";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegistrationPage from "../RegistrationPage/RegistrationPage"
import ProfilePage from "../ProfilePage/ProfilePage";
import ChatRoom from "../ChatRoom/ChatRoom";
import NotFound from "../NotFound/NotFound";
import AccessForbidden from "../AccessForbidden/AccessForbidden";
import Loading from "../Loading/Loading"
import "./App.css";

export default function AppContainer() {

return (
    <AuthContextProvider>
      <App/>
    </AuthContextProvider>
)}

function App() {

const { user } = useAuthContext()
const [isLoading, setIsLoading] = React.useState(true);
const [accessDenied, setAccessDenied] = React.useState(true);

React.useEffect(() => {
  
  if (Object.keys(user).length !== 0) {
    setIsLoading(false)
    setAccessDenied(false)
  }
}, [user]);


  return (
    <div className="App">
      <React.Fragment>
        {
          <BrowserRouter>
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path ="/profile" element={isLoading === true && accessDenied === false ? <Loading /> : accessDenied === true && isLoading === false ? <AccessForbidden /> : <ProfilePage />}/>
                <Route path="/room/:id" element={isLoading === true && accessDenied === false ? <Loading /> : accessDenied === true && isLoading === false ? <AccessForbidden /> : <ChatRoom />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </BrowserRouter>
        }
      </React.Fragment>
    </div>
  );
}
