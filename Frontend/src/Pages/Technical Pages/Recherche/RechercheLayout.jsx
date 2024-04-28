import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RechercheTable } from './RechercheTable';

export default function RechercheLayout({ searchby }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="  pl-40 pt-16">
        <h1 className="mb-4 text-4xl font-semibold text-textDark">
          Recherche {searchby + ' '}
          <span className=" text-gray-500">-v0.7-</span>
        </h1>
        <div className=" flex flex-row items-center justify-start"></div>
        <div className="w-[90%]">
          <RechercheTable searchby={searchby} navigate={navigate} />
        </div>
      </div>
    </>
  );
}
