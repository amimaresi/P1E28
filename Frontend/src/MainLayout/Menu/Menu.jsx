import React, { useState } from 'react'
import { NavLink } from "react-router-dom"
import logo from './logo.png'

export default function Menu() {

  const classes = {
    NormalLink: "hover:opacity-65 active:opacity-40 text-textDark no-underline font-title font-semibold  visited:text-textDark visited:no-underline visited:font-semibold visited:font-title ",
    buttonLink: 'active:opacity-80 bg-textDark no-underline  font-normal text-textLight px-[14px] py-[6px] rounded-xl border-0 font-semibold font-title text-[15px]'

  }

  return (
    <nav className="flex fixed z-50 flex-row justify-between items-center right-0 left-0 top-0  bg-white h-[55px] px-[1.5vw] shadow">
      <div className="flex flex-row items-center justify-start gap-[4vw]">
        <NavLink to="/" >
          <img className="w-[80px] cursor-pointer" src={logo} alt="..." />
        </NavLink>
        <div className="flex flex-row items-center justify-start gap-[1.5vw]">
          <NavLink to="/dashboard/recherche" className={`text-[19px] visited:text-[19px] ${classes.NormalLink} `}>Recherche</NavLink>
          <NavLink to="/dashboard/control" className={`text-[19px] visited:text-[19px] ${classes.NormalLink} `}>Panneau de control</NavLink></div>
      </div>

      <div className="flex flex-row items-center justify-end gap-5">
        <NavLink to="/aboutus" className={classes.NormalLink}>About us</NavLink>
        <NavLink to="/guide" className={classes.NormalLink}>Guide</NavLink>
        <NavLink to="/login" className={classes.buttonLink} >Log in</NavLink>
      </div>
    </nav >
  )
}
