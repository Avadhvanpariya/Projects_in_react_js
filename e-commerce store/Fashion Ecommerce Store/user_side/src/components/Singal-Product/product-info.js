import React, { useState, useEffect } from 'react';
import MyImage from "./myimage";
import { Row, Button, Offcanvas } from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Typography from '@mui/material/Typography';
import { Link, useLocation, useParams } from 'react-router-dom';
import Slider from "react-slick";
import Checkbox from '@mui/material/Checkbox';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StarIcon from '@mui/icons-material/Star';
import axiosInstance from '../../js/api';
import Swal from 'sweetalert2';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import PercentIcon from '@mui/icons-material/Percent';
import VerifiedIcon from '@mui/icons-material/Verified';
import videoimg from '../../assets/videocall.png'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import Login from '../auth/login';
import { Helmet } from 'react-helmet';
import ReactPlayer from 'react-player';


function ProductInfo() {
    const [product, setProduct] = useState([]);
    const [checked, setChecked] = useState(false);
    const [userReviewsData, setUserReviewData] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const product_id = searchParams.get('product_id');
    const images = product?.product_images || [];
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [favoriteData, setFavoriteData] = useState([]);
    const [isProductAddedToCart, setIsProductAddedToCart] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { productName } = useParams();

    const getUserData = async () => {
        try {
            const response = await axiosInstance.get('/get-profile');
            const userData = response.data.data;

            const favoriteData = userData.favorite_items;
            setFavoriteData(favoriteData)
        } catch (error) {
            console.error('Error in getUserData:', error);
        }
    };

    const fetchReviewsData = async () => {
        try {
            const response = await axiosInstance.get(`/get-review?product_id=${product_id}`);
            const fetchedReviewsData = response.data.data;
            setUserReviewData(fetchedReviewsData)
        } catch (error) {
            console.error('Error in Getting Reviews Data:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.post(`/get-products`, { name: productName });
                console.log(response.data.data)
                setProduct(response.data.data[0]);
            } catch (error) {
                console.error('Error fetching product data:', error);
                toast.error('Error fetching product data');
            }
        };

        fetchData();
        fetchReviewsData();
        getUserData();
    }, [productName]);


    const handleSubmitReview = async () => {
        try {
            const authData = localStorage.getItem('authorization');
            if (!authData) {
                const confirmResult = await Swal.fire({
                    icon: 'info',
                    title: 'You need to log in first! click on login Button you see on top Right Side',
                    text: 'Login to submit a review.',
                    showCancelButton: true,
                });
                return;
            }

            if (!review || rating === 0) {
                toast.error('Please provide both review and rating.');
                return;
            }

            const requestData = {
                product_id: product_id,
                feedback_comment: review,
                rating,
            };
            console.log(requestData);
            const response = await axiosInstance.post('/add-review', requestData);
            toast.success('Review submitted successfully');
            fetchReviewsData();
            setReview('');
            setRating(0);
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error('Error submitting review. Please try again.');
        }
    }

    const handlePrevImage = () => {
        setActiveImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNextImage = () => {
        setActiveImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const handleThumbnailClick = (index) => {
        setActiveImageIndex(index);
    };

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleColorClick = (color) => {
        setSelectedColor(color);
    };

    const handleSizeClick = (size) => {
        setSelectedSize(size);
    };

    const handleChange = async () => {
        try {
            if (favoriteData.includes(product_id)) {
                await axiosInstance.delete(`/remove-like?product_id=${product_id}`);
                getUserData();
                toast.success('Favorites removed successfully!');
            } else {
                await axiosInstance.post("/add-like", { product_id: product_id });
                getUserData();
                toast.success('Favorites added successfully!');
            }
            setFavoriteData((prevData) => {
                if (prevData.includes(product_id)) {
                    return prevData.filter((id) => id !== product_id);
                } else {
                    return [...prevData, product_id];
                }
            }, () => {
                getUserData();
            });

            setChecked(!checked);

        } catch (error) {
            toast.error('Error updating favorites. Please try again.');
            console.error('Error updating favorites:', error);
        }
    };

    const handleAddToCart = async () => {
        try {
            if (!selectedColor || !selectedSize) {
                toast.error('Please select color and size before adding to cart.');
                return;
            }

            const cartItem = {
                product_id: product._id,
                color: selectedColor,
                name: product.name,
                price: product.price,
                product_images: product.product_images[0],
                size: selectedSize,
                quantity: 1
            };

            const authInfo = localStorage.getItem('authorization');

            if (authInfo) {
                const response = await axiosInstance.post("/add-to-cart", cartItem);

                if (response.data.status === 201) {

                } else {
                    toast.success('Product added to the cart successfully!');
                }
            } else {
                let localCart = JSON.parse(localStorage.getItem('localCart')) || [];

                const existingCartItem = localCart.find(item => item.product_id === cartItem.product_id);

                if (existingCartItem) {
                    existingCartItem.quantity += 1;
                } else {
                    localCart.push(cartItem);
                }

                // Save the updated localCart back to localStorage
                localStorage.setItem('localCart', JSON.stringify(localCart));

                toast.success('Product added to the cart successfully!');
            }

            setIsProductAddedToCart(true);
        } catch (error) {
            toast.error('Error adding to cart. Please Try Again Later');
            console.error('Error adding to cart:', error);
        }
    };


    const settings = {
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pagination: true,
        dots: true,
        responsive: [
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    }

    const calculateTotalAmount = () => {

        let subtotal = product.price || 0;

        let totalAmount = subtotal;
        return totalAmount.toFixed(2);
    };

    const handleDetailsShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'Share Details',
                    text: 'Check out This!',
                    url: window.location.href,
                });
            } else {
                alert(`Share Details: ${window.location.href}`);
            }
        } catch (error) {
            console.error('Error Sharing Details:', error);
        }
    };

    const deliveryEstimateDays = 7;

    const getDeliveryDate = () => {
        const today = new Date();
        const deliveryDate = new Date(today.getTime() + deliveryEstimateDays * 24 * 60 * 60 * 1000);
        return deliveryDate.toDateString();
    };


    const [touchStartX, setTouchStartX] = useState(null);
    const [touchEndX, setTouchEndX] = useState(null);

    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEndX(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStartX - touchEndX > 50) {
            handleNextImage();
        } else if (touchEndX - touchStartX > 50) {
            handlePrevImage();
        }
        setTouchStartX(null);
        setTouchEndX(null);
    };

    return (
        <div>
            <Helmet>
                <title>{product.name}</title>
                <meta name="description" content={product.description} />
                <meta name="keywords" content="designer lehenga, ethnic dresses for women, womens collection, designer lehenga blouse, designer lehenga by sabyasachi, women's winter clothing, designer lehenga for wedding, designer lehenga for bride, bridal lehenga golden, designer lehenga for women, bridal lehenga golden colour, trendy women's clothing, raj rachna, raj rachana" />
            </Helmet>
            <div className="container">
                <div role="presentation" className='mt-4 mb-3'>
                    <Breadcrumbs aria-label="breadcrumb" style={{ marginLeft: '20px' }}>
                        <Link underline="hover" color="inherit" to="/" style={{ color: '#000' }}>
                            <HomeIcon />
                        </Link>
                        <Link
                            underline="hover"
                            style={{ color: '#000' }}
                            href=""
                            aria-current="page"
                        >
                            {product.name}
                        </Link>
                    </Breadcrumbs>
                </div>
                <div>
                    <a href="/video-shopping"> <img alt='' src={videoimg} width="100%" /></a>
                </div>
            </div>
            <div className="container mt-md-5 mb-5 mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <div className="product-imgs singal-product-img">
                            <div
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                                className="main-image text-center"
                            >
                                {images && images.length > 0 && images[activeImageIndex] && (
                                    images[activeImageIndex].endsWith('.mp4') ? (
                                        <ReactPlayer
                                            url={images[activeImageIndex]}
                                            width="100%"
                                            height="auto"
                                            style={{ borderRadius: "10px", position: 'relative' }}
                                            playing
                                            controls
                                            loop
                                            muted
                                            playsinline
                                        />
                                    ) : (
                                        <img src={images[activeImageIndex]} alt="" className='w-100' />
                                    )
                                )}
                                <Button onClick={handlePrevImage} variant="outline-success" style={{ fontSize: '16px', backgroundColor: 'transparent', color: '#000', border: 'none' }}> <ArrowBackIosIcon /></Button>
                                <Button onClick={handleNextImage} variant="outline-primary" style={{ fontSize: '16px', backgroundColor: 'transparent', color: '#000', border: 'none' }}><ArrowForwardIosIcon /></Button>
                            </div>
                            <div className="thumbnail-images">
                                {images && images.length > 0 && images.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`thumbnail-image ${index === activeImageIndex ? 'active' : ''}`}
                                        onClick={() => handleThumbnailClick(index)}
                                        style={{ width: '100%' }}
                                    >
                                        <Row>
                                            <div className="col-12 px-2">
                                                <div style={{ width: '100%', height: '110px', cursor: 'pointer' }}>
                                                    {image && image.endsWith('.mp4') ? (
                                                        <ReactPlayer
                                                            url={image}
                                                            width="100%"
                                                            height="100%"
                                                            playing
                                                            loop
                                                            muted
                                                            playsinline
                                                        />
                                                    ) : (
                                                        <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                                    )}
                                                </div>
                                            </div>
                                        </Row>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h2 className="mb-3 singalproduct-name">{product.name}</h2>
                        <div className="d-flex align-items-end">
                            <p className="singalproduct-price">₹{product.price}/-</p><p className='del-product-price'><del>₹{product.c_price}/-</del></p>
                            <p className="singalproduct-taxes">MRP (Inclusive of all taxes)</p>
                        </div>
                        <div>
                            <p className="singalproduct-color">SELECT COLOR</p>
                            <div className="d-flex flex-wrap">
                                {product.color?.map((color) => (
                                    <div
                                        key={color}
                                        className={`size-text m-1 ${selectedColor === color ? "size-active" : ""}`}
                                        onClick={() => handleColorClick(color)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {color}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="singalproduct-color mt-3">SELECT SIZE</p>
                            <div className="d-flex flex-wrap">
                                {product.size?.map((size) => (
                                    <div
                                        key={size}
                                        className={`size-text m-1 ${selectedSize === size ? "size-active" : ""}`}
                                        onClick={() => handleSizeClick(size)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {size}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='d-flex mt-4'>

                            <Button className="add-to-cart mt-0" onClick={handleAddToCart}>Add to Cart</Button>

                            <Login show={showModal} onHide={() => setShowModal(false)} />

                            <div className='border' style={{ padding: '12px 16px' }}>
                                <Checkbox
                                    className="p-0"
                                    onChange={() => handleChange()}
                                    icon={
                                        <FavoriteIcon
                                            sx={{
                                                color: favoriteData.includes(product._id) ? 'red' : 'black',
                                                transform: favoriteData.includes(product._id) ? 'scale(1.1)' : 'scale(1)',
                                            }}
                                        />
                                    }
                                    checkedIcon={
                                        <FavoriteIcon
                                            sx={{
                                                color: 'red',
                                            }}
                                        />
                                    }
                                />
                            </div>
                            <div className='border' style={{ padding: '12px 16px' }}>
                                <Button onClick={() => handleDetailsShare()} style={{ background: 'none', padding: '0', border: '0', color: '#000' }}><ShareIcon /></Button>
                            </div>
                        </div>
                        <Offcanvas show={isProductAddedToCart} onHide={() => setIsProductAddedToCart(false)} placement="end">
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Your Shopping Cart</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <div className="col-12 pb-2" key={product._id}>
                                    <div className="row">
                                        <div className="col-3">
                                            <img src={product.product_images && product.product_images.length > 0 ? product.product_images[0] : ''} className="product-cart-image img-fluid" alt="product" />
                                        </div>
                                        <div className="col-9 px-4  justify-content-between">
                                            <div>
                                                <h4 className="cart-heading" style={{ fontSize: '25px' }}>{product.name}</h4>
                                                <p className="cart-p mb-1 mt-2">Color: {selectedColor}</p>
                                                <p className="cart-p">Size: {selectedSize}</p>
                                                <div className="d-flex">
                                                    <p className="addtocart-price m-0">₹{product.price}/-</p><p className='mt-1' style={{ fontSize: 14, marginLeft: '8px' }}><del>₹{product.c_price}/-</del></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr style={{ color: '#00646D', height: '2px' }} />
                                </div>
                                <div className="">
                                    {/* <div className="mb-4">
                                        <h3 className="mycart-summary">ORDER SUMMARY</h3>
                                    </div> */}
                                    <div className="d-flex justify-content-between">
                                        <p className="mycart-summary-details">Subtotal</p>
                                        <p className="mycart-summary-details">₹{calculateTotalAmount()}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p className="mycart-summary-details">Shipping Charges</p>
                                        <p className="mycart-summary-details">FREE</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p className="mycart-summary-details"><strong>Order Total</strong></p>
                                        <p className="mycart-summary-details"><strong>₹{calculateTotalAmount()}</strong></p>
                                    </div>
                                    <a href='/check-out'> <Button className="add-to-cart mt-0">Buy Now</Button></a>
                                </div>
                            </Offcanvas.Body>
                        </Offcanvas>
                        <div className='row mt-4'>
                            <div className='col-md-6'>
                                <div className='product-option'>
                                    <div className='round-cart'>
                                        <LocalShippingIcon className='text-white' style={{ margin: '2px' }} />
                                    </div>
                                    <p className='mb-0'>Free delivery within India</p>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='product-option mt-3 mt-md-0'>
                                    <div className="round-cart">
                                        <KeyboardReturnIcon className='mt-1 text-white' />
                                    </div>
                                    <p style={{ fontSize: '18px', fontWeight: '500', marginLeft: '10px' }} className='mb-0'>Easy returns in 48 Hours</p>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='product-option mt-3 mt-md-3'>
                                    <div className="round-cart">
                                        <PercentIcon className='text-white' style={{ marginTop: '2px', marginLeft: '2px' }} />
                                    </div>
                                    <p style={{ fontSize: '18px', fontWeight: '500', marginLeft: '10px' }} className='mb-0'>100% Purchase Protection</p>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='product-option mt-3 mt-md-3'>
                                    <div className="round-cart">
                                        <VerifiedIcon className='text-white' style={{ marginTop: '2px', marginLeft: '2px' }} />
                                    </div>
                                    <p style={{ fontSize: '18px', fontWeight: '500', marginLeft: '10px' }} className='mb-0'>Assured Quality</p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <h4 className="mb-1 singalproduct-name mt-4" style={{ fontSize: '24px' }}>Delivery Estimate</h4>
                                <p style={{ fontWeight: '600' }}>Estimated Delivery by: {getDeliveryDate()}</p>
                            </div>
                        </div>
                        <div className="mt-0">
                            <h4 className="mb-1 singalproduct-name mt-1" style={{ fontSize: '24px' }}>Product Details</h4>
                        </div>
                        <div className="singalproduct-des">
                            <p style={{ whiteSpace: 'pre-line', lineHeight: '2', fontWeight: '600' }}>{product.description}</p>
                        </div>
                    </div>
                    <div className='col-12 review-box mt-5'>
                        <h4>Write Review</h4>
                    </div>
                    <div className="col-md-6 mt-3 order-2 order-md-1 px-3">
                        <div className='review-box pb-2'>
                            <textarea
                                className='form-control'
                                rows={7}
                                placeholder='Add Review For Service...'
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                            ></textarea>
                            <div className='d-flex mt-2'>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <StarIcon
                                        key={star}
                                        sx={{ fontSize: '30px', color: rating >= star ? '#FFAE11' : '#000' }}
                                        value={review}
                                        onClick={() => handleRatingChange(star)}
                                    />
                                ))}
                            </div>
                            <div className='mt-2'>
                                <Button variant='contained' className='btn btn-success mt-2 mr-2' onClick={handleSubmitReview}>
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6 order-1 order-md-2'>
                        <Slider {...settings}>
                            {userReviewsData.map(review => (
                                <div key={review.id}>
                                    <div class="testimonial-box-container">
                                        <div class="testimonial-box">
                                            <div class="box-top">
                                                <div class="profile">
                                                    <div class="profile-img">
                                                        <img src={review.user_profile} />
                                                    </div>
                                                    <div class="name-user">
                                                        <strong>{review.user_name}</strong>
                                                        <span>{new Date(review.updatedAt).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                                <div class="reviews">
                                                    {/* Render stars based on the review rating */}
                                                    {Array.from({ length: review.rating }).map((_, starIndex) => (
                                                        <StarIcon key={starIndex} sx={{ fontSize: '30px', color: '#FFAE11' }} />
                                                    ))}
                                                    {/* Render empty stars for the remaining */}
                                                    {Array.from({ length: 5 - review.rating }).map((_, starIndex) => (
                                                        <StarIcon key={starIndex} sx={{ fontSize: '30px', color: '#000' }} />
                                                    ))}
                                                </div>
                                            </div>
                                            <div class="client-comment">
                                                <p>{review.feedback_comment}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductInfo;
