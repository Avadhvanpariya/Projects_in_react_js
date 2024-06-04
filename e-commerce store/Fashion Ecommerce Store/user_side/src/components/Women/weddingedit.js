import React from "react";
import { Link } from "react-router-dom";

function WeddingEdit() {

    return (
        <>
            <div className="py-5 body-bg wedding-edite-bg" style={{ height: '380px' }}>
                <div className="container">
                    <div className="text-center">
                        {/* <h5 className="min-heading mb-3" style={{ color: '#007B84' }}>Wedding Outfits</h5> */}
                        <h2 className="text-white">THE WEDDING EDIT</h2>
                    </div>
                    <div className="mt-5">
                        <div>
                            <div className="row m-2">
                                <div className="col-md-6">
                                    <img src="https://manyavar.scene7.com/is/image/manyavar/Mohey%20LP_Explore_Lehenga_D_07-06-2023-09-40?$WT%5FWLP%2FCategory1%5FD$" alt="product" className="m-auto mb-4 mb-md-0  wedding-edit-img"  />
                                </div>
                                <div className="col-md-6">
                                    <img src="https://manyavar.scene7.com/is/image/manyavar/Mohey%20LP_Explore_Lehenga_D_07-06-2023-09-40?$WT%5FWLP%2FCategory1%5FD$" alt="product" className="m-auto wedding-edit-img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WeddingEdit;
