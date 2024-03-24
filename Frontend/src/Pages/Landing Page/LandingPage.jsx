import React, { useState } from 'react'
import { NavLink, Outlet, useOutletContext } from "react-router-dom"
import BgElement from './BgElement.svg'
import leftArrow from './left arrow.svg'
import rightArrow from './right arrow.svg'
import graph from './graph.png'

export default function LandingPage() {
  const context = useOutletContext();

  const [boxes, setBoxes] = useState(context.LandingPage.news)   //title, paragraphe, Consept
  const [index, setIndex] = useState(1)
  // 
  return (<div className='absolute left-0 right-0 top-0'>
    <div className=' pt-16 flex items-center justify-center m-[4vw]'>
      <div className='flex flex-row justify-between items-center rounded-2xl bg-white h-[20vw] w-[65vw] p-[1vw] shadow-md'>

        <img src={leftArrow} onClick={() => setIndex(index == boxes.length - 1 ? 0 : index + 1)} alt="background" className='h-[2.5vw] m-[1vw]' />

        <div className='flex flex-col  w-[23vw] h-[17vw] items-start gap-[1.5vw]'>

          <h2 className='text-[0.9vw] bg-buttonLight px-[0.7vw] py-[0.4vw] rounded-xl text-textLight text-center m-0 font-title font-[500]'>{boxes[index].Subject}</h2>
          <div className='flex flex-col  w-[23vw] h-[17vw] items-start gap-[0.5vw]'>
            <h1 className='text-[2vw]  text-center m-0 font-title'>{boxes[index].title}</h1>
            <p className=' font-medium text-gray-600 text-[1vw] font-text m-0 '>{boxes[index].paragraphe}</p>
          </div>
        </div>
        <img src={boxes[index].img} alt="background" className=' mr-2 h-[20vw] md:h-[17vw] w-[26vw] md:w-[30vw] object-cover object-center rounded-lg' />


        <img src={rightArrow} onClick={() => setIndex(index == 0 ? boxes.length - 1 : index - 1)} alt="background" className='h-[2.5vw] m-[1vw]' />

      </div>



    </div>

    <div className=' relative h-[31vw]'>

      <img src={BgElement} alt="background" className="object-cover w-full  absolute top-0 left-0 bottom-0 z-0" />
      <h1 className='text-[2vw] absolute left-[45%] top-[15%] font-semibold font-title z-10'>LMCS Stats</h1>
    </div>
    <div className=' relative h-[31vw]'>
      <img src={graph} alt="background" className="absolute top-0 left-[10vw] h-[30vw] bottom-0 z-0" />
      <h1 className='text-[2vw] absolute text-center left-[65%] top-[20%] font-title z-10'>LMCS Stats</h1>
    </div>
  </div>
  )
}
