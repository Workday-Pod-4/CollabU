import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "../Navbar/Navbar"


export default function App() {
  return (
    <div className="App">
      <React.Fragment>
        {
          <BrowserRouter>
          <Navbar />
            <main>
              <Routes>




              </Routes>
            </main>
          </BrowserRouter>
        }
      </React.Fragment>
    </div>
  );
}
