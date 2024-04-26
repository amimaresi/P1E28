import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TableChercheur } from './TableChercheur';

export default function RechercheLayout({ searchby }) {
  const navigate = useNavigate();
  return (
    <>
      <div className=" h-screen  pl-40 pt-16">
        <h1 className="mb-4 text-4xl font-semibold text-textDark">
          Recherche {searchby + ' '}
          <span className=" text-gray-500">-v0.7-</span>
        </h1>
        <div className=" flex flex-row items-center justify-start"></div>
        <div className="w-[70%]">
          <TableChercheur searchby={searchby} navigate={navigate} />
        </div>
      </div>
    </>
  );
}
