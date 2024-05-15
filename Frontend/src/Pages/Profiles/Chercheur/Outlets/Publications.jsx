import React, { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export default function Publications() {
  const { userInfo, isLogged } = useOutletContext();
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  console.log('id', id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:3000/recherche/Publication?idCherch=${id == 'me' && isLogged ? userInfo._id : id}`,
        );
        console.log('id 2.0 : ', id == 'me' && isLogged ? userInfo._id : id);
        console.log(userInfo, isLogged);
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
        <li className="mb-4 flex items-center justify-between px-4 py-2">
          <span className="text-lg font-bold">Titre</span>
          <span className="text-lg font-bold">Rang</span>
        </li>
      </ul>

      <ul>
        {currentItems.length == 0
          ? 'Pas de resultats'
          : currentItems.map((item, index) => (
              <li
                className="mb-4 flex items-center justify-between rounded-lg border bg-gray-100 px-4 py-2"
                key={index}
              >
                <NavLink
                  to={`/publication/${item._id}`}
                  className="text-sm hover:text-blue-500"
                >
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
            Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map(
              (_, index) => (
                <li key={index}>
                  <button
                    onClick={() => paginate(index + 1)}
                    className={`mx-1 rounded-lg px-3 py-1 ${
                      currentPage === index + 1
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                    } hover:bg-blue-600 hover:text-white focus:outline-none`}
                  >
                    {index + 1}
                  </button>
                </li>
              ),
            )}
        </ul>
      </nav>
    </div>
  );
}
