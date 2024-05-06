import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Projets() {
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
      },
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
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:3000/recherche/projet?ChefDeProjett=${id}`);
        setData(result.data.Projets);
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
            <span className="text-lg font-bold">Date Début</span>
          </li>
        </ul>

        <ul>
          {currentItems.map((item, index) => (
            <li
              className="mb-4 border rounded-lg bg-gray-100 px-4 py-2 flex justify-between items-center"
              key={index}
            >
              <NavLink to={`/projet/${item._id}`} className="text-sm hover:text-blue-500">
                {item.Titre}
              </NavLink>
              <span>{item.DateDebut}</span>
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
