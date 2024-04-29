import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Menu from './Menu/Menu.jsx';

export default function MLayout() {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <div className="  z-0 w-full bg-textLight pt-[60px]">
      <Menu
        isLogged={isLogged}
        name="Amar"
        role="Chercheur"
        setIsLogged={setIsLogged}
      />
      <Outlet
        context={{
          setIsLogged,
        }}
      />
      <footer className=" flex h-[40px] w-full items-center  justify-center bg-buttonLight font-sans text-[15px] font-medium text-textLight">
        Copyright LMCS Track © 2024 - All rights reserved
      </footer>
    </div>
  );
}
