import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import { AnimatePresence, motion } from 'framer-motion';
import leftArrow from './assets/left arrow.svg';
import rightArrow from './assets/right arrow.svg';
export default function EditLandingPage() {
  const LandingPage = {
    // fetching
    news: [
      {
        title: 'title',
        paragraphe:
          'import React, { useState } from react \n import { NavLink, Outlet } from "react-router-dom" \n import Menu from ./Menu/Menu.jsx',
        img: 'https://img.freepik.com/photos-gratuite/peinture-lac-montagne-montagne-arriere-plan_188544-9126.jpg',
        Subject: 'Best Publication',
      },
      {
        title: 'Not a title',
        paragraphe:
          'imrgregt, { useState } from react \n ietghtyrthgLink, Outlet } from "react-router-dom" \n irgergegpojoj*zolmajn,vjaerkhga',
        img: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_640.jpg',
        Subject: 'Best Chercheur',
      },
    ],
  };

  const boxes = LandingPage.news; //title, paragraphe, Consept
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);
  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const paginationButtons = [];
  for (let i = 0; i < boxes.length; i++) {
    paginationButtons[i] = (
      <button
        onClick={() => {
          setIndex(i);
        }}
        className={`mx-2 px-[0.6vw] py-[0.3vw] text-lg ${index == i ? 'bg-black' : 'bg-gray-400'} rounded-md transition-colors hover:text-black`}
      ></button>
    );
  }
  return (
    <div>
      <div className=" bg-wh flex items-center justify-center pt-16">
        <div className="bg-whitep-1  flex min-w-[64vw] flex-col place-items-center rounded-2xl bg-white shadow-md lg:p-5">
          <div className="flex min-w-[64vw] flex-row items-center justify-around bg-white px-2 py-2">
            <img
              src={leftArrow}
              onClick={async () => {
                setShow(false);
                await timeout(100);
                setIndex(index == boxes.length - 1 ? 0 : index + 1);
                await timeout(100);
                setShow(true);
              }}
              alt="background"
              className="m-[1vw] h-[2vw] hover:opacity-65 active:opacity-40"
            />
            <AnimatePresence>
              {show && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.1, delay: 0.1 }}
                  className="flex max-h-[400px] min-w-[54vw] flex-row items-start justify-between   p-[1vw] "
                >
                  <div className="flex h-[15vw]  w-[22vw] flex-col items-start gap-[1.1vw]">
                    <h2 className="m-0 rounded-xl bg-buttonLight px-[0.9vw] py-[0.6vw] text-center font-sans text-[1.2vw] font-[500] text-textLight lg:px-[0.7vw] lg:py-[0.4vw] lg:text-[0.8vw]">
                      {boxes[index].Subject}
                    </h2>
                    <div className="flex h-[17vw]  w-[23vw] flex-col items-start ">
                      <h1 className="m-0  text-center font-title text-[2.5vw] lg:text-[1.5vw]">
                        {boxes[index].title}
                      </h1>
                      <p className="m-0 font-sans text-[1.8vw] font-normal text-textDark md:text-[1.2vw] lg:text-[0.8vw]">
                        {boxes[index].paragraphe}
                      </p>
                    </div>
                  </div>
                  <img
                    src={boxes[index].img}
                    alt="background"
                    className=" mr-2 h-[17vw] w-[23vw] rounded-lg object-cover object-center md:h-[15vw] md:w-[27vw]"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <img
              src={rightArrow}
              onClick={async () => {
                setShow(false);
                await timeout(100);
                setIndex(index == 0 ? boxes.length - 1 : index - 1);
                await timeout(100);
                setShow(true);
              }}
              alt="background"
              className=" m-[1vw] h-[2vw] hover:opacity-65 active:opacity-40"
            />
          </div>
          <div className="m-2 flex flex-row items-center justify-center">
            {paginationButtons}
          </div>
        </div>
      </div>
    </div>
  );
}
