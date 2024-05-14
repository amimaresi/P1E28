import React, { useState } from 'react';
import { NavLink, Navigate, Outlet, useOutletContext } from 'react-router-dom';
import NotAllowed from '../NotAllowed/NotAllowed';

export default function Control() {
  const { isLogged, userInfo } = useOutletContext();
  return userInfo &&
    (userInfo.type == 'Assistant' || userInfo.type == 'Directeur') &&
    isLogged ? (
    <Outlet />
  ) : (
    <NotAllowed />
  );
}
