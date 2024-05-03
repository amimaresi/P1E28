import React, { useEffect, useState } from 'react';
import { NavLink, Outlet ,useParams} from 'react-router-dom';
import axios from 'axios';

// un exemple d'un encadrement
/*const prjt =
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
  }*/

export default function PrPLayout() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState({ });
  const {id} = useParams()
useEffect( ()=>{
   
  const fetchtData = async()=>{
    try{
      const result = await axios.get(`http://localhost:3000/recherche/Publication/${id}`)
      
      
      console.log(result.data.Publications)

      setData(result.data.Publications)
      return result
      
    }catch(err){
      console.log("error")
      console.log(err)
    }
  }
  fetchtData()
  
  } , [])
  return <>
   <div className='bg-white'>
    <div className='p-12'>

  <div className=' flex justify-center '>
  {/* titre de la publication*/}
  <h1 className='    pt-2 pb-6 px-2 mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-2xl dark:text-white'>Publication:</h1>
  <h1 className='  pt-2 pb-6 px-9 mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-2xl dark:text-white'>{data.Titre}</h1>
  </div>

  <div className='p-4 flex space-x-20 justify-center '>

  <div>
  {/* Classement de la publication */}
  <h3 className='font-bold pb-2'>Classement</h3>
  {data.Classement && data.Classement.map((Classm, index) =>
    <h3 key={index}>{Classm}_</h3>
  )}
</div>


  <div>
      {/* conference/journal de la publication*/}
      <h3 className='font-bold  pb-2 '>conference/journal</h3>
      <h3 >{data.confJourn}</h3>
    </div>

    <div>
       {/* Volume de la publication*/}
      <h3 className='font-bold  pb-2 '>Volume</h3>
      <h3 >{data.volume}</h3>
    </div>



    <div>
      {/* pages de la publication*/}
      <h3 className='font-bold pb-2'>Pages</h3>
      <h3>{data.pages}</h3>
    </div>


    <div>
      {/* annee de la publication*/}
      <h3 className='font-bold  pb-2'>année</h3>
      <h3 >{data.Date}</h3>
    </div>
    
  </div>

  <div className="px-64">
  {/* La liste des chercheurs de la publication */}
  <h2 className='p-6 font-bold'>La liste des chercheurs:</h2>
  {data.Membres && data.Membres.map((Membre, index) =>
    <div className="flex border bg-[#EFF3FF] rounded-2xl p-4 mr-4 w-full h-16 mb-4 items-center" key={index}>
      <h3>{index + 1}_{Membre}</h3>
    </div>
  )}
</div>


</div>
  </div>
  
  </>;  
}
