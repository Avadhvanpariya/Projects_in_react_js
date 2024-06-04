// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './view/Home/Home';
import ComingSoon from './view/Home/coming-soon';
import Women from './view/Women/women';
import SingalProduct from './view/Singal-Product/singal-product';
import ProductCatogaryList from './view/Product_Catogary/ProductList';
import ContactUs from './view/Contact/Contact';
import Blog from './view/Blog/Blog';
import AddToCart from './view/Add-to-Cart/AddtoCart';
import CheckOut from './view/Checkout/Checkout';
import Profile from './view/Profile/Profile';
import OrderDetails from './view/order/order';
import FavoritesPage from './components/favorites/favorites';
import ShippingDetails from './view/policy/shipping-details';
import RefundPolicy from './view/policy/refund-policy';
import PrivacyPolicy from './view/policy/privacypolicy';
import TermsAndConditions from './view/policy/terms-and-conditions';
import VideoShopping from './components/Video-Shopping/videoshopping';
import Blogiii from './view/Blog/Blog3';
import Blogii from './view/Blog/Blog2';


function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<ComingSoon />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/women" element={<Women />} />
        <Route path="/product-view/:productName" element={<SingalProduct />} />
        <Route path="/product-list" element={<ProductCatogaryList />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/10-mistakes-you're-making-with-lehenga" element={<Blog />} />
        <Route path="/5-style-hacks-every-woman-needs-to-know" element={<Blogii />} />
        <Route path="/the-biggest-wedding-trends-of-2024" element={<Blogiii />} />
        <Route path="/add-to-cart" element={<AddToCart />} />
        <Route path="/check-out" element={<CheckOut />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/order-detail" element={<OrderDetails />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/shipping-details" element={<ShippingDetails />} />
        <Route path="/refund_policy" element={<RefundPolicy />} />
        <Route path="/privacy_policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/video-shopping" element={<VideoShopping />} />
      </Routes>
    </Router>
  );
}

export default App;
