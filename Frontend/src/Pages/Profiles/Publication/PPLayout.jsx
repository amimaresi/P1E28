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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const fetchtData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:3000/recherche/Publication/${id}`,
        );

        console.log(result.data.Publications);

        setData(result.data.Publications);
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
      <div className='bg-white'>
        <div className="p-12">
          <div className="  bg-buttonDark flex items-center justify-left rounded-2xl h-48">
            {/* titre de la publication*/}
            <h1 className="  mb-4 px-9  pt-2 text-xl font-bold leading-none tracking-tight text-white dark:text-white md:text-5xl lg:text-2xl">
              {data.Titre}
            </h1>
            <div className="mt-24 justify-left">
            <Button className='bg-white text-black text-center mr-4'>lien externe </Button>
            </div>
          </div>

          <div className="flex justify-center space-x-20 p-4 pt-12 ">
            <div>
              {/* Classement de la publication */}
              <h3 className="pb-2 font-bold">Classement</h3>
              {data.Classement &&
                data.Classement.map((Classm, index) => (
                  <h3 key={index}>{Classm}_</h3>
                ))}
            </div>

            <div>
              {/* conference/journal de la publication*/}
              <h3 className="pb-2  font-bold ">conference/journal</h3>
              <h3>{data.confJourn}</h3>
            </div>

            <div>
              {/* Volume de la publication*/}
              <h3 className="pb-2  font-bold ">Volume</h3>
              <h3>{data.volume}</h3>
            </div>

            <div>
              {/* pages de la publication*/}
              <h3 className="pb-2 font-bold">Pages</h3>
              <h3>{data.pages}</h3>
            </div>

            <div>
              {/* annee de la publication*/}
              <h3 className="pb-2  font-bold">année</h3>
              <h3>{data.Date}</h3>
            </div>
          </div>

          <div className=" pb-4 pt-8 flex flex-col justify-start ">
            {/* La liste des chercheurs de la publication */}
            <h2 className="p-6 font-bold">La liste des chercheurs:</h2>
            {data.Membres &&
              data.Membres.map((Membre, index) => (
                <div
                  className="mb-4 mr-4 flex h-16 w-full items-center rounded-2xl border bg-[#EFF3FF] p-4"
                  key={index}
                >
                  <h3 >
                    {index + 1}_{Membre}
                  </h3>
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
