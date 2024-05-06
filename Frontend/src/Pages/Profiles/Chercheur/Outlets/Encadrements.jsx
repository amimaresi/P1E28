import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Encadrements() {
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
     }
  ]);
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:3000/recherche/encadrement?idEncadrant=${id}`);
        setData(result.data.Encadrements);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  // Logic for displaying current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          {currentItems.map((item, index) => (
            <li
              className="mb-4 border rounded-lg bg-gray-100 px-4 py-2 flex justify-between items-center"
              key={index}
            >
              <NavLink to={`/encadrement/${item._id}`} className="text-sm hover:text-blue-500">
                {item.Titre}
              </NavLink>
              <span>{item.Type}</span>
              <span>{item.AnneeD}</span>
            </li>
          ))}
        </ul>

        {/* Pagination */}
        <nav className="mt-4" aria-label="Pagination">
          <ul className="flex justify-center">
            {data.length > itemsPerPage &&
              Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
                <li key={index}>
                  <button
                    onClick={() => paginate(index + 1)}
                    className={`px-3 py-1 mx-1 rounded-lg ${
                      currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                    } hover:bg-blue-600 hover:text-white focus:outline-none`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
