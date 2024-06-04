/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import bannerDesktop1 from '../../assets/images/1.jpg';
import bannerDesktop2 from '../../assets/images/4.jpg';
import bannerMobile1 from '../../assets/images/1.2.jpg';
import bannerMobile2 from '../../assets/images/4.2.jpg';

const carouselStyle = {
    position: 'relative',
};

function ControlledCarousel() {
    const [index, setIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const slides = isMobile
        ? [
            { image: bannerMobile1, caption: 'Mobile Slide 1', link: '/product-list?search=Lehenga' },
            { image: bannerMobile2, caption: 'Mobile Slide 2', link: '/product-list?search=Saree' },
        ]
        : [
            { image: bannerDesktop1, caption: 'Desktop Slide 1', link: '/product-list?search=Lehenga' },
            { image: bannerDesktop2, caption: 'Desktop Slide 2', link: '/product-list?search=Saree' },
        ];


    return (
        <Carousel fade activeIndex={index} onSelect={handleSelect} className="custom-carousel">
            {slides.map((slide, i) => (
                <Carousel.Item key={i}>
                    <div className="image-container">
                        <a href={slide.link} key={index} ><Image src={slide.image} alt={`Slide ${i + 1}`} fluid className='banner-slideimg' /></a>
                    </div>
                    <Carousel.Caption>
                        {/* <h3>{slide.caption}</h3> */}
                        {/* Add additional caption details as needed */}
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default ControlledCarousel;
