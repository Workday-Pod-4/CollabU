import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "../Navbar/Navbar";
import RegistrationPage from "../RegistrationPage/RegistrationPage";

export default function App() {
  return (
    <div className="App">
      <React.Fragment>
        {
          <BrowserRouter>
          <Navbar/>
            <main>
              <Routes>
                <Route path="/register" element={<RegistrationPage />} />



              </Routes>
            </main>
          </BrowserRouter>
        }
      </React.Fragment>
    </div>
  );
}
