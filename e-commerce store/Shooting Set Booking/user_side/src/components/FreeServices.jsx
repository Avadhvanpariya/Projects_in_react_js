import React from 'react'
import url from '../assets/gallary20.jpeg'
const FreeServices = () => {
  return (
    <div className="container pt-10 px-2 container mb-5">
      <div className="text-4xl lg:text-6xl text-black w-full font-btnFont text-black">
        About us
      </div>
      <div className='row'>
        <div className='col-lg-5'>
          <div className='flex items-start justify-center w-full  my-4  relative'>
            <img src={url} alt="content" className='w-full object-cover hover:scale-110 duration-500' style={{ borderRadius: "10px" }} />
          </div>
        </div>
        <div className='col-lg-6'>
          <div className="text-left text-fontClrGrey font-semibold p-1 mt-lg-5">
            <h2 style={{ color: '#000' }}>Welcome to Vartika Resorts</h2>
            <p>
              Escape to Vartika Resorts, a harmonious blend of natural splendor and unparalleled luxury. Our journey began with a visionary goal – to create a haven seamlessly merging modern comfort with the raw, untouched beauty of the natural world. Committed to sustainability and community impact, every aspect of Vartika Resorts is thoughtfully designed to minimize our ecological footprint while maximizing our positive influence on the communities we touch. Step into elegantly designed accommodations that redefine luxury within the embrace of nature, where every corner reflects a harmonious coexistence of modernity and the natural world. Immerse yourself in exceptional experiences, from guided nature walks to immersive cultural encounters, ensuring that every moment with us is nothing short of magical. We extend a warm invitation for you to join us at Vartika Resorts, where the magic of nature and hospitality come together to offer a haven of serenity and luxury.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FreeServices