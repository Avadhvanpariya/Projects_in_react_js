import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import img from '../../assets/images/weaccept.png'

export const CheckOutFooter = () => {
    return (
        <MDBFooter className=' text-lg-start text-muted'>
            <hr style={{ color: '#00646D', margin: '0px', border: '1px solid' }} />
            <div className='d-flex justify-content-between'>
                <div className='p-4' style={{ color: '#000' }}>
                    © 2021 Copyright Raj Rachana.
                </div>
                <div className='p-4 d-md-block d-none' style={{ color: '#000' }}>
                    We Accept <img src={img} width="100%" />
                </div>
            </div>
        </MDBFooter>
    );
};