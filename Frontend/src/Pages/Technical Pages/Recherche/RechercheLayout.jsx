import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTableDemo } from './DataTable';

export default function RechercheLayout({ searchby }) {
  const navigate = useNavigate();
  return (
    <>
      <div className=" h-screen  pl-40 pt-16">
        <h1 className="mb-4 text-4xl font-semibold text-textDark">
          Recherche 0.7
        </h1>
        <div className=" flex flex-row items-center justify-start"></div>
        <div className="w-[70%]">
          <DataTableDemo searchby={searchby} navigate={navigate} />
        </div>
      </div>
    </>
  );
}
