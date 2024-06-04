import React from 'react'

import img1 from "../assets/1.png"
import img2 from "../assets/6.png"
import img3 from "../assets/2.png"
import img4 from "../assets/4.png"
import img5 from "../assets/5.png"
import img6 from "../assets/3.png"

const Whatweprovide2 = () => {
    return (
        <div className="d-none d-md-block">
            <div className=" pt-10 max-w-5xl mx-auto lg:flex-row items-start justify-">
                <div className='pb-5'>
                    <div className="text-4xl lg:text-6xl text-center font-btnFont text-black pb-8">
                        What We Provide
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <div className='service-card mb-3 service-cardimg'>
                                <img src={img1} className='mb-2' alt="" style={{ width: '85px' }} />
                                <div className="text-left text-black text-2xl font-semibold mb-2 w-full lg:w-3/4">
                                    Room Services
                                </div>
                                <div className="text-left text-fontClrGrey font-semibold w-full lg:w-3/4">
                                    Indulge in seamless luxury with our room services, where every request is met with personalized attention to elevate your stay to unparalleled comfort.
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className='service-card mb-3 service-cardimg'>
                                <img src={img2} className='mb-2' alt="" style={{ width: '100px' }} />
                                <div className="text-left text-black text-2xl font-semibold mb-3 w-full lg:w-3/4">
                                    Mini Bar
                                </div>
                                <div className="text-left text-fontClrGrey font-semibold w-full lg:w-3/4">
                                    Elevate your indulgence with our curated mini bar, a tempting selection of beverages ensuring every sip is a moment of luxury.
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className='service-card mb-3 service-cardimg'>
                                <img src={img3} className='mb-2' alt="" style={{ width: '100px' }} />
                                <div className="text-left text-black text-2xl font-semibold mb-3 w-full lg:w-3/4">
                                    Wifi
                                </div>
                                <div className="text-left text-fontClrGrey font-semibold w-full lg:w-3/4">
                                    Experience seamless connectivity and fast internet speeds with our robust Wifi, ensuring you stay effortlessly connected anytime, anywhere.
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className='service-card mb-3 service-cardimg'>
                                <img src={img4} className='mb-2' alt="" style={{ width: '100px' }} />
                                <div className="text-left text-black text-2xl font-semibold mb-3 w-full lg:w-3/4">
                                    Sun Deck Area
                                </div>
                                <div className="text-left text-fontClrGrey font-semibold w-full lg:w-3/4">
                                    Elevate your relaxation under the sun on our stunning sun deck, where every moment is a serene embrace of luxury and panoramic views.
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className='service-card mb-3 service-cardimg'>
                                <img src={img5} className='mb-2' alt="" style={{ width: '90px' }} />
                                <div className="text-left text-black text-2xl font-semibold mb- w-full lg:w-3/4">
                                    Setellite Television Set
                                </div>
                                <div className="text-left text-fontClrGrey font-semibold w-full lg:w-3/4">
                                    Experience entertainment at its finest with our state-of-the-art satellite television set, bringing a world of immersive content right into your living room.
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className='service-card mb-3 service-cardimg'>
                                <img src={img6} className='mb-2' alt="" style={{ width: '60px' }} />
                                <div className="text-left text-black text-2xl font-semibold mb-1 w-full lg:w-3/4">
                                    Double Glazed Windows & Balcony
                                </div>
                                <div className="text-left text-fontClrGrey font-semibold w-full lg:w-3/4">
                                    Elevate your living space with double-glazed windows and a scenic balcony, seamlessly blending energy efficiency with panoramic views for a home that exudes modern comfort.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Whatweprovide2