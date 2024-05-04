import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Encadrements() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState([
    {
      "_id": {
        "$oid": "660096a07654baa3c3bed13a"
      },
      "Type": "PFE",
      "Titre": "Base de donnée",
      "AnneeD": "2020",
      "AnneeF": "2021",
      "Etudiants": [
        "Ait kaci Azzou Sarah",
        "Bachferrag Bouchra"
      ],
      "Encadrants": [
        {
          "NomComplet": "Amar Balla",
          "_id": "a_balla@esi.dz",
          "role": "encadrant"
        },
        {
          "NomComplet": "Samira Azzou",
          "_id": "Null",
          "role": "Null"
        }
      ]
    },
    {
      "_id": {
        "$oid": "660096a07654baa3c3bed13b"
      },
      "Type": "PFE",
      "Titre": "Intelligence Artificielle",
      "AnneeD": "2020",
      "AnneeF": "2021",
      "Etudiants": [
        "Heti Amina",
        "Soupe Baraka"
      ],
      "Encadrants": [
        {
          "nomComplet": "Boualem Khelouat",
          "_id": "b_khelouat@esi.dz",
          "role": "encadrant"
        },
        {
          "nomComplet": "Fatima Si Tayeb ",
          "_id": "f_sitayeb@esi.dz",
          "role": "co-encadrant"
        }
      ]
    },
    // Les autres éléments de données...
  ]);

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
