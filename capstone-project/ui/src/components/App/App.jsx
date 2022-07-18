import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "../Navbar/Navbar"
import LoginPage from "../LoginPage/LoginPage"

export default function App() {
  return (
    <div className="App">
      <React.Fragment>
        {
          <BrowserRouter>
          <Navbar />
            <main>
              <Routes>
                <Route path="/login" element={<LoginPage />} />



              </Routes>
            </main>
          </BrowserRouter>
        }
      </React.Fragment>
    </div>
  );
}
