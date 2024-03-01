import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import Menu from '../Menu/Menu.jsx'
import Login from '../Login/Login.jsx'
import './PreLayout.css'

export default function PreLayout() {

    return (<div className='PreLayout'>
        <Menu />
        <Outlet />

    </div>
    )
}