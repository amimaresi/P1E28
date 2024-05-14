import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Rectangle from './image/Rectangle.svg';
import Group from './image/Group.svg';
import local from './image/local.svg';
import esi_white from './image/esi_white.png';

export default function AboutUs() {
  return (
    <>
      <div className="relative w-full">
        <img src={Rectangle} alt="Rectangle" className="w-full" />
        <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-title text-6xl font-bold">
          À propos de nous
        </h1>
        <p className="translate-y-1/8 absolute left-1/2 top-3/4 -translate-x-1/2 font-title text-lg font-semibold">
          Le Laboratoire de Méthodes de Conception de Systèmes (LMCS) créé en
          1999 est rattaché à L’Ecole nationale Supérieure d’Informatique,
          Alger.
        </p>
      </div>

      <div className="mt-8 flex p-10 w-full">
        <div className="text-center w-1/3 flex flex-col items-center justify-center">
          <img src={Group} alt="Frame 1" />
          <div>
            <h1 className="text-2xl font-bold ">Nos sponsors</h1>
            <p className="mx-auto max-w-xs">
              ESI–Ecole nationale Supérieure d'Informatique.
            </p>
          </div>
        </div>
        <div className="text-center w-1/3 flex flex-col items-center justify-center">
          <img src={esi_white} alt="Frame 2" width="170" height="94"/>
          <h1 className="text-2xl font-bold">Ecole nationale Supérieure d'Informatique</h1>
          <div>          
            <p>Contactez-nous:</p>
            <p>+213 23 93 91 32</p>
            <p>contact@esi.dz</p></div>
          </div>
        <div className="text-center w-1/3 flex flex-col items-center justify-center">
          <img src={local} alt="Frame 2" />
          <h1 className="text-2xl font-bold">Localisation</h1>
          <p className="mx-auto max-w-xs">
          Ecole nationale Supérieure d’Informatique ESI, Oued Smar Alger , 16309.
            </p>
            <p>k_benatchba@esi.dz</p> 
            <p>+213 23 93 91 30</p>
          
        </div>
      </div>
    </>
  );
}
