import React, { useState } from 'react'
import { NavLink, Outlet } from "react-router-dom"
import Menu from './Menu/Menu.jsx'
function ContextProvider() {
  return (
    <Outlet context={{ UserValidation: { user_info: 'hello', isfound: false } }} />
  )
}
export default function MLayout() {


  return (<>
    <Menu />
    <Outlet />
  </>



  )
}