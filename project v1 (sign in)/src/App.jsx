import React, { useState } from 'react'
import './App.css'
import PreLayout from './Pre Login/PreLayout/PreLayout.jsx'
import Login from './Pre Login/Login/Login.jsx'
import About from './Pre Login/About/About.jsx'
import Guide from './Pre Login/Guide/Guide.jsx'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

export default function App() {


    return (<div className='App'>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PreLayout />} >
                    <Route path="login" element={<Login />} />
                    <Route path="about" element={<About />} />
                    <Route path="guide" element={<Guide />} />
                </Route>
            </Routes>

        </BrowserRouter>

    </div>)
}