import React, { useEffect , useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios' 
import { useParams } from 'react-router-dom';

export default function Encadrements() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState([ ]);
  const {id} = useParams()
   useEffect(()=>{
    const fetcheData= async ()=>{
      try {
      const resulta = await axios.get(`http://localhost:3000/recherche/encadrement?idEncadrant=${id}`)
      console.log(resulta.data.Encadrements)
      setData(resulta.data.Encadrements)
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
            <span className="text-lg font-bold">Type</span>
            <span className="text-lg font-bold">Année Début</span>
          </li>
        </ul>

        <ul>
          {data.map((item, index) => (
            <li className="mb-4 border rounded-lg bg-gray-100 px-4 py-2 flex justify-between items-center" key={index}>
              <NavLink to={`/encadrement/${item._id}`} className="text-sm hover:text-buttonDark">{item.Titre}</NavLink>
              <span>{item.Type}</span>
              <span>{item.AnneeD}</span>
            </li>
          ))}
        </ul>
      </div>      
    </>
  );
}
