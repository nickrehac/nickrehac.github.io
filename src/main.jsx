import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router";

import Homepage from "./Homepage.jsx";
import ChessPage from "./projectPages/ChessPage.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import Navbar from "./Navbar.jsx";

import "./main.css"
import FluidCanvas from "./FluidCanvas.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <FluidCanvas/>
      <BrowserRouter>
          <Routes>
              <Route index element={ <Homepage/> }/>
              <Route path="/Chess" element={ <ChessPage/> }/>
              <Route path="*" element={ <NotFoundPage/> }/>
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)

