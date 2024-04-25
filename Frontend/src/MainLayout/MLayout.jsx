import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Menu from './Menu/Menu.jsx';

export default function MLayout() {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <div className="  z-0 min-h-screen w-full bg-textLight pt-[60px]">
      <Menu
        isLogged={isLogged}
        name="Amar"
        role="Chercheur"
        setIsLogged={setIsLogged}
      />
      <Outlet
        context={{
          setIsLogged: { setIsLogged },
          LandingPage: {
            news: [
              {
                title: 'title',
                paragraphe:
                  'import React, { useState } from react \n import { NavLink, Outlet } from "react-router-dom" \n import Menu from ./Menu/Menu.jsx',
                img: 'https://img.freepik.com/photos-gratuite/peinture-lac-montagne-montagne-arriere-plan_188544-9126.jpg',
                Subject: 'Best Publication',
              },
              {
                title: 'Not a title',
                paragraphe:
                  'imrgregt, { useState } from react \n ietghtyrthgLink, Outlet } from "react-router-dom" \n irgergegpojoj*zolmajn,vjaerkhga',
                img: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_640.jpg',
                Subject: 'Best Chercheur',
              },
            ],
          },
        }}
      />
      <footer className=" flex h-[3vw] w-full items-center  justify-center bg-buttonLight font-sans text-[1vw] font-medium text-textLight">
        Copyright LMCS Track © 2024 - All rights reserved
      </footer>
    </div>
  );
}
