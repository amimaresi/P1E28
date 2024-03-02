import React, { useState } from 'react'
import './App.css'
import PreLayout from './Pre Login/PreLayout/PreLayout.jsx'
import Login from './Pre Login/Login/Login.jsx'
import About from './Pre Login/About/About.jsx'
import Guide from './Pre Login/Guide/Guide.jsx'
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom"

export default function App() {


    return (<div className='App'>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PreLayout />} >
                    <Route index element={<Login />} />
                    <Route path="login" element={<Login />} />
                    <Route path="resetpassword" element={<h1 >reset Password</h1>} />
                    <Route path="about" element={<About />} />
                    <Route path="guide" element={<Guide />} />
                </Route>
                <Route path='/dashboard' element={<h1>PostLayout<Outlet /></h1>} >
                    <Route index element={<h1>Dashboard</h1>} />
                </Route>

                <Route path='*' element={<h1>404 Not Found</h1>} />
            </Routes>

        </BrowserRouter>

    </div>)
}