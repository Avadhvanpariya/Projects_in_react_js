import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Accordion } from 'react-bootstrap';
import Card from '../../../components/Card';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img from '../../../assets/images/category3.webp';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axiosInstance from '../../../js/api';
import CircularProgress from '@mui/material/CircularProgress';


const ProductView = () => {
  const [product, setProduct] = useState([]);
  const [review, setReview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const product_id = searchParams.get('id');


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(`/get-product?id=${product_id}`);
        setProduct(response.data.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error('Error fetching product data:', error);
        toast.error('Error fetching product data');
      }
    };

    const reviewData = async () => {
      try {
        const response = await axiosInstance.get(`/get-product-review?product_id=${product_id}`);
        setReview(response.data.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
        toast.error('Error fetching product data');
      }
    };

    fetchData();
    reviewData();
  }, []);

  const images = product?.product_images || [];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handlePrevImage = () => {
    setActiveImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handleThumbnailClick = (index) => {
    setActiveImageIndex(index);
  };

  return (
    <div className='margintop'>
      <Card>
        <Card.Body>
          <Row>
            <div className='col-md-6'>
              <div className="product-imgs singal-product-img">
                <div className="main-image text-center">
                  <div className="main-image text-center">
                    {images && images.length > 0 && images[activeImageIndex] && (
                      images[activeImageIndex].endsWith('.mp4') ? (
                        <video controls className='w-100'>
                          <source src={images[activeImageIndex]} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
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
                                <video style={{ width: '100%', height: '100%', objectFit: 'contain' }}>
                                  <source src={image} type="video/mp4" />
                                  Your browser does not support the video tag.
                                </video>
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
            </div>
            <div className='col-md-6'>
              <div className='mt-25'>
                <h2 className='product-view-title'>{product.name} </h2>
                <p>( SKU ID- {product.product_id} )</p>
                <div className='mt-50'>
                  <h5 className='product-view-details mt-10'>Color: {product.color ? product.color.join(', ') : 'N/A'}</h5>
                  <h5 className='product-view-details mt-10'>Size: {product.size ? product.size.join(', ') : 'N/A'}</h5>
                  <h5 className='product-view-details mt-10'>category : {product.category_name}</h5>
                </div>
                <h2 className='mt-30' style={{ fontFamily: "Red Hat Mono", fontSize: '28px' }}>₹{product.price}</h2>
                <div className='mt-50'>
                  <h5 className='product-view-dec'>PRODUCT DETAILS :-</h5>
                  <p className='mt-20 ml-10' style={{ whiteSpace: 'pre-line' }}>
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          </Row>
        </Card.Body>
      </Card>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Reviews</Accordion.Header>
          <Accordion.Body>
            <div>
              {review.map((review, index) => (
                <span key={index}>
                  <h3 className='product-view-details'>{review.user_name || 'user name'}</h3>
                  <p style={{ color: "gray", }} className='mb-5'>Date: {new Date(review.createdAt).toLocaleDateString()}</p>
                  <p className='mt-5'>{review.feedback_comment}</p>
                  <hr />
                  {index < review.length - 1 && ' '}
                </span>
              ))}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      {isLoading && <div style={{ position: 'fixed', top: '0%', left: '0%', background: '#00000094', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '999' }}>
        <CircularProgress sx={{ color: '#59acff', width: '60px!important', height: '60px!important' }} />
      </div>}
    </div >

  );
};

export default ProductView;
