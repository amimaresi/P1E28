import React, { useState } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';

export default function Projets() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState([
    {
      "_id":{"$numberInt":"2"},
      "Titre":"ALGORITHMS AND DATA STRUCTURES",
      "ChefDeProjet":"k_benatchba@esi.dz",
      "liste_members":["a_balla@esi.dz","mouloud.koudil@esi.dz","b_khelouat@esi.dz"],
      "DateDebut":"20/3/2024",
      "DateFin":"23/5/2024",
      "Theme":"ALGORTIHMS ANALYSIS",
      "createdAt":{"$date":{"$numberLong":"1712474730446"}},
      "updatedAt":{"$date":{"$numberLong":"1712474730446"}},
      "__v":{"$numberInt":"0"}
    },
    {
      "_id":{"$numberInt":"3"},
      "Titre":"ALGORITHMS AND DATA STRUCTURES ",
      "ChefDeProjet":"k_benatchba@esi.dz",
      "liste_members":["a_balla@esi.dz","mouloud.koudil@esi.dz","b_khelouat@esi.dz"],
      "DateDebut":"20/3/2024",
      "DateFin":"23/5/2024",
      "Theme":"ALGORTIHMS ANALYSIS",
      "createdAt":{"$date":{"$numberLong":"1712474780801"}},
      "updatedAt":{"$date":{"$numberLong":"1712474780801"}},
      "__v":{"$numberInt":"0"}
    }
  ]);

  return (
    <>
      <div className="bg-white p-8">
        <ul>
          <li className="mb-4 px-4 py-2 flex justify-between items-center">
            <span className="text-lg font-bold">Titre</span>
            <span className="text-lg font-bold">Date Début</span>
          </li>
        </ul>

        <ul>
          {data.map((item, index) => (
            <li className="mb-4 border rounded-lg bg-gray-100 px-4 py-2 flex justify-between items-center" key={index}>
              <NavLink to={`/projet/{_id}`} className="text-sm hover:text-buttonDark">{item.Titre}</NavLink>
              <span>{item.DateDebut}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
