import React, { useState } from 'react';
import { Col, Modal, Button } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import './gallarystyle.css';
import { MDBCol, MDBRow } from 'mdb-react-ui-kit';

const VideoGallery = () => {
    const [showLightbox, setShowLightbox] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState('');

    const openLightbox = (videoSrc) => {
        setSelectedVideo(videoSrc);
        setShowLightbox(true);
    };

    const closeLightbox = () => {
        setSelectedVideo('');
        setShowLightbox(false);
    };

    return (
        <>
            <div className='flex h-[30vh] overflow-hidden relative bg-contact bg-cover'>
                <h2 className='flex pt-md-5 pt-30  text-3xl lg:text-8xl w-full text-white font-btnFont bg-gray-800/30 font-normal' style={{ justifyContent: 'center' }}>video Gallery</h2>
            </div>
            <div className='container mb-4 mt-5'>
                <div className='text-start'>
                    <Col xl="12" lg="12">
                        <MDBRow>
                            {videoList.map((video, index) => (
                                <MDBCol key={index} lg={4} md={12} className='mb-lg-0'>
                                    <div onClick={() => openLightbox(video)}>
                                        <img
                                            src={video.banner}
                                            alt={`YouTube video banner ${index}`}
                                            className='w-100 shadow-1-strong rounded mb-3 img-fluid'
                                        />
                                    </div>
                                </MDBCol>
                            ))}
                        </MDBRow>
                    </Col>
                </div>
            </div>

            {/* Lightbox for displaying the video */}
            <Modal show={showLightbox} onHide={closeLightbox} dialogClassName="modal-fullscreen">
                <Modal.Body>
                    <Button
                        variant="danger"
                        className="close-button"
                        onClick={closeLightbox}
                        style={{ position: 'absolute', top: '10px', right: '10px', zIndex: '1' }}
                    >
                        Close
                    </Button>
                    <iframe
                        title="YouTube video player"
                        width="80%"
                        height="80%"
                        src={selectedVideo.src}
                        className='d-none d-md-block'
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        style={{ textAlign: 'center', marginTop: '100px', marginLeft: '130px' }}
                    ></iframe>
                     <iframe
                        title="YouTube video player"
                        width="80%"
                        height="80%"
                        src={selectedVideo.src}
                        className='d-block d-md-none'
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        style={{ textAlign: 'center', marginTop: '100px', marginLeft: '30px' }}
                    ></iframe>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default VideoGallery;

// Sample video list
const videoList = [
    {
        src: "https://www.youtube.com/embed/BjJ7HHEPMe8?si=MeeK0numxjevmmH2",
        banner: "https://i.ytimg.com/vi/BjJ7HHEPMe8/hqdefault.jpg"
    },
    {
        src: "https://www.youtube.com/embed/prpYvglcKxc?si=Ysbouls664MKp2Oa",
        banner: "https://i.ytimg.com/vi/prpYvglcKxc/hqdefault.jpg",
    },
    {
        src: "https://www.youtube.com/embed/A2oHk5VgLDY?si=HrrKJ7C5It6muY8R",
        banner: "https://i.ytimg.com/vi/A2oHk5VgLDY/hqdefault.jpg",
    },
    {
        src: "https://www.youtube.com/embed/2U4a9xxXeHU?si=6wt-4BeZzho_lNdt",
        banner: "https://i.ytimg.com/vi/2U4a9xxXeHU/hqdefault.jpg",
    },
    {
        src: "https://www.youtube.com/embed/CkVV4wZNUnc?si=RFCcH3zvs6gsPUWc",
        banner: "https://i.ytimg.com/vi/3r5bfmPEqwg/hqdefault.jpg",
    },
    {
        src: "https://www.youtube.com/embed/CkVV4wZNUnc?si=RFCcH3zvs6gsPUWc",
        banner: "https://i.ytimg.com/vi/CkVV4wZNUnc/hqdefault.jpg",
    },
    {
        src: "https://www.youtube.com/embed/RFVXR8ybkog?si=Q_fQ5ZB88c7F8-4F",
        banner: "https://i.ytimg.com/vi/RFVXR8ybkog/hqdefault.jpg",
    },
    {
        src: "https://www.youtube.com/embed/ZwhhEArIlXU?si=KnRGirOkc4sBKlpn",
        banner: "https://i.ytimg.com/vi/ZwhhEArIlXU/hqdefault.jpg",
    },
];
