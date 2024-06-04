import React from 'react';
import Header from "../../components/HeaderStyle/secondheader";
import { Footer } from "../../components/FooterStyle/footer";

function RefundPolicy() {
    return (
        <>
            <Header />
            <section>
                <div className='container py-5'>
                    <h1 style={{ textAlign: 'center' }}>Refund policy</h1>
                    <div className='py-5 policy'>
                        <p>At Ishita House, we are committed to providing our valued business partners with high-quality apparel. We understand that sometimes you may encounter issues with your purchase. Please read our Return and Refund Policy carefully to understand our policies regarding returns and exchanges.</p>
                        <h2><b>1. Returns</b></h2>
                        <p>We do not accept returns for products unless they are damaged or defective upon receipt. We take great care in ensuring the quality of our products, but if you believe you have received a damaged or defective item, please follow the instructions in Section 2 to request an exchange.</p>
                        <h2><b>2. Exchange for Damaged or Defective Items</b></h2>
                        <p>If you receive a damaged or defective item, we will be happy to exchange it for a replacement of the same item, provided that:</p>
                        <ul>
                            <li>You notify us within 7 days of receiving the item.</li>
                            <li>You have recorded a video of the unboxing process, clearly showing the condition of the product upon arrival. This video is essential for us to assess the damage or defect and process your exchange.</li>
                            <li>The item is in its original packaging and has not been worn, used, or altered in any way.</li>
                        </ul>
                        <p><b>To request an exchange for a damaged or defective item, please follow these steps:</b></p>
                        <p>Send an email to support@rajrachna.com with the subject line: “Exchange Request – [Your Order Number].”</p>
                        <p>In the email, provide your order number, a detailed description of the issue, and attach the video of the unboxing process.</p>
                        <p>Our customer support team will review your request and respond within 2 business days to provide further instructions on how to return the item and process the exchange.</p>
                        <h2><b>3. Refunds</b></h2>
                        <p>Once your refund is approved the money will get credited to the original payment method in 4 to 5 working days</p>
                        <h2><b>4. Shipping Costs</b></h2>
                        <p>If an exchange is approved for a damaged or defective item, we will cover the cost of shipping the replacement item to you. You will be responsible for shipping the damaged or defective item back to us following the instructions provided by our customer support team.</p>
                        <h2><b>5. Contact Us</b></h2>
                        <p>If you have any questions or concerns about our Return and Refund Policy or need assistance with an exchange request, please contact us at +91 9023581178  or support@rajrachna.com.</p>
                        <p>We appreciate your understanding of our return and exchange policy, as it allows us to continue offering high-quality apparel and excellent service to our business partners. Thank you for choosing Ishita House.</p>

                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default RefundPolicy;
