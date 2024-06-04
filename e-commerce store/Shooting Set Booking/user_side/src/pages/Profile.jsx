import React from 'react'

import BlogHero from '../components/UserProfile'
import Footer from '../components/Footer'
import Header from '../components/Header'
import WhatsApp from '../components/whatsappbutton'

const Profile = () => {
  return (
    <div>
      <WhatsApp />
      <Header />
      <BlogHero />
      <Footer />
    </div>
  )
}

export default Profile