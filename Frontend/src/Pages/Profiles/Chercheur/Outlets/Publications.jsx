import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export default function Publications() {
  const [data, setData] = useState([
    {
      "_id": {
        "$oid": "66112c732dd5fcb5d05589bd"
      },
      "Date": "2013",
      "idCherch": "a_balla@esi.dz",
      "confJourn": "ICITST",
      "maisonEdition": "ESIST",
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
      "maisonEdition": "ESIST",
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
    },
    {
      "_id": {
        "$oid": "66112c732dd5fcb5d05589bd"
      },
      "Date": "2013",
      "idCherch": "a_balla@esi.dz",
      "confJourn": "ICITST",
      "maisonEdition": "ESIST",
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
      "maisonEdition": "ESIST",
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
    },
    {
      "_id": {
        "$oid": "66112c732dd5fcb5d05589bd"
      },
      "Date": "2013",
      "idCherch": "a_balla@esi.dz",
      "confJourn": "ICITST",
      "maisonEdition": "ESIST",
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
      "maisonEdition": "ESIST",
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:3000/recherche/Publication?idCherch=${id}`);
        setData(result.data.Publications);
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
    <div className="bg-white p-8">
      <ul>
        <li className="mb-4 px-4 py-2 flex justify-between items-center">
          <span className="text-lg font-bold">Titre</span>
          <span className="text-lg font-bold">Rang</span>
        </li>
      </ul>

      <ul>
        {currentItems.map((item, index) => (
          <li
            className="mb-4 border rounded-lg bg-gray-100 px-4 py-2 flex justify-between items-center"
            key={index}
          >
            <NavLink to={`/publication/${item._id}`} className="text-sm hover:text-blue-500">
              {item.Titre}
            </NavLink>
            <span>{item.rang}</span>
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
  );
}


