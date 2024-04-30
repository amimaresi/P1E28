import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function Informations() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState({
    _id: 'k_benatchba@esi.dz',
    nomComplet: 'Karima Benatchba',
    GradeEnsegnement: null,
    qualité: 'Chercheure',
    GradeRecherche: 'Maitre de recherche',
    H_index: 20,
    EtablissementOrigine: 'ESI',
    statut: 'Actif',
    Diplome: 'Doctorat',
    Equipe: 'Optimisation',
  },);
useEffect(()=>{

    //fetching here
    //setData(fetcheddata)
  })

  

  return(
    <>
      <div className='grid grid-cols-2 gap-x-12 gap-y-6'>
  <div className='flex flex-col'>
    <h2 className='font-bold'>Nom complet:</h2>
    <span>{data.nomComplet}</span>
  </div>
  <div className='flex flex-col'>
    <h2 className='font-bold'>Qualité:</h2>
    <span>{data.qualité}</span>
  </div>
  <div className='flex flex-col'>
    <h2 className='font-bold'>Etablissement d'origine:</h2>
    <span>{data.EtablissementOrigine}</span>
  </div>
  <div className='flex flex-col'>
    <h2 className='font-bold'>Diplôme:</h2>
    <span>{data.Diplome}</span>
  </div>
  <div className='flex flex-col'>
    <h2 className='font-bold'>Grade de recherche:</h2>
    <span>{data.GradeRecherche}</span>
  </div>
  <div className='flex flex-col'>
    <h2 className='font-bold'>Email:</h2>
    <span>{data._id}</span>
  </div>
  <div className='flex flex-col'>
    <h2 className='font-bold'>Grade enseignement:</h2>
    <span>{data.GradeEnsegnement}</span>
  </div>
  <div className='flex flex-col'>
    <h2 className='font-bold'>H_index:</h2>
    <span>{data.H_index}</span>
  </div>
  <div className='flex flex-col'>
    <h2 className='font-bold'>Equipe:</h2>
    <span>{data.Equipe}</span>
  </div>
  <div className='flex flex-col'>
    <h2 className='font-bold'>Téléphone:</h2>
    <span>{data.tel}</span>
  </div>
</div>

    </>
  )
}