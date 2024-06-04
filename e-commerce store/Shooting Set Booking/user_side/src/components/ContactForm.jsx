import React, { useState } from "react";
import Swal from 'sweetalert2';
import axiosInstance from '../js/api'



const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    massages: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitInquiry = (e) => {
    e.preventDefault();
    console.log(formData)
    axiosInstance.post(`/create-inquiry`, formData)
      .then((response) => {
        if (response.data.status === 200) {
          setFormData({
            name: '',
            email: '',
            mobile: '',
            massages: '',
          });

          Swal.fire({
            title: 'Thank You!',
            text: 'Your inquiry has been submitted successfully.',
            icon: 'success',
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong. Please try again later.',
            icon: 'error',
          });
        }
      })
      .catch((error) => {
        console.error('Error submitting form:', error);

        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong. Please try again later.',
          icon: 'error',
        });
      });
  };


  return (
    <div className="contact-background">
      <div className=" pt-5 lg:pt-5 container">
        <h2 className="text-4xl lg:text-6xl text-center w-full font-btnFont text-white pb-2 font-normal" style={{ fontWeight: "600" }}>Inquiry For Booking</h2>
        <p className="text-center text-fontClrGrey font-semibold mb-4">
          If you have any inquiries or concerns, please feel free to reach out. Your questions are important to us, and we are here to assist you. Don't hesitate to send us an inquiry, and we'll ensure a prompt and thorough response. Thank you for considering us as your point of contact
        </p>
        <form onSubmit={handleSubmitInquiry} className="max-w-5xl mx-auto flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2 flex-col lg:flex-row">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Name"
              style={{ borderRadius: "8px" }}
              className="w-full bg-lightBlackClr text-white py-3 px-4 placeholder:text-white"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter E-mail"
              style={{ borderRadius: "8px" }}
              className="w-full bg-lightBlackClr text-white py-3 px-4 placeholder:text-white"
            />
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter Mobile"
              style={{ borderRadius: "8px" }}
              className="w-full bg-lightBlackClr text-white py-3 px-4 placeholder:text-white"
            />
          </div>
          <textarea
            name="massages"
            value={formData.massages}
            onChange={handleChange}
            cols="30"
            rows="10"
            placeholder="Enter Message"
            style={{ borderRadius: "8px" }}
            className="bg-lightBlackClr text-white py-2 px-4 placeholder:text-white"
          ></textarea>
          <div className="pb-20 flex items-center justify-between gap-4 flex-col lg:flex-row">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
