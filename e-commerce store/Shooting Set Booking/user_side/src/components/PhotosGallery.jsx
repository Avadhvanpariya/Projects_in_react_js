import React, { useState } from 'react'
import { Button, Col, Modal } from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.css'
import './gallarystyle.css'
import {
    MDBContainer,
    MDBCol,
    MDBRow,
} from 'mdb-react-ui-kit';

import gallary1 from '../assets/gallary1.jpeg'
import gallary2 from '../assets/gallary2.jpeg'
import gallary3 from '../assets/gallary3.jpeg'
import gallary4 from '../assets/gallary4.jpeg'
import gallary5 from '../assets/gallary5.jpeg'
import gallary6 from '../assets/gallary6.jpeg'
import gallary7 from '../assets/gallary7.jpeg'
import gallary8 from '../assets/gallary8.jpeg'
import gallary9 from '../assets/gallary9.jpeg'
import gallary10 from '../assets/gallary10.jpeg'
import gallary11 from '../assets/gallary11.jpeg'
import gallary12 from '../assets/gallary12.jpeg'
import gallary13 from '../assets/gallary13.jpeg'
import gallary14 from '../assets/gallary14.jpeg'
import gallary15 from '../assets/gallary15.jpeg'
import gallary16 from '../assets/gallary16.jpeg'
import gallary17 from '../assets/gallary17.jpeg'
import gallary18 from '../assets/gallary18.jpeg'
import gallary19 from '../assets/gallary19.jpeg'
import gallary20 from '../assets/gallary20.jpeg'
import gallary21 from '../assets/gallary21.jpeg'
import gallary22 from '../assets/gallary22.jpeg'
import gallary23 from '../assets/gallary23.jpeg'
import gallary24 from '../assets/gallary24.jpeg'
import gallary25 from '../assets/gallary25.jpeg'
import gallary26 from '../assets/gallary26.jpeg'
import gallary27 from '../assets/gallary27.jpeg'
import gallary28 from '../assets/gallary28.jpeg'
import gallary29 from '../assets/gallary29.jpeg'
import gallary30 from '../assets/gallary30.jpeg'
import gallary31 from '../assets/gallary31.jpeg'
import gallary32 from '../assets/gallary32.jpeg'
import gallary33 from '../assets/gallary33.jpeg'
import gallary34 from '../assets/gallary34.jpeg'
import gallary35 from '../assets/gallary35.jpeg'
import gallary36 from '../assets/gallary36.jpeg'
import gallary37 from '../assets/gallary37.jpeg'
import gallary38 from '../assets/gallary38.jpeg'
import gallary39 from '../assets/gallary39.jpeg'
import gallary40 from '../assets/gallary40.jpeg'
import gallary41 from '../assets/gallary41.jpeg'
import gallary42 from '../assets/gallary42.jpeg'
import gallary43 from '../assets/gallary43.jpeg'
import gallary44 from '../assets/gallary44.jpeg'
import gallary45 from '../assets/gallary45.jpeg'

const PhotosGallery = () => {
    const images = [
        gallary1,
        gallary2,
        gallary3,
        gallary4,
        gallary5,
        gallary6,
        gallary7,
        gallary8,
        gallary9,
        gallary10,
        gallary11,
        gallary12,
        gallary13,
        gallary14,
        gallary15,
        gallary16,
        gallary17,
        gallary18,
        gallary19,
        gallary20,
        gallary21,
        gallary22,
        gallary23,
        gallary24,
        gallary25,
        gallary26,
        gallary27,
        gallary28,
        gallary29,
        gallary30,
        gallary31,
        gallary32,
        gallary33,
        gallary34,
        gallary35,
        gallary36,
        gallary37,
        gallary38,
        gallary39,
        gallary40,
        gallary41,
        gallary42,
        gallary43,
        gallary44,
        gallary45,
    ];

    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const openModal = (image) => {
        setSelectedImage(image);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setShowModal(false);
    };
    return (
        <>
            <div className='flex h-[30vh] overflow-hidden relative bg-contact bg-cover'>
                <h2 className='flex  pt-5 text-3xl lg:text-8xl w-full text-white font-btnFont bg-gray-800/30 font-normal' style={{ justifyContent: 'center' }}>Gallery</h2>
            </div>
            <div className='container mb-4 mt-5'>
                <div className='text-start'>
                    <Col xl="12" lg="12">
                        <MDBRow>
                            {images.map((imageUrl, index) => (
                                <MDBCol lg={4} md={12} className='mb-lg-0' key={index}>
                                    <img
                                        src={imageUrl}
                                        style={{ borderRadius: '10px' }}
                                        className='w-100 shadow-1-strong rounded'
                                        alt={`Image ${index + 1}`}
                                        onClick={() => openModal(imageUrl)}
                                    />
                                </MDBCol>
                            ))}
                        </MDBRow>
                    </Col>
                </div >
            </div >
            <Modal
                show={showModal}
                onHide={closeModal}
                dialogClassName="modal-fullscreen"
            >
                <Modal.Body>
                    <Button
                        variant="danger"
                        className="close-button"
                        onClick={closeModal}
                        style={{ position: 'absolute', top: '10px', right: '10px', zIndex: '1' }}
                    >
                        Close
                    </Button>
                    <img
                        src={selectedImage}
                        alt="Selected Image"
                        className='w-100 shadow-1-strong rounded mb-4'
                        style={{ borderRadius: '10px' }}
                    />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default PhotosGallery
