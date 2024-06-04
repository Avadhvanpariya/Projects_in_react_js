import React from 'react'
import url from '../assets/newsletter-2.jpg'

const ServicesCard = ({tag}) => {
  return (
    <div className='flex items-start justify-center w-full h-60 bg-blackClr my-4 overflow-hidden relative'>
        <img src={url} alt="content" className='w-full object-cover hover:scale-110 duration-500'/>
    </div>
  )
}

export default ServicesCard
