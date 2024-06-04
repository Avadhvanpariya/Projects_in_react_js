import React from "react";
import { Row } from "react-bootstrap";
import img1 from '../../assets/images/lion.png';
import img2 from '../../assets/images/high-quality.png';
import img3 from '../../assets/images/secure-payment.png';
import img4 from '../../assets/images/power.png';

function FeatureWrapper2() {
    return (
        <>
            <div className="py-5 semifooter-bg">
                <div className="">
                    <div className="semifooter">
                        <div className="feature">
                            <Row>
                                <div className="col-md-3 col-6 text-center mb-md-0 mb-4">
                                    <img
                                        className="img-2 wrapper-img"
                                        alt="Trophy"
                                        src={img1}
                                        style={{ width: '19%' }}
                                    />
                                    <div className="mt-3">
                                        <div className="wrapper-heading">MADE IN INDIA</div>
                                    </div>
                                </div>
                                <div className="col-md-3 col-6 text-center">
                                    <img
                                        className="img-2 wrapper-img"
                                        alt="Guarantee"
                                        src={img2}
                                        style={{ width: '19%' }}
                                    />
                                    <div className="mt-3">
                                        <div className="wrapper-heading">ASSURED QUALITY</div>
                                    </div>
                                </div>
                                <div className="col-md-3 col-6 text-center">
                                    <img
                                        className="img-2 wrapper-img"
                                        alt="Shipping"
                                        src={img3}
                                        style={{ width: '19%' }}
                                    />
                                    <div className="mt-3">
                                        <div className="wrapper-heading">SECURE PAYMENTS</div>
                                    </div>
                                </div>
                                <div className="col-md-3 col-6 text-center">
                                    <img
                                        className="img-2 wrapper-img"
                                        alt="Customer support"
                                        src={img4}
                                        style={{ width: '19%' }}
                                    />
                                    <div className="mt-3">
                                        <div className="wrapper-heading">EMPOWERING WEAVERS</div>
                                    </div>
                                </div>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FeatureWrapper2;
