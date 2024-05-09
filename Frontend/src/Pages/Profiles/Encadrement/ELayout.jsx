import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import axios from 'axios';
import NotFound from '@/Pages/NotFound/NotFound';

// un exemple d'un encadrement
/*const Enc = {
  "_id": {
  "$oid": "660096a07654baa3c3bed13b"
  },
  "Type": "PFE",
  "Titre": "Intelligence Artificielle",
  "AnneeD": "2020",
  "AnneeF": "2021",
  "Etudiants": [
  "Heti Amina",
  "Soupe Baraka"
  ],
  "Encadrants": [
  {
  "nomComplet": "Boualem Khelouat",
  "_id": "b_khelouat@esi.dz",
  "role": "encadrant"
  },
  {
  "nomComplet": "Fatima Si Tayeb ",
  "_id": "f_sitayeb@esi.dz",
  "role": "co-encadrant"
  }
  ]
 }*/
export default function ELayout() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState({
    //   _id: 'k_benatchba@esi.dz',
    //   nomComplet: 'Karima Benatchba',
    //   GradeEnsegnement: null,
    //   qualité: 'Chercheure',
    //   GradeRecherche: 'Maitre de recherche',
    //   H_index: 20,
    //   EtablissementOrigine: 'ESI',
    //   statut: 'Actif',
    //   Diplome: 'Doctorat',
    //   Equipe: 'Optimisation',
    // },
  });

  const { id } = useParams();
  useEffect(() => {
    const fetchtData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:3000/recherche/encadrement/${id}`,
        );

        console.log(result.data.Encadrement);
        setData(result.data.Encadrement);
        return result;
      } catch (err) {
        console.log('error');
        console.log(err);
      }
    };
    fetchtData();
  }, []);

  console.log(data.Encadrements);
  return data ? (
    <>
      <div className="bg-white">
        <div className="p-12">
          <div className=" flex justify-center ">
            {/* titre de l'Encadrement*/}
            <h1 className="    mb-4 px-2 pb-6 pt-2 text-xl font-bold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-2xl">
              Encadrement:
            </h1>
            <h1 className="    mb-4 px-9 pb-6 pt-2 text-xl font-bold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-2xl">
              {' '}
              {data.Titre}
            </h1>
          </div>

          <div className="flex justify-center space-x-20 p-4 ">
            <div>
              {/* type de l'Encadrement*/}
              <h3 className="pb-2 font-bold">Type</h3>
              <h3>{data.Type}</h3>
            </div>

            <div>
              {/* anneeD de l'Encadrement*/}
              <h3 className="pb-2 font-bold">année debut</h3>
              <h3>{data.AnneeD}</h3>
            </div>

            <div>
              {/* anneeF de l'Encadrement*/}
              <h3 className="pb-2 font-bold">année fin</h3>
              <h3>{data.AnneeF}</h3>
            </div>
          </div>

          <div className=" px-64 ">
            {/* La liste des etudiants de l'Encadrement*/}
            <h2 className="p-6 font-bold">La liste des étudiants:</h2>
            {data.Etudiants &&
              data.Etudiants.map((Etud) => (
                <div className="   mb-4 mr-4 flex h-16 w-full items-center rounded-2xl border  bg-[#EFF3FF]  p-4   ">
                  <h3>_{Etud}</h3>
                </div>
              ))}
          </div>

          <div className=" px-64 ">
            {/* La liste des encadrants de l'Encadrement*/}
            <h2 className="p-6 font-bold">La liste des encadrants:</h2>
            {data.Encadrants &&
              data.Encadrants.map((Encad, index) => (
                <div className="   mb-4 mr-4 flex h-16 w-full items-center rounded-2xl border  bg-[#EFF3FF]  p-4   ">
                  <h3 className="px-2">
                    {index + 1}_{Encad.NomComplet}{' '}
                  </h3>
                  <h3 className="px-2 font-bold"> le role : </h3>
                  <h3>{Encad.role}</h3>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  ) : (
    <NotFound />
  );
}
