import React from 'react'

import img1 from "../assets/contact-1.png"
import img2 from "../assets/contact-2.png"
import img3 from "../assets/contact-3.png"

const ContactHero = () => {
    let contacts = [
        {
            url: img1,
            head: "Address",
            content: "Vatrika Club galaxy Resort Near Ahmedabad "
        },
        {
            url: img2,
            head: "Phone",
            content: "+91 82000 73366"
        },
        {
            url: img3,
            head: "E-mail",
            content: "vartikaresort@gmail.com"
        },
    ]
    return (
        <div className='bg-mediumBlackClr pb-4'>
            <div className='flex h-[60vh] overflow-hidden relative bg-contact bg-cover bg-center'>
                <h2 className='flex items-center justify-center text-center text-3xl lg:text-8xl w-full text-white font-btnFont bg-gray-800/30 font-normal'>CONTACT US</h2>
            </div>
            <div className='max-w-5xl mt-5 mx-auto container grid grid-cols-1 lg:grid-cols-3 gap-2 relative'>
                {contacts.map(contact => (
                    <div className='bg-black flex flex-col p-7 items-center gap-2 text-white'>
                        <img src={contact.url} alt="" className='h-10' />
                        <h3>{contact.head}</h3>
                        <p>{contact.content}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ContactHero