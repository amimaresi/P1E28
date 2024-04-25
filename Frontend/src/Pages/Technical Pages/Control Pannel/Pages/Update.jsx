import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

fetch("https://pokeapi.co/api/v2/pokemon/ditto")
.then(response =>{
 
  if(!response.ok){
    throw new Error("could not fetch resource");
  }
  return  response.json();
})
.then(data=> console.log(data))
.catch(error => console.error(error) );












export default function Update() {
  return <>
  <div className='p-5 text-center '>
  <h1 className='mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-2xl dark:text-white'>mise a jour</h1>
  </div>
  <div className='p-10 text-center'>
  <h2 className='text-1xl font-bold dark:text-white text-center'>mise a jour automatique chaque :</h2>
            <hr className='h-px my-8 bg-black  bg-opacity-50 border-0 '></hr>
            <div className='align'>
  <Input className=' rounded-full w-300 h-7'/>
  <Select>
                 <SelectTrigger className="w-[180px] rounded-full pl-6 h-7">
                 <SelectValue placeholder="duree" />
                 </SelectTrigger>
                 
                 <SelectContent>
                        <SelectItem value="annees">Années</SelectItem>
                        <SelectItem value="mois">Mois</SelectItem>
                        <SelectItem value="jours">Jours</SelectItem>

                </SelectContent>
                </Select>
                </div>
                <h2 className='text-1xl font-bold dark:text-white text-center'>mettre a jour manuellement:</h2>
            <hr className='h-px my-8 bg-black  bg-opacity-50 border-0 '></hr>
          <button onClick={() =>fetch()} className='focus:outline font-medium rounded-lg text-sm p-5 py-2.5 mb-2 h-[35px]  bg-buttonDark  text-textLight hover:bg-slate-700 hover:text-textLight  ' type="submit">mettre a jour</button>
          </div>

  </>;

}
