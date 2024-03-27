import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-start">
      <img src="https://i.imgur.com/qIufhof.png" className=" h-[30vw]" />
      <div id="info">
        <h2>This page could not be found</h2>
      </div>
    </div>
  );
}
