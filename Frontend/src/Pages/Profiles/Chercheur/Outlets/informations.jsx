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
      <div className='grid grid-rows-4 grid-cols-2 gap-x-12 gap-y-12'>
        <div>Nom complet: {data.nomComplet}</div>
        <div>Qualité: {data.qualité}</div>
        <div>Etablissement d'origine: {data.EtablissementOrigine}</div>
        <div>Diplôme: {data.Diplome}</div>
        <div>Grade de recherche: {data.GradeRecherche}</div>
        <div>Email: {data._id}</div>
        <div>Grade enseignement: {data.GradeEnsegnement}</div>
        <div>H_index: {data.H_index}</div>
        <div>Equipe: {data.Equipe}</div>
        <div>Téléphone: {data.tel}</div>
        
        
      </div>
    </>
  )
}