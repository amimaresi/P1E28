import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { buttonVariants } from "@/components/ui/button"
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@radix-ui/react-icons'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Informations from './Outlets/Informations';
import Publications from './Outlets/Publications';
import Statistiques from './Outlets/Statistiques';
import Encadrements from './Outlets/Encadrements';

export default function CPLayout() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    {
      title: "Informations",
      component: <Informations key="informations"/>,
    },
    {
      title: "Publications",
      component: <Publications key="publications"/>,
    },
    {
      title: "Statistiques",
      component: <Statistiques key="stastiques"/>,
    },
    {
      title: "Encadrements",
      component: <Encadrements key="encadrements" />,
    }
  ]

  return (
    <div className='w-full h-full'>
      {/* Navigate back */}
      <div className="flex items-center">
          <ChevronLeftIcon className="w-8 h-8 text-black-500 hover:text-black-700 ml-28 mt-20" />
          <a className="text-3xl mt-20 ml-2 no-underline hover:underline" href='Chercheur'>Chercheur</a>
      </div>

      <div className='flex pl-[20%] gap-x-4'>
        {/* Content */}
        <div className='w-3/5 flex flex-col'>
          {/* Status */}
          <div className='grid grid-rows-2 grid-cols-[20%_20%_auto]'>
            <Avatar className="row-span-2">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <p className='col-span-2'>Abdellah</p>

            <p>status</p>

            <p>actif</p>
          </div>

          {/* Tabs */}
          <div className='flex justify-between'>
            {
              tabs.map((tab, index) => <div key={tab.title} onClick={() => setActiveTab(index)} className='cursor-pointer'>{tab.title}</div>)
            }
          </div>

          {/* Tab Content */}
          <div>
            {
              tabs.map((tab, index) => activeTab === index && tab.component)
            }
          </div>
        </div>

        {/* Accounts Links */}
        <div className='w-1/5 flex flex-col gap-y-2'>
          <Link to="#" className='bg-blue-500 rounded-lg text-white px-1 py-1 hover:bg-blue-600 disabled:bg-blue-700'>Compte Google Scholar</Link>
          <Link to="#" className='bg-blue-500 rounded-lg text-white px-1 py-1 hover:bg-blue-600 disabled:bg-blue-700'>Compte DBLP</Link>
        </div>
      </div>
    </div>
  )
}
