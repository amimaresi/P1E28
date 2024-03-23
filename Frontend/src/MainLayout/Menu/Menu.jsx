import React, { useState } from 'react'
import { NavLink } from "react-router-dom"
import logo from './logo.png'

const classes = { NavLink: "text-lg text-textDark no-underline font-semibold font-title visited:text-textDark visited:no-underline visited:font-semibold visited:font-title" }
export default function Menu() {

  const classes = {
    NormalLink: "text-md text-textDark no-underline font-semibold font-title visited:text-textDark visited:no-underline visited:font-semibold visited:font-title",
    buttonLink: 'no-underline bg-buttonDark text-textLight px-5 py-2 rounded-xl border-0 font-semibold font-text text-[15px]'

  }

  return (
    <nav className="flex fixed justify-between items-center right-0 left-0 top-0 bg-white h-[70px] px-[5vw]">
      <div className="flex flex-row items-center justify-center gap-5">
        <NavLink to="/" className={classes.NormalLink}>
          <img className="w-[100px] cursor-pointer" src={logo} alt="..." />
        </NavLink>
        <NavLink to="/dashboard/recherche" className={classes.NormalLink}>Recherche</NavLink>
        <NavLink to="/dashboard/control" className={classes.NormalLink}>Panneau de control</NavLink>
      </div>

      <div className="flex flex-row items-center justify-center gap-5">
        <NavLink to="/aboutus" className={classes.NormalLink}>About us</NavLink>
        <NavLink to="/guide" className={classes.NormalLink}>Guide</NavLink>
        <NavLink className={classes.buttonLink} >Sign in</NavLink>
      </div>
    </nav >
  )
}
