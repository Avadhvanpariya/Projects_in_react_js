import React from 'react'

import { SlHandbag } from 'react-icons/sl'

const CartModal = () => {
  return (
    <div className='w-10 flex items-center justify-center  relative'>
      <SlHandbag size={20} fill='white' className='absolute hover:cursor-pointer'/>
      <span className='absolute z-20 bg-primaryClr p-1 w-5 h-5 flex items-center justify-center left-5 bottom-3 lg:bottom-7 rounded-full text-xs text-white'>1</span>
    </div>
  )
}

export default CartModal