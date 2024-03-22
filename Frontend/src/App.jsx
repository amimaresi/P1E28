import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom"
import MLayout from './MainLayout/MLayout.jsx'
function ContextProvider() {
  return (
    <Outlet context={{ UserValidation: { user_info: 'hello', isfound: false } }} />
  )
}
export default function App() {


  return (<div className='App'>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MLayout />} >
          <Route index element={<h1 className="text-black">working</h1>} />
          <Route path="login" element={<h1 >Outlet</h1>} >
            <Route index element={<h1>login</h1>} />
            <Route path="resetpassword" element={<h1><br /><br /> reset password </h1>} />
          </Route>
          <Route path="about" element={<h1 className="text-black">working</h1>} />
          <Route path="guide" element={<h1 className="text-black">working</h1>} />
          <Route path='dashboard' element={<h1>PostLayout<Outlet /></h1>} >
            <Route index element={<h1>Dashboard</h1>} />
          </Route>

        </Route>
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Routes>

    </BrowserRouter>

  </div>)
}