import React, { useState } from 'react'
import { NavLink } from "react-router-dom"
import logo from './logo.png'
import { Button } from "@/components/ui/button"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"


export default function Menu() {



  return (
    <nav className="flex fixed z-50 flex-row justify-between items-center right-0 left-0 top-0  bg-white  bg-opacity-90 backdrop-blur-md h-[60px] px-[1.5vw] shadow-sm">
      <div className="flex flex-row items-center justify-start gap-[10px] p-[100px]">
        <NavLink to="/" >
          <img className="w-[75px] cursor-pointer m-11" src={logo} alt="..." />
        </NavLink>



        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className=' text-[16.5px]'>Recherche</NavigationMenuTrigger>

              <NavigationMenuContent>
                <ul className="grid grid-flow-row w-[125px]">
                  <ListItem to="/Recherche/?searchby=chercheur" isSimple title="Chercheurs" />
                  <ListItem to="/Recherche/?searchby=publication" isSimple title="Publications" />
                  <ListItem to="/Recherche/?searchby=projet" isSimple title="Projets" />
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavLink to="/control"><NavigationMenuTrigger className=' text-[16.5px]'> Panneau de control</NavigationMenuTrigger></NavLink>

              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] border-b-2 border-gray-200">
                  <ListItem to="/control/landingPage" title="Page d'acceill">
                    Modifier le contenu de la page d'acceill
                  </ListItem>
                  <ListItem to="/control/update" title="Mise à jour">
                    - Modifier La Periode automatique <br />- Faire la mise à jour manuellement
                  </ListItem>

                </ul>
                <ul className="grid gap-3 p-2 grid-flow-col w-[500px]">
                  <ListItem to="/control/AddChercheur" title="Ajouter un Chercheur" />
                  <ListItem to="/control/AddProject" title="Ajouter un Projet" />
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

      </div>
      <div className="flex flex-row items-center justify-end gap-5">
        <NavigationMenu>
          <NavigationMenuList>

            <NavigationMenuItem>
              <NavLink to="/aboutus">
                <NavigationMenuLink className={`text-[16.5px] ${navigationMenuTriggerStyle()}`}>
                  About Us
                </NavigationMenuLink>
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLink to="/guide">
                <NavigationMenuLink className={`text-[16.5px] ${navigationMenuTriggerStyle()}`}>
                  Guide
                </NavigationMenuLink></NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLink to="/login">
                <NavigationMenuLink className={`bg-accent-foreground text-accent hover:bg-slate-700 hover:text-accent rounded-3xl ${navigationMenuTriggerStyle()}`}>
                  Connection
                </NavigationMenuLink>
              </NavLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav >
  )
}


function ListItem({ children, title, to, isSimple }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <NavLink to={to}
          className={` ${isSimple ? 'border-b-2 border-white' : null} block select-none space-y-1  p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${((children == null) && (isSimple == false)) ? ' bg-gray-50' : null}`}
        >
          <div className={`text-sm font-medium leading-none ${children == null ? 'flex items-center justify-center' : null}`}>{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>

        </NavLink>
      </NavigationMenuLink>
    </li >
  )
}

ListItem.displayName = "ListItem"