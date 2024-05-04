import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';

export default function Publications() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState([
    {
      "_id": {
        "$oid": "66112c732dd5fcb5d05589bd"
      },
      "Date": "2013",
      "idCherch": "a_balla@esi.dz",
      "confJourn": "ICITST",
      "volume": "indefini",
      "pages": "182-187",
      "rang": 3,
      "Titre": "DA5DCSWS: A Distributed Architecture for semantic Web services Discovery and Composition.",
      "Lien": "https://doi.org/10.1109/ICITST.2013.6750188",
      "Membres": [
        "Adel Boukhadra",
        "Karima Benatchba",
        "Amar Balla"
      ],
      "Classement": [],
      "__v": 0,
      "createdAt": {
        "$date": "2024-04-06T11:05:23.061Z"
      },
      "updatedAt": {
        "$date": "2024-04-06T11:05:23.061Z"
      }
    },
    {
      "_id": {
        "$oid": "66112c732dd5fcb5d05589b1"
      },
      "Date": "2016",
      "idCherch": "a_balla@esi.dz",
      "confJourn": "IDC",
      "volume": "indefini",
      "pages": "13-22",
      "rang": 3,
      "Titre": "A Dynamic Model to enhance the Distributed Discovery of services in P2P Overlay Networks.",
      "Lien": "https://doi.org/10.1007/978-3-319-48829-5_2",
      "Membres": [
        "Adel Boukhadra",
        "Karima Benatchba",
        "Amar Balla"
      ],
      "Classement": [],
      "__v": 0,
      "createdAt": {
        "$date": "2024-04-06T11:05:23.060Z"
      },
      "updatedAt": {
        "$date": "2024-04-06T11:05:23.060Z"
      }
    }
  ]);
  const { id } = useParams();

  return (
    <div className="bg-white p-8">
      <ul>
        <li className="mb-4 px-4 py-2 flex justify-between items-center">
          <span className="text-lg font-bold">Titre</span>
          <span className="text-lg font-bold">Rang</span>
        </li>
      </ul>

      <ul>
        {data.map((item, index) => (
          <li className="mb-4 border rounded-lg bg-gray-100 px-4 py-2 flex justify-between items-center" key={index}>
            <a href={item.Lien} className="text-xs" target="_blank" rel="noopener noreferrer">{item.Titre}</a>
            <span>{item.rang}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
