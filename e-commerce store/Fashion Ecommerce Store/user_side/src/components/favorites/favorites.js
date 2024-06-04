import React, { useState, useEffect } from "react";
import img from '../../assets/images/bn.jpg'
import Header from "../HeaderStyle/secondheader";
import { Footer } from "../FooterStyle/footer";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import api from '../../js/api';
import notfound from '../../assets/Empty-pana.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../js/api';

function FavoritesPage() {
    const [productData, setProductData] = useState([]);

    const getUserData = async () => {
        try {
            // Fetch user's profile data
            const response = await api.get('/get-profile');
            const userData = response.data.data;

            const favoriteData = userData.favorite_items;
            const favDataPromises = favoriteData.map(async (id) => {
                try {
                    const productResponse = await axiosInstance.post(`/get-products?id=${id}`);
                    return productResponse.data.data

                } catch (error) {
                    console.error('Error fetching product data:', error);
                    return null;
                }
            });

            const productDataArray = await Promise.all(favDataPromises);

            setProductData(productDataArray.filter(product => product !== null).flat());
        } catch (error) {
            console.error('Error in getUserData:', error);
        }
    };
    useEffect(() => {
        getUserData();
    }, []);

    const handleRemoveLike = async (productId) => {
        try {
            await axiosInstance.delete(`/remove-like?product_id=${productId}`);

            setProductData(prevProducts => prevProducts.filter(product => product.product_id !== productId));
            getUserData()
            toast.success('Like removed successfully!');
        } catch (error) {
            console.error('Error removing like:', error);
            toast.error('Error removing like. Please try again.');
        }
    };

    return (
        <>
            <Header />
            <section class="ban_sec">
                <div class="ban_img">
                    <img src={img} alt="banner" border="0" />
                    <div class="ban_text">
                        <h2 className="text-white m-auto">My favorites</h2>
                    </div>
                </div>
            </section>
            <section>
                <div className="container-fluid mb-4">
                    <div className="container">
                        <div className="row">
                            {productData.length === 0 ? (
                                <div className="text-center mt-5 mb-5">
                                    <img src={notfound} alt="Not Found" style={{ width: '350px', height: '350px' }} />
                                    <h4 className="mt-3 mb-0">Favorites not found.</h4>
                                    <p className="mb-2 mt-2">Go to the shop and add some favorites!</p>
                                    <Link to="/product-list" className="btn add-to-cart w-25">Go to Shop</Link>
                                </div>
                            ) : (
                                productData.map(product => (
                                    <div className="col-12 pb-2" key={product._id}>
                                        <hr style={{ color: '#00646D', height: '2px' }} />
                                        <div className="row">
                                            <div className="col-md-1 col-3">
                                                <img src={(product.product_images && product.product_images.length > 0) ? product.product_images[0] : img} className="product-cart-image img-fluid" alt="product" />
                                            </div>
                                            <div className="col-md-11 col-9 px-4 justify-content-between d-flex">
                                                <div>
                                                    <h4 className="cart-heading" style={{ fontSize: '25px' }}>{product.name}</h4>
                                                    <p className="cart-p mb-1 mt-2">Color: {product.color ? product.color.join(',') : 'N/A'}</p>
                                                    <p className="cart-p">Size: {product.size ? product.size.join(',') : 'N/A'}</p>
                                                    <div className="">
                                                        <p className="addtocart-price m-0">₹{product.price}</p>
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <Link onClick={() => handleRemoveLike(product._id)}>
                                                        <FavoriteIcon style={{ fontSize: '25px', paddingTop: '0px', color: 'red' }} />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default FavoritesPage;
