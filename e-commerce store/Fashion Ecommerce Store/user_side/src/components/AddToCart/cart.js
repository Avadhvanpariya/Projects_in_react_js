import React, { useState, useEffect } from "react";
import img from '../../assets/images/image.png'
import { Button } from "react-bootstrap";
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../js/api';
import notfound from '../../assets/Empty-pana.png'
import DeleteIcon from '@mui/icons-material/Delete';

function Cart() {
    const [userName, setUserName] = useState("");
    const [productData, setProductData] = useState([]);

    const getUserData = async () => {
        try {
            const response = await axiosInstance.get('/get-profile');
            const userData = response.data.data;

            setUserName(userData);
            const cartData = userData.cart;
            setProductData(cartData);

        } catch (error) {
            const localCartData = JSON.parse(localStorage.getItem('localCart')) || [];
            console.log(localCartData)
            setProductData(localCartData);
            console.error('Error in getUserData:', error);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);


    const calculateTotalAmount = () => {
        let total = 0;
        for (const product of productData) {
            total += Number(product.price);
        }

        return total.toString();
    };

    const handleDeleteFromCart = async (productId) => {
        try {
            const auth = localStorage.getItem('authorization');

            if (auth) {
                await axiosInstance.delete(`/remove-cart?product_id=${productId}`);

                setProductData(prevProducts => prevProducts.filter(product => product.product_id !== productId));
                toast.success('Item removed from the cart successfully!');
            } else {
                const localCartData = JSON.parse(localStorage.getItem('localCart')) || [];
                const updatedLocalCartData = localCartData.filter(product => product.product_id !== productId);
                localStorage.setItem('localCart', JSON.stringify(updatedLocalCartData));
                setProductData(updatedLocalCartData);
                toast.success('Item removed from the cart successfully!');
            }

            getUserData();
        } catch (error) {
            console.error('Error removing item from the cart:', error);
            toast.error('Error removing item from the cart. Please try again.');
        }
    };

    return (
        <>
            <div className="pb-5" >
                <div className="container">
                    <div className="mt-md-4 mt-3">
                        <div>
                            <h3 className="mycart-heading ">my Cart </h3>
                        </div>
                        {productData.length === 0 ? (
                            <div className="text-center mt-5">
                                <img src={notfound} alt="Not Found" style={{ width: '350px', height: '350px' }} />
                                <p>You don't have any items in your cart.</p>
                                <p>Go and add products to your cart.</p>
                                <Link to="/product-list" className="btn add-to-cart w-25">Go to Shop</Link>
                            </div>
                        ) : (
                            <div className="row">
                                <div className="col-md-8 p-2" >
                                    <hr style={{ color: '#00646D', height: '2px' }} />
                                    {productData.map(product => (
                                        <div className="row" key={product.product_id}>
                                            <div className="col-md-2 col-3">
                                                <img src={(product.product_images) ? product.product_images : img} className="product-cart-image img-fluid" alt="product" />
                                            </div>
                                            <div className="col-md-9 col-7 px-4">
                                                <h4 className="cart-heading">{product.name}</h4>
                                                <p className="cart-p mb-1 mt-4">Color: {product.color}</p>
                                                <p className="cart-p">Size: {product.size}</p>
                                                <div className="d-flex">
                                                    {/* <input type="number" className="form-control me-2" placeholder="Qty" style={{ width: '75px', height: '30px' }} /> */}
                                                    <p className="addtocart-price">₹{product.price}</p>
                                                </div>
                                            </div>
                                            <div className="col-md-1 col-2">
                                                <button onClick={() => handleDeleteFromCart(product.product_id)} className="btn btn-danger p-1"><DeleteIcon /></button>
                                            </div>
                                            <hr style={{ color: '#00646D', height: '2px', margin: '10px 0px' }} />
                                        </div>
                                    ))}
                                </div>
                                <div className="col-md-4 p-2 px-3">
                                    <hr style={{ color: '#00646D', height: '2px' }} />
                                    <div className="">
                                        <div className="mb-4">
                                            <h3 className="mycart-summary">ORDER SUMMARY</h3>
                                        </div>
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
                                        <Link to="/check-out">
                                            <Button className="add-to-cart">Checkout</Button></Link>
                                        <div className="text-center">
                                            <div className="d-flex justify-content-between">
                                                <div className="m-auto ">
                                                    <div className="addtocart-circle">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                                            <path d="M8.125 5L3.75 8.75L8.125 13.125" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M3.75 8.75H18.1213C22.4231 8.75 26.0763 12.2625 26.2438 16.5625C26.4213 21.1063 22.6669 25 18.1213 25H7.49875" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>
                                                    </div>
                                                    <p className="addtocart-circle-text">Easy<br />
                                                        Returns</p>
                                                </div>
                                                <div className="m-auto">
                                                    <div className="addtocart-circle ml-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                                            <path d="M5 20H20V22.5H5V20ZM2.5 13.75H15V16.25H2.5V13.75Z" fill="white" />
                                                            <path d="M37.3989 20.7575L33.6489 12.0075C33.5527 11.7826 33.3925 11.5909 33.1883 11.4563C32.9841 11.3216 32.7448 11.2499 32.5002 11.25H28.7502V8.75C28.7502 8.41848 28.6185 8.10054 28.3841 7.86612C28.1496 7.6317 27.8317 7.5 27.5002 7.5H7.50017V10H26.2502V25.695C25.6806 26.0257 25.1821 26.466 24.7835 26.9903C24.3849 27.5146 24.094 28.1127 23.9277 28.75H16.0727C15.7684 27.5717 15.0449 26.5448 14.0377 25.8617C13.0304 25.1787 11.8087 24.8865 10.6014 25.0399C9.39416 25.1932 8.28426 25.7816 7.47977 26.6947C6.67529 27.6078 6.23145 28.783 6.23145 30C6.23145 31.217 6.67529 32.3922 7.47977 33.3053C8.28426 34.2184 9.39416 34.8068 10.6014 34.9602C11.8087 35.1135 13.0304 34.8213 14.0377 34.1383C15.0449 33.4552 15.7684 32.4283 16.0727 31.25H23.9277C24.1996 32.3228 24.8215 33.2743 25.6949 33.954C26.5683 34.6336 27.6435 35.0027 28.7502 35.0027C29.8569 35.0027 30.932 34.6336 31.8055 33.954C32.6789 33.2743 33.3008 32.3228 33.5727 31.25H36.2502C36.5817 31.25 36.8996 31.1183 37.1341 30.8839C37.3685 30.6495 37.5002 30.3315 37.5002 30V21.25C37.5002 21.0807 37.4658 20.9131 37.3989 20.7575ZM11.2502 32.5C10.7557 32.5 10.2724 32.3534 9.86125 32.0787C9.45013 31.804 9.1297 31.4135 8.94048 30.9567C8.75126 30.4999 8.70175 29.9972 8.79821 29.5123C8.89467 29.0273 9.13278 28.5819 9.48241 28.2322C9.83204 27.8826 10.2775 27.6445 10.7624 27.548C11.2474 27.4516 11.7501 27.5011 12.2069 27.6903C12.6637 27.8795 13.0541 28.2 13.3289 28.6111C13.6036 29.0222 13.7502 29.5055 13.7502 30C13.7495 30.6628 13.4859 31.2983 13.0172 31.767C12.5485 32.2357 11.913 32.4993 11.2502 32.5ZM28.7502 13.75H31.6752L34.3552 20H28.7502V13.75ZM28.7502 32.5C28.2557 32.5 27.7724 32.3534 27.3613 32.0787C26.9501 31.804 26.6297 31.4135 26.4405 30.9567C26.2513 30.4999 26.2018 29.9972 26.2982 29.5123C26.3947 29.0273 26.6328 28.5819 26.9824 28.2322C27.332 27.8826 27.7775 27.6445 28.2625 27.548C28.7474 27.4516 29.2501 27.5011 29.7069 27.6903C30.1637 27.8795 30.5541 28.2 30.8289 28.6111C31.1036 29.0222 31.2502 29.5055 31.2502 30C31.2495 30.6628 30.9859 31.2983 30.5172 31.767C30.0485 32.2357 29.413 32.4993 28.7502 32.5ZM35.0002 28.75H33.5727C33.2973 27.6793 32.6745 26.7302 31.8017 26.0516C30.929 25.3729 29.8557 25.0031 28.7502 25V22.5H35.0002V28.75Z" fill="white" />
                                                        </svg>
                                                    </div>
                                                    <p className="addtocart-circle-text">Free<br /> shipping</p>
                                                </div>
                                                <div className="m-auto">
                                                    <div className="addtocart-circle">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="43" height="40" viewBox="0 0 43 40" fill="none">
                                                            <path d="M2.6875 32.5C2.6875 32.8315 2.82907 33.1495 3.08108 33.3839C3.33308 33.6183 3.67487 33.75 4.03125 33.75H38.9688C39.3251 33.75 39.6669 33.6183 39.9189 33.3839C40.1709 33.1495 40.3125 32.8315 40.3125 32.5V17.3438H2.6875V32.5ZM8.23047 21.7188C8.23047 21.553 8.30126 21.394 8.42726 21.2768C8.55326 21.1596 8.72415 21.0938 8.90234 21.0938H16.6289C16.8071 21.0938 16.978 21.1596 17.104 21.2768C17.23 21.394 17.3008 21.553 17.3008 21.7188V26.7188C17.3008 26.8845 17.23 27.0435 17.104 27.1607C16.978 27.2779 16.8071 27.3438 16.6289 27.3438H8.90234C8.72415 27.3438 8.55326 27.2779 8.42726 27.1607C8.30126 27.0435 8.23047 26.8845 8.23047 26.7188V21.7188ZM38.9688 6.25H4.03125C3.67487 6.25 3.33308 6.3817 3.08108 6.61612C2.82907 6.85054 2.6875 7.16848 2.6875 7.5V12.6562H40.3125V7.5C40.3125 7.16848 40.1709 6.85054 39.9189 6.61612C39.6669 6.3817 39.3251 6.25 38.9688 6.25Z" fill="white" />
                                                        </svg>
                                                    </div>
                                                    <p className="addtocart-circle-text">Secure<br />
                                                        payments</p>
                                                </div>
                                            </div>
                                            <hr style={{ color: '#00646D', height: '2px' }} />
                                            <p><LocalPostOfficeIcon /> support@rajrachna.com</p>
                                            <hr style={{ color: '#00646D', height: '2px' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;
