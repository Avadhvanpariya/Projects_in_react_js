import React from 'react';
import Header from "../../components/HeaderStyle/secondheader";
import { Footer } from "../../components/FooterStyle/footer";

function PrivacyPolicy() {
    return (
        <>
            <Header />
            <section>
                <div className='container py-5'>
                    <h1 style={{ textAlign: 'center' }}>Privacy Policy</h1>
                    <div className='py-5 policy'>
                        <p>Welcome to Ishita House, a B2B clothing brand dedicated to providing high-quality apparel to our valued business partners. We understand the importance of safeguarding your personal information and are committed to protecting your privacy.</p>
                        <p>This Privacy Policy explains how we collect, use, disclose, and protect your information when you interact with our website, products, and services.</p>
                        <p>By accessing or using Ishita House’s website or services, you consent to the practices described in this Privacy Policy. Please take a moment to carefully read and understand our policy. If you do not agree with our practices, please do not use our services.</p>
                        <h2><b>Information We Collect</b></h2>
                        <ul>
                            <li>Personal Information: We may collect personal information, such as your name, email address, phone number, and company details when you provide it to us during registration, account setup, or communication with us.</li>
                            <li>Billing Information: When making purchases, we collect billing and payment information, such as credit card details or other payment information, to facilitate transactions.</li>
                            <li>Usage Information: We gather information about your interactions with our website and services, including but not limited to your IP address, browser type, and device information. We may also use cookies and similar technologies to collect this data.</li>
                            <li>
                                Communication: If you contact us via email, phone, or other communication channels, we may collect and store information related to your correspondence.
                            </li>
                        </ul>
                        <h2><b>How We Use Your Information</b></h2>
                        <p>We use the collected information for the following purposes:</p>
                        <ul>
                            <li>Providing Services: To deliver the products and services you request, process transactions, and fulfill orders.</li>
                            <li>Communication: To respond to your inquiries, provide customer support, and send you important updates related to your account or our services.</li>
                            <li>Marketing: To send you promotional emails, newsletters, and other marketing materials about our products, special offers, and events, provided you have opted in to receive such communications. You may opt out at any time.</li>
                            <li>
                                Analytics: To analyze and improve our website, products, and services, as well as to better understand user preferences and trends.
                            </li>
                            <li>
                                Legal Compliance: To comply with legal obligations and protect our rights, safety, and property, as well as that of our users and third parties.
                            </li>
                        </ul>
                        <h2><b>Disclosure of Your Information</b></h2>
                        <p>We may share your information under the following circumstances:</p>
                        <ul>
                            <li>Third-Party Service Providers: We may share information with trusted third-party service providers who assist us in delivering our services, such as payment processors, shipping partners, and marketing agencies.
                            </li>
                            <li>Business Partners: We may share information with our business partners to offer joint promotions or collaborations that may be of interest to you.</li>
                            <li>Legal Compliance: We may disclose information when required by law, regulatory authorities, or to protect our rights, safety, and property.</li>
                        </ul>
                        <h2><b>Data Security</b></h2>
                        <p>We take reasonable steps to protect your information from unauthorized access, disclosure, alteration, or destruction. We employ encryption, access controls, and other security measures to safeguard your data.</p>
                        <h2><b>Your Choices</b></h2>
                        <p>You have the following choices regarding your information:</p>
                        <ul>
                            <li>Access and Update: You can access and update your personal information through your account settings on our website.</li>
                            <li>Marketing Communications: You can opt out of receiving marketing communications from us at any time by following the unsubscribe instructions provided in our emails or by contacting us directly.</li>
                            <li>Cookies: You can manage cookies through your browser settings. However, disabling cookies may limit your access to certain features of our website.</li>
                        </ul>
                        <h2><b>Changes to this Privacy Policy</b></h2>
                        <p>We may update this Privacy Policy from time to time to reflect changes in our practices and services. We will notify you of any significant changes by posting a revised version on our website or through other appropriate channels.</p>
                        <h2><b>Changes to this Privacy Policy</b></h2>
                        <p>If you have any questions or concerns about this Privacy Policy or how we handle your personal information, please contact us at support@rajrachna.com</p>
                        <p>Thank you for trusting Ishita House with your privacy. We are committed to protecting your information and providing you with the best possible experience.</p>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default PrivacyPolicy;
