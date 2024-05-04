import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Encadrements() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState([ ]);

  return (
    <>
      <div className="bg-white p-8">
        <ul>
          <li className="mb-4 px-4 py-2 flex justify-between items-center">
            <span className="text-lg font-bold">Titre</span>
            <span className="text-lg font-bold">Type</span>
            <span className="text-lg font-bold">Année Début</span>
          </li>
        </ul>

        <ul>
          {data.map((item, index) => (
            <li className="mb-4 border rounded-lg bg-gray-100 px-4 py-2 flex justify-between items-center" key={index}>
              <NavLink to={`/encadrement/{_id}`} className="text-sm hover:text-buttonDark">{item.Titre}</NavLink>
              <span>{item.Type}</span>
              <span>{item.AnneeD}</span>
            </li>
          ))}
        </ul>
      </div>      
    </>
  );
}
