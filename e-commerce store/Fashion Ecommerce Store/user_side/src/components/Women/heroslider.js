import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import bannerDesktop1 from '../../assets/images/banner3.png';
import bannerMobile1 from '../../assets/images/banner3.png';


function ControlledCarousel2() {
    const [index, setIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const slides = isMobile
        ? [
            { image: bannerMobile1, caption: 'Mobile Slide 1' },
        ]
        : [
            { image: bannerDesktop1, caption: 'Desktop Slide 1' },
        ];

    return (
        <Carousel className="custom-carousel">
            {slides.map((slide, i) => (
                <Image src={slide.image} alt={`Slide ${i + 1}`} fluid className='banner-slideimg' />
            ))}
        </Carousel>
    );
}

export default ControlledCarousel2;
