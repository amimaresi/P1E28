import React, { useEffect, useState } from 'react';
import { NavLink, Outlet , useParams} from 'react-router-dom';

// un exemple d'une publication
const Pub = {
  _id:{
    $oid: "66112c732dd5fcb5d05589bd"
    },
    Date: "2013",
    idCherch:  "a_balla@esi.dz",
    confJourn: "ICITST",
    volume: "indefini",
    pages: "182-187",
 rang: 3,
 Titre: "DA5DCSWS: A Distributed Architecture for semantic Web services Discovery and Composition.",
 Lien: "https://doi.org/10.1109/ICITST.2013.6750188",
 Membres: [
 "Adel Boukhadra",
 "Karima Benatchba",
 "Amar Balla"
 ],
 Classement: ["yoyoyo","A+"],
 __v: 0,
 createdAt: {
 $date: "2024-04-06T11:05:23.061Z"
 },
 updatedAt: {
 $date: "2024-04-06T11:05:23.061Z"
 }
};


export default function PPLayout() {

  let {id} = useParams();
 //console.log(id);
 useEffect(()=>{

 })


  return <>
   <div className='bg-white'>
    <div className='p-12'>

  <div className=' flex justify-center '>
  {/* titre de la publication*/}
  <h1 className='    pt-2 pb-6 px-2 mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-2xl dark:text-white'>Publication:</h1>
  <h1 className='  pt-2 pb-6 px-9 mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-2xl dark:text-white'>{Pub.Titre}</h1>
  </div>


  <div className='p-4 flex space-x-20 justify-center '>


    <div>
      {/* classment de la publication*/}
      <h3 className='font-bold  pb-2 '>Classement</h3>
      {Pub.Classement.map((Classm  )=>
     <h3 > {Classm}_</h3>
      )}
    </div>


    <div>
      {/* conference/journal de la publication*/}
      <h3 className='font-bold  pb-2 '>conference/journal</h3>
      <h3 >{Pub.confJourn}</h3>
    </div>



    <div>
       {/* Volume de la publication*/}
      <h3 className='font-bold  pb-2 '>Volume</h3>
      <h3 >{Pub.volume}</h3>
    </div>



    <div>
      {/* pages de la publication*/}
      <h3 className='font-bold pb-2'>Pages</h3>
      <h3>{Pub.pages}</h3>
    </div>


    <div>
      {/* annee de la publication*/}
      <h3 className='font-bold  pb-2'>année</h3>
      <h3 >{Pub.Date}</h3>
    </div>
    
  </div>

  
  <div className=" px-64 ">
    {/* La liste des chercheurs de la publication*/}
  <h2 className='p-6 font-bold'>La liste des chercheurs:</h2>
    {Pub.Membres.map((Membre , index  )=>
      <div  className="   flex border bg-[#EFF3FF] rounded-2xl p-4 mr-4 w-full h-16  mb-4  items-center   ">
     <h3 >{index +1 }_{Membre}</h3>
     </div>
      )}
</div>



</div>
</div>
  </>;
}
