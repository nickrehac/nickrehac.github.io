import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Homepage from "./Homepage.jsx";

import "./main.css"


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Homepage/>
    </StrictMode>
)

