import React, { useState } from 'react'
import { NavLink, Outlet } from "react-router-dom"
import Menu from './Menu/Menu.jsx'

import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';



export default function MLayout() {


  return (
    <Theme>
      <div className=' bg-background w-full pt-[60px] z-0'>
        <Menu />
        <Outlet context={{
          UserValidation: {
            userInfo: { Role: 1 }
          },
          LandingPage: {
            news: [
              {
                title: 'title',
                paragraphe: 'import React, { useState } from react \n import { NavLink, Outlet } from "react-router-dom" \n import Menu from ./Menu/Menu.jsx',
                img: 'https://img.freepik.com/photos-gratuite/peinture-lac-montagne-montagne-arriere-plan_188544-9126.jpg',
                Subject: 'Best Publication'
              },
              {
                title: 'Not a title',
                paragraphe: 'imrgregt, { useState } from react \n ietghtyrthgLink, Outlet } from "react-router-dom" \n irgergegpojoj*zolmajn,vjaerkhga',
                img: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_640.jpg',
                Subject: 'Best Chercheur'
              }]
          }
        }} />
        <footer className=' bg-buttonLight h-[3vw] w-full flex items-center justify-center text-textLight font-sans font-medium text-[1vw]'>Copyright LMCS Track © 2024 - All rights reserved</footer>
      </div>
    </Theme>

  )
}