import React, { useEffect, useState } from 'react';
import { NavLink, useOutletContext, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Encadrements() {
  const { userInfo, isLogged } = useOutletContext();
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:3000/recherche/encadrement?idEncadrant=${id == 'me' && isLogged ? userInfo._id : id}`,
        );
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
          <li className="mb-4 flex items-center justify-between px-4 py-2">
            <span className="text-lg font-bold">Titre</span>
            <span className="ml-20 text-lg font-bold">Type</span>
            <span className="text-lg font-bold">Année Début</span>
          </li>
        </ul>

        <ul>
          {currentItems.length == 0
            ? 'Pas de resultats'
            : currentItems.map((item, index) => (
                <li
                  className=" mb-4 flex place-content-between rounded-lg border bg-gray-100 px-4 py-2"
                  key={index}
                >
                  <NavLink
                    to={`/encadrement/${item._id}`}
                    className={` w-24 text-sm hover:text-blue-500`}
                  >
                    {item.Titre}
                  </NavLink>
                  <span className=" mr-5">{item.Type}</span>
                  <span>{item.AnneeD}</span>
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
    </>
  );
}
