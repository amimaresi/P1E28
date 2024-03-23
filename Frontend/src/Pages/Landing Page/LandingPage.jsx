import React, { useState } from 'react'
import { NavLink, Outlet, useOutletContext } from "react-router-dom"
import BgElement from './BgElement.svg'
import leftArrow from './left arrow.svg'
import rightArrow from './right arrow.svg'
import { stringify } from 'postcss'


export default function LandingPage() {
  const context = useOutletContext();

  const [boxes, setBoxes] = useState(context.LandingPage.news)   //title, paragraphe, Consept
  const [index, setIndex] = useState(0)
  // 
  return (<div>
    <div className=' pt-16 flex items-center justify-center m-[5vw]'>
      <div className='flex flex-row justify-between items-center rounded-2xl bg-white h-[25vw] md:h-[20vw] w-[70vw] md:w-[65vw] p-[1vw] shadow-md'>

        <img src={leftArrow} onClick={() => setIndex(index == boxes.length - 1 ? 0 : index + 1)} alt="background" className='h-[5vw] md:h-[2.5vw] m-[1vw]' />

        <div className='flex flex-col w-[26vw] md:w-[20vw] h-[20vw] md:h-[17vw] items-start gap-1 md:gap-3'>

          <h2 className='text-[1.5vw] md:text-[1vw]    bg-buttonLight px-[1.5vw] md:px-[1vw] py-[0.7vw] md:py-[0.5vw] rounded-2xl text-textLight text-center m-0 font-title font-normal'>{boxes[index].Subject}</h2>
          <h1 className='text-[3vw] md:text-[2.5vw]  text-center m-0 font-title'>{boxes[index].title}</h1>
          <p className='text-[1.6vw] font-semibold md:font-medium md:text-[1.3vw] w-[24vw] md:w-auto font-text m-0 '>{boxes[index].paragraphe}</p>
        </div>

        <img src={boxes[index].img} alt="background" className=' mr-2 h-[20vw] md:h-[17vw] w-[26vw] md:w-[30vw] object-cover object-center rounded-xl' />


        <img src={rightArrow} onClick={() => setIndex(index == 0 ? boxes.length - 1 : index - 1)} alt="background" className='h-[5vw] md:h-[2.5vw] m-[1vw]' />

      </div>



    </div>

    <div className=' relative'>
      <img src={BgElement} alt="background" className="object-cover w-full md:h-auto  absolute top-0 left-0 bottom-0" />
    </div>

  </div>
  )
}
