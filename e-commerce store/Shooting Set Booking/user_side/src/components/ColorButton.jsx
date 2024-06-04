import React from 'react'
import BookingForm from './bookingform'

const ColorButton = ({ text }) => {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <div>
      <div onClick={() => setModalShow(true)} style={{ borderRadius: "5px" }} className='bg-primaryClr hover:bg-primaryDarker py-2 px-5 text-white hover:text-black font-btnFont uppercase duration-500'>
        {text}
      </div>
      <BookingForm
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  )
}

export default ColorButton