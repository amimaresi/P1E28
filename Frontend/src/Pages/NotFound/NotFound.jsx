import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import image from './image.svg';
export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-start">
      <img src={image} className=" mt-[10%] h-[50%]" />
    </div>
  );
}
