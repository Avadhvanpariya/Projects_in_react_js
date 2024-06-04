import React from 'react'

import Footer from '../components/Footer'
import Header from '../components/Header'
import VideoGallery from '../components/VideosGallery'
import WhatsApp from '../components/whatsappbutton'

const Contact = () => {
    return (
        <div>
            <WhatsApp />
            <Header />
            <VideoGallery />
            <Footer />
        </div>
    )
}

export default Contact

