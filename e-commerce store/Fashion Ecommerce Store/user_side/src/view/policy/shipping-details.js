import React from 'react';
import Header from "../../components/HeaderStyle/secondheader";
import { Footer } from "../../components/FooterStyle/footer";

function ShippingDetails() {
    return (
        <>
            <Header />
            <section>
                <div className='container py-5'>
                    <h1 style={{ textAlign: 'center' }}>Shipping Policy</h1>
                    <div className='py-5 policy'>
                        <p>At Ishita House, we strive to provide efficient and reliable delivery services to ensure the timely receipt of our high-quality apparel by our valued business partners. This Delivery Policy outlines important information regarding our delivery procedures and expectations.</p>
                        <h2><b>1. Delivery Timeframes</b></h2>
                        <p>Delivery timeframes may vary depending on your location and the shipping method chosen during the checkout process. We offer the following delivery options:</p>
                        <ul>
                            <li style={{ fontSize: '18px' }}>
                                Standard Shipping: 7 to 10 Days
                            </li>
                            <li style={{ fontSize: '18px' }}>
                                Expedited Shipping: 5 Days
                            </li>
                        </ul>
                        <p>Please note that delivery times are estimates and not guaranteed. Delays may occur due to factors beyond our control, such as weather, shipping carrier issues, or other unforeseen circumstances.</p>
                        <h2><b>2. Shipping Locations</b></h2>
                        <p>We offer shipping in to India and may expand our shipping options in the future. Please check our website for the most up-to-date information on shipping locations.</p>
                        <h2><b>3. Shipping Costs</b></h2>
                        <p>Shipping costs are calculated based on the shipping method selected, the destination, and the weight of the items in your order. You can view the shipping cost during the checkout process before completing your purchase.</p>
                        <h2><b>4. Order Tracking</b></h2>
                        <p>Once your order is shipped, you will receive a confirmation email with a tracking number. You can use this tracking number to monitor the status and location of your shipment. Please allow up to 1 day for the tracking information to become available.</p>
                        <h2><b>5. Delivery Address</b></h2>
                        <p>Please ensure that the delivery address provided during the checkout process is accurate and complete. We are not responsible for delivery errors or delays caused by incorrect or incomplete address information.</p>
                        <h2><b>6. Signature Requirement</b></h2>
                        <p>For security reasons, some orders may require a signature upon delivery. If you are not available to sign for the delivery, the shipping carrier may leave a notice with instructions for obtaining your package.</p>
                        <h2><b>7. Delivery Issues</b></h2>
                        <p>If you encounter any issues with the delivery of your order, such as a delay or damage, please contact our customer support team at  +91 9023581178  or support@rajrachna.com for assistance. We will work to resolve the issue promptly and to your satisfaction.</p>
                        <h2><b>8. International Shipping</b></h2>
                        <p>For international orders, please be aware that customs and import duties may apply. These charges are the responsibility of the recipient and are not included in the order total or shipping cost. Please check with your local customs office for information on potential fees.</p>
                        <h2><b>9. Contact Us</b></h2>
                        <p>If you have any questions or concerns about our Delivery Policy or need assistance with a delivery-related issue, please contact us at +91 9023581178  or  support@rajrachna.com</p>
                        <p>Thank you for choosing Ishita House. We look forward to delivering our quality apparel to your doorstep and providing you with excellent service.</p>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default ShippingDetails;
