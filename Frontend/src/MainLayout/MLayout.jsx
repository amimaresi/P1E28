import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Menu from './Menu/Menu.jsx';

export default function MLayout() {
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem('isLogged') == 'true',
  );
  const [userInfo, setUserInfo] = useState({});
  console.log(localStorage.getItem('isLogged') == 'true');
  return (
    <div className="  z-0 w-full bg-textLight pt-[60px]">
      <Menu
        isLogged={isLogged}
        name="Amar"
        role="Chercheur"
        setIsLogged={setIsLogged}
      />
      <div className=" min-h-screen">
        <Outlet
          context={{
            setIsLogged,
            isLogged,
            userInfo,
            setUserInfo,
          }}
        />
      </div>

      <footer className=" flex h-[40px] w-full items-center  justify-center bg-buttonLight font-sans text-[15px] font-medium text-textLight">
        Copyright LMCS Track © 2024 - All rights reserved
      </footer>
    </div>
  );
}
