import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <React.Fragment>
        {
          <BrowserRouter>
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
