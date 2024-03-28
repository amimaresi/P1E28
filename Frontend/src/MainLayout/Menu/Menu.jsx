import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from './logo.png';
import { Button } from '@/components/ui/button';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export default function Menu() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex h-[60px] flex-row items-center  justify-between  bg-white bg-opacity-90 px-[1.5vw] shadow-sm backdrop-blur-md">
      <div className="m-[100px] flex flex-row items-center justify-start gap-[10px]">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavLink to="/">
                <NavigationMenuLink
                  className={`items-baseline font-title font-black text-buttonDark underline decoration-[3px] underline-offset-4 hover:bg-white hover:text-buttonLight ${navigationMenuTriggerStyle()}`}
                >
                  <h3 className=" text-[23px] ">LMCS: </h3>
                  <h3 className=" text-[18px] ">Track</h3>
                </NavigationMenuLink>
              </NavLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className=" text-[16.5px]">
                Recherche
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                <ul className="grid w-[125px] grid-flow-row">
                  <ListItem
                    to="/Recherche/?searchby=chercheur"
                    isSimple
                    title="Chercheurs"
                  />
                  <ListItem
                    to="/Recherche/?searchby=publication"
                    isSimple
                    title="Publications"
                  />
                  <ListItem
                    to="/Recherche/?searchby=projet"
                    isSimple
                    title="Projets"
                  />
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavLink to="/control">
                <NavigationMenuTrigger className=" text-[16.5px]">
                  {' '}
                  Panneau de control
                </NavigationMenuTrigger>
              </NavLink>

              <NavigationMenuContent>
                <ul className="grid gap-3 border-b-2 border-gray-200 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <ListItem to="/control/landingPage" title="Page d'acceill">
                    Modifier le contenu de la page d'acceill
                  </ListItem>
                  <ListItem to="/control/update" title="Mise à jour">
                    - Modifier La Periode automatique <br />- Faire la mise à
                    jour manuellement
                  </ListItem>
                </ul>
                <ul className="grid w-[500px] grid-flow-col gap-3 p-2">
                  <ListItem
                    to="/control/AddChercheur"
                    title="Ajouter un Chercheur"
                  />
                  <ListItem
                    to="/control/AddProject"
                    title="Ajouter un Projet"
                  />
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
                <NavigationMenuLink
                  className={`text-[16.5px] ${navigationMenuTriggerStyle()}`}
                >
                  About Us
                </NavigationMenuLink>
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLink to="/guide">
                <NavigationMenuLink
                  className={`text-[16.5px] ${navigationMenuTriggerStyle()}`}
                >
                  Guide
                </NavigationMenuLink>
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLink to="/login">
                <Button
                  className={` h-[35px] rounded-xl bg-buttonDark px-4 text-textLight hover:bg-slate-700 hover:text-textLight `}
                >
                  Connection
                </Button>
              </NavLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}

function ListItem({ children, title, to, isSimple }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <NavLink
          to={to}
          className={` ${isSimple ? 'border-b-2 border-white' : null} block select-none space-y-1  p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${children == null && isSimple == false ? ' bg-gray-50' : null}`}
        >
          <div
            className={`text-sm font-medium leading-none ${children == null ? 'flex items-center justify-center' : null}`}
          >
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </NavLink>
      </NavigationMenuLink>
    </li>
  );
}

ListItem.displayName = 'ListItem';
