import React, {useEffect, useState } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Projets() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState([  ]);
  const {id} = useParams()
   useEffect(()=>{
    const fetcheData= async ()=>{
      try {
      const resulta = await axios.get(`http://localhost:3000/recherche/projet?ChefDeProjett=${id}`) // to modify 
      console.log(resulta.data.Projets)
      setData(resulta.data.Projets)
    }
    catch(err){
      console.log(err);

    }

   } 
   console.log("id : "+id)
    fetcheData();
  },[])

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
              <NavLink to={`/projet/${item._id}`} className="text-sm hover:text-buttonDark">{item.Titre}</NavLink>
              <span>{item.DateDebut}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
