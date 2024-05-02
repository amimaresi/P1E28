import React, { useState , useEffect} from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function Publications() {
useEffect( ()=>{
  console.log("publication here")
},[])
  return(
    <>

      <div>Publications</div>
    </>
  )
}
