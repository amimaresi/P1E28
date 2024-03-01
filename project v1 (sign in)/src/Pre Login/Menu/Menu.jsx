import React from "react";
import './Menu.css'
import logo from "./logo2.png"
import { NavLink } from "react-router-dom"
export default function Menu() {


    return (<div>
        <div className="menu">

            <div className="menu-logo">
                <img src={logo} border="0" />
            </div>


            <div className="menu-links">
                <NavLink to="/about" className="menu-link">About</NavLink>
                <NavLink to="/guide" className="menu-link">Guide</NavLink>
                <button ><NavLink to="/login">Login</NavLink></button>
            </div>


        </div>
    </div>)
}