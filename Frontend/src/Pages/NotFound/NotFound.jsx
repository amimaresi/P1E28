import React, { useState } from 'react'
import { NavLink, Outlet } from "react-router-dom"





export default function NotFound() {


  return (
    <div className='w-full flex flex-col justify-start h-screen items-center'>
      <img src="https://i.imgur.com/qIufhof.png" className=' h-[30vw]' />
      <div id="info">
        <h2>This page could not be found</h2>
      </div>
    </div >

  )
}