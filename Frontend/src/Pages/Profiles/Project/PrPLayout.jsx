import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import axios from 'axios';
import NotFound from '@/Pages/NotFound/NotFound';

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
  return data ? (
    <>
       <div className="bg-white">
        <div className="p-12 ">
          
          <div className="  bg-buttonDark flex items-center justify-left rounded-2xl h-48">
            {/* titre de projet*/}
            
            <h1 className="   pt-2 pb-6 px-9 mb-4 text-xl font-bold leading-none tracking-tight text-white md:text-5xl lg:text-2xl dark:text-white">
              {data.Titre}
            </h1>
          </div>

          <div className="p-4 flex space-x-20 justify-center">
          <div className="flex justify-center rounded-xl border bg-buttonDark px-12 pb-4 pt-4 text-white items-center">
              {/* anneeD de projet*/}
              <h3 className=" pr-4 font-bold">date de debut:</h3>
              <h3>{data.DateDebut}</h3>
            </div>

            <div className="flex justify-center rounded-xl border bg-buttonDark px-12 pb-4 pt-4 text-white items-center">
              {/* anneeF de projet*/}
              <h3 className=" pr-4 font-bold">Date de fin:</h3>
              <h3>{data.DateFin}</h3>
            </div>

            <div className="flex justify-center rounded-xl border bg-buttonDark px-12 pb-4 pt-4 text-white items-center">
              {/* theme de projet*/}
              <h3 className=" pr-4 font-bold">Type:</h3>
              <h3>{data.Theme}</h3>
            </div>
          </div>

          <div className=" ">
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
  ) : (
    <NotFound />
  );
}
