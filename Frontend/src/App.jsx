import React, { useState } from 'react'
import { Route, Outlet, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import MLayout from './MainLayout/MLayout.jsx'
import LandingPage from './Pages/Landing Page/LandingPage.jsx'
function ContextProvider() {
  return (
    <Outlet context={{ UserValidation: { user_info: 'hello', isfound: false } }} />
  )
}
const router = createBrowserRouter(createRoutesFromElements(

  <Route path="/" element={<MLayout />} >
    <Route index element={<LandingPage />} />
    <Route path="login" element={<h1 >Outlet</h1>} >
      <Route index element={<h1>login</h1>} />
      <Route path="resetpassword" element={<h1><br /><br /> reset password </h1>} />
    </Route>
    <Route path="about" element={<h1 className="text-black">working</h1>} />
    <Route path="guide" element={<h1 className="text-black">working</h1>} />
    <Route path='dashboard' element={<h1>PostLayout<Outlet /></h1>} >
      <Route index element={<h1>Dashboard</h1>} />
    </Route>
    <Route path='*' element={<><br /><br /><br /><h1 className=' text-4xl text-textDark'>404 Not Found</h1></>} />
  </Route>

))
export default function App() {


  return (
    <RouterProvider router={router} />
  )
}