import React from 'react'
import ContactForm from '../components/ContactForm'
import ContactHero from '../components/ContactHero'
import Footer from '../components/Footer'
import Header from '../components/Header'
import WhatsApp from '../components/whatsappbutton'

const Contact = () => {
  return (
    <div>
      <WhatsApp />
      <Header />
      <ContactHero />
      <ContactForm />
      <Footer />
    </div>
  )
}

export default Contact