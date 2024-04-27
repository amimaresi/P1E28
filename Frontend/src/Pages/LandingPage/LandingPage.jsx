import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import BgElement from './assets/BgElement.svg';
import leftArrow from './assets/left arrow.svg';
import rightArrow from './assets/right arrow.svg';
import graph from './assets/graph.png';
import { AnimatePresence, motion } from 'framer-motion';
export default function LandingPage() {
  const context = useOutletContext();

  const boxes = context.LandingPage.news; //title, paragraphe, Consept
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);
  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }
  return (
    <div className=" ">
      <div className=" flex items-center justify-center pt-16">
        <div className="flex h-[20vw] w-[64vw] flex-row items-center justify-between rounded-2xl bg-white p-[1vw] shadow-md">
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
            className="m-[1vw] h-[2.5vw] hover:opacity-65 active:opacity-40"
          />
          <AnimatePresence>
            {show && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.1, delay: 0.1 }}
                className="flex h-[20vw] w-[64vw] flex-row items-center justify-between  p-[1vw] "
              >
                <div className="flex h-[17vw]  w-[23vw] flex-col items-start gap-[1.3vw]">
                  <h2 className="m-0 rounded-xl bg-buttonLight px-[0.7vw] py-[0.4vw] text-center font-sans text-[0.9vw] font-[500] text-textLight">
                    {boxes[index].Subject}
                  </h2>
                  <div className="flex h-[17vw]  w-[23vw] flex-col items-start ">
                    <h1 className="m-0  text-center font-title text-[1.8vw]">
                      {boxes[index].title}
                    </h1>
                    <p className="m-0 font-sans text-[1vw] font-normal text-textDark">
                      {boxes[index].paragraphe}
                    </p>
                  </div>
                </div>
                <img
                  src={boxes[index].img}
                  alt="background"
                  className=" mr-2 h-[20vw] w-[26vw] rounded-lg object-cover object-center md:h-[17vw] md:w-[30vw]"
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
            className=" m-[1vw] h-[2.5vw] hover:opacity-65 active:opacity-40"
          />
        </div>
      </div>

      <div className=" relative mt-[3vw] h-[31vw]">
        <img
          src={BgElement}
          alt="background"
          className="absolute bottom-0  left-0 top-0 z-0 w-full object-cover"
        />
        <h1 className="absolute left-[45%] top-[15%] z-10 font-title text-[2vw] font-semibold">
          LMCS Stats
        </h1>
      </div>
      <div className=" relative h-[31vw]">
        <img
          src={graph}
          alt="background"
          className="absolute bottom-0 left-[10vw] top-0 z-0 h-[30vw]"
        />
        <h1 className="absolute left-[65%] top-[20%] z-10 text-center font-title text-[2vw]">
          LMCS Stats
        </h1>
      </div>
    </div>
  );
}
