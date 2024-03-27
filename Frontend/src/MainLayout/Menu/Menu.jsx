import React, { useState } from 'react'
import { NavLink } from "react-router-dom"
import logo from './logo.png'
import { Button } from "@/components/ui/button"
export default function Menu() {

  const classes = {
    NormalLink: "hover:opacity-65 active:opacity-40 text-textDark no-underline font-title font-semibold  visited:text-textDark visited:no-underline visited:font-semibold visited:font-title ",
    buttonLink: 'active:opacity-90 bg-buttonDark no-underline  font-normal text-textLight px-[14px] py-[7.5px] rounded-xl border-0 font-semibold font-title text-[15px]'

  }

  return (
    <nav className="flex fixed z-50 flex-row justify-between items-center right-0 left-0 top-0  bg-white h-[60px] px-[1.5vw] shadow-sm border-black border-solid border-0 border-b-[1px]">
      <div className="flex flex-row items-center justify-start gap-[3vw]">
        <NavLink to="/" >
          <img className="w-[80px] cursor-pointer" src={logo} alt="..." />
        </NavLink>
        <div className="flex flex-row items-center justify-start gap-[1.5vw]">
          <NavLink to="/recherche" className={`text-[19px] visited:text-[19px] ${classes.NormalLink} `}>Recherche</NavLink>
          <NavLink to="/control" className={`text-[19px] visited:text-[19px] ${classes.NormalLink} `}>Panneau de control</NavLink></div>
      </div>

      <div className="flex flex-row items-center justify-end gap-5">
        <Button variant="outline">Button</Button>
        <NavLink to="/aboutus" className={classes.NormalLink}>About us</NavLink>
        <NavLink to="/guide" className={classes.NormalLink}>Guide</NavLink>
        <NavLink to="/login" className={classes.buttonLink} >Connection</NavLink>
      </div>
    </nav >
  )
}
