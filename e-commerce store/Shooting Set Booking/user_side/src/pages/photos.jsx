import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import PhotosGallery from '../components/PhotosGallery'
import WhatsApp from '../components/whatsappbutton'

const Contact = () => {
    return (
        <div>
            <WhatsApp />
            <Header />
            <PhotosGallery />
            <Footer />
        </div>
    )
}

export default Contact