import { useEffect, useState } from 'react';
import BgElement from './assets/BgElement.svg';
import leftArrow from './assets/left arrow.svg';
import rightArrow from './assets/right arrow.svg';
import graph from './assets/graph.png';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
export default function LandingPage() {
  const [landingPage, setLandingPage] = useState({
    // fetching
    news: [
      {
        title: 'LMCS:Track',
        paragraphe: 'LMCS:Track vous souhaite la bienvenue',
        img: 'https://lmcs.esi.dz/wp-content/uploads/2023/11/seminaire-3-1024x492.jpg',
        Subject: 'Bienvenue',
      },
    ],
    leaders: [],
  });
  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await axios.get(
          'http://localhost:3000/recherche/PageAcc',
        ); // Replace with your actual API endpoint

        const newsData = response.data.Pages; // Assuming data is in response.data.Pages

        // Update landingPage with just the news data (assuming no leaders data fetching)

        const resp = await axios.get('http://localhost:3000/pageAcc/leaders'); // Replace with your actual API endpoint

        const leadersData = resp.data;
        console.log(
          'leaders-------------------------------------------------------------',
          leadersData,
        );

        setLandingPage({ news: newsData, leaders: leadersData });
        console.log(
          'newsData--------------------------------------------------------------------',
          newsData,
          'news :',
          landingPage,
        );
      } catch (error) {
        console.error(
          'Error fetching news:-----------------------------------------------',
          error,
        );
        // Handle errors appropriately (e.g., display an error message to the user)
      }
    }

    fetchNews();
  }, []);
  console.log('testt', landingPage.news);

  const leaders = landingPage.leaders;
  console.log('leaders', leaders);
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);
  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const paginationButtons = [];
  if (landingPage.news) {
    for (let i = 0; i < landingPage.news.length; i++) {
      paginationButtons[i] = (
        <button
          onClick={async () => {
            setShow(false);
            await timeout(100);
            setIndex(i);
            await timeout(100);
            setShow(true);
          }}
          className={`mx-2 px-[0.6vw] py-[0.3vw] text-lg ${index == i ? 'bg-black' : 'bg-gray-400'} rounded-md transition-colors hover:text-black`}
        ></button>
      );
    }
  }
  const leaderboxes = [];
  if (leaders) {
    for (let i = 0; i < leaders.length; i++) {
      leaderboxes[i] = (
        <NavLink to={`chercheur/${leaders[i]._id}`}>
          <Card className=" h-[27vw] w-[30vw] border-[0.2vw] border-buttonDark p-[1vw] shadow-md transition-shadow hover:mb-3 hover:translate-x-2 hover:shadow-lg md:h-[22vw] md:w-[20vw] lg:h-[20vw] lg:w-[20vw]">
            <CardHeader className="p-[1vw]">
              <Avatar className="h-[4vw] w-[4vw]">
                <AvatarImage src={leaders[i].nomComplet} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <CardTitle className="text-[2.2vw] md:text-[1.5vw] lg:text-[1.2vw]">
                {leaders[i].nomComplet.split(' ')[0]} <br />{' '}
                {leaders[i].nomComplet.split(' ')[1]}
              </CardTitle>
              <CardDescription className="text-[1.7vw] md:text-[1.3vw] lg:text-[0.9vw]">
                {leaders[i].GradeRecherche}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-[1vw] text-[1.7vw] md:text-[1.1vw] lg:text-[0.8vw]">
              {' '}
              <span className="font-semibold underline underline-offset-1">
                Email
              </span>
              {' : '}
              {leaders[i]._id}
              <br />
              <span className=" font-semibold underline underline-offset-1">
                Equipe
              </span>
              {' : '}
              {leaders[i].Equipe}
            </CardContent>
          </Card>
        </NavLink>
      );
    }
  }
  return (
    <div>
      <div className=" bg-wh flex items-center justify-center pt-16">
        <div className="bg-whitep-1  flex min-w-[64vw] flex-col place-items-center ">
          <div className="flex min-w-[64vw] flex-row items-center justify-around px-2 py-2">
            <button
              className="bg-buttonDarkshadow-sm mr-5 flex h-[5vw] w-[5vw] items-center justify-center rounded-full bg-buttonDark transition-all hover:bg-buttonLight hover:shadow-md active:shadow-lg md:h-[2.5vw] md:w-[2.5vw] "
              onClick={async () => {
                setShow(false);
                await timeout(100);
                setIndex(index == 0 ? landingPage.news.length - 1 : index - 1);
                await timeout(100);
                setShow(true);
              }}
            >
              <img
                src={leftArrow}
                alt="background"
                className="mr-[0.1vw] h-[2vw]   active:opacity-70  md:h-[1vw] "
              />
            </button>

            <AnimatePresence>
              {show && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.1, delay: 0.1 }}
                  className="flex h-[140px] w-[65vw] flex-row items-start justify-around rounded-2xl bg-white px-4 py-[2vw] shadow-md md:h-auto md:w-[54vw] md:min-w-[54vw] lg:p-5 "
                >
                  <div className="flex h-[15vw]  w-[22vw] flex-col items-start gap-[1.1vw]">
                    <h2 className="m-0 rounded-xl bg-buttonLight px-[0.9vw] py-[0.6vw] text-center font-sans text-[1.2vw] font-[500] text-textLight lg:px-[0.7vw] lg:py-[0.4vw] lg:text-[0.8vw]">
                      {landingPage.news[index].Subject}
                    </h2>
                    <div className="flex h-[17vw]  w-[23vw] flex-col items-start ">
                      <h1 className="m-0  text-center font-title text-[2.5vw] lg:text-[1.5vw]">
                        {landingPage.news[index].title}
                      </h1>
                      <p className="m-0 font-sans text-[1.8vw] font-normal text-textDark md:text-[1.2vw] lg:text-[0.8vw]">
                        {landingPage.news[index].paragraphe}
                      </p>
                    </div>
                  </div>
                  <img
                    src={landingPage.news[index].img}
                    alt="background"
                    className=" mr-2 h-[17vw] w-[23vw] rounded-lg object-cover object-center md:h-[15vw] md:w-[27vw]"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <button
              className="ml-5 flex h-[5vw] w-[5vw] items-center justify-center rounded-full bg-buttonDark shadow-sm transition-all hover:bg-buttonLight hover:shadow-md active:shadow-lg md:h-[2.5vw]  md:w-[2.5vw] "
              onClick={async () => {
                setShow(false);
                await timeout(100);
                setIndex(index == landingPage.news.length - 1 ? 0 : index + 1);
                await timeout(100);
                setShow(true);
              }}
            >
              <img
                src={rightArrow}
                alt="background"
                className="ml-[0.1vw] h-[2vw] active:opacity-70  md:h-[1vw]"
              />
            </button>
          </div>
          <div className="my-5 flex flex-row items-center justify-center">
            {paginationButtons}
          </div>
        </div>
      </div>
      <div className=" relative mt-[3vw] flex h-[45vw] flex-col items-center justify-center gap-2 md:h-[35vw] md:gap-5">
        <img
          src={BgElement}
          alt="background"
          className="absolute bottom-0 left-0 top-0 z-0 h-[45vw] w-full object-cover md:h-[35vw]"
        />
        <h1 className="z-10 font-title text-[2vw] font-semibold">
          les responsables du LMCS
        </h1>
        <div className="  z-10 flex flex-row  gap-[2vw]">{leaderboxes}</div>
      </div>
      <div className="relative flex h-[31vw] flex-row items-center justify-around">
        <img
          src={graph}
          alt="background"
          className=" z-0 ml-10 h-[30vw] md:ml-0"
        />
        <div className=" flex h-[31vw] flex-col items-center justify-center gap-[5%]">
          <div className="flex flex-col items-center gap-5">
            <p className="w-[50%] text-[2vw] md:text-[1vw]">
              <h1 className=" z-10 mb-3 font-title text-[4vw] md:text-[2vw]">
                Les statistiques du LMCS
              </h1>
              {'Explorez les Statistiques de LMCS  selon Votre Thème Préféré '}
            </p>
            <NavLink to="/login">
              <Button
                className={`h-[25px] rounded-xl bg-buttonDark px-4 text-sm text-textLight hover:bg-slate-700 hover:text-textLight md:h-[35px] md:text-lg `}
              >
                En savoir plus
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
