import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
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
  const [data, setData] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const fetchtData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:3000/recherche/projet/${id}`,
        );

        console.log(result.data.projet);

        setData(result.data.projet);
        return result;
      } catch (err) {
        console.log('error');
        console.log(err);
      }
    };
    fetchtData();
  }, []);
  return (
    <>
      <div className="bg-white">
        <div className="p-12 px-64">
          <h1 className=" mb-4 flex items-center   justify-center pb-6 pt-2 text-xl font-bold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-3xl">
            Projet
          </h1>
          <div className=" flex justify-start px-64">
            {/* titre de projet*/}
            <h1 className="    mb-4 pb-6 pt-2 text-xl font-bold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-2xl">
              Titre:
            </h1>
            <h1 className="   mb-4 pb-6 pt-2 text-xl font-bold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-2xl">
              {data.Titre}
            </h1>
          </div>

          <div className="flex justify-start space-x-20 p-4  px-64">
            <div>
              {/* anneeD de projet*/}
              <h3 className="pb-2 font-bold">date de debut</h3>
              <h3>{data.DateDebut}</h3>
            </div>

            <div>
              {/* anneeF de projet*/}
              <h3 className="pb-2 font-bold">Date de fin</h3>
              <h3>{data.DateFin}</h3>
            </div>

            <div>
              {/* theme de projet*/}
              <h3 className="pb-2 font-bold">Type</h3>
              <h3>{data.Theme}</h3>
            </div>
          </div>

          <div className=" px-64 ">
            {/* La liste des membres*/}
            <div>
              {/* chef de projet*/}
              <h2 className="p-6 font-bold">chef de projet:</h2>

              <div className="   mb-4 mr-4 flex h-16 w-full items-center rounded-2xl border  bg-[#EFF3FF]  p-4   ">
                <h3>_{data.ChefDeProjet}</h3>
              </div>
            </div>
            <h2 className="p-6 font-bold">La liste des membres :</h2>
            {data.liste_members &&
              data.liste_members.map((Membre) => (
                <div
                  key={Membre}
                  className="   mb-4 mr-4 flex h-16 w-full items-center rounded-2xl border  bg-[#EFF3FF]  p-4   "
                >
                  <h3>_{Membre}</h3>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
