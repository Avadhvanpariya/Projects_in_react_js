import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Image } from 'react-bootstrap';
import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';


function CheckoutHeader() {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <Navbar expand="lg" className="custom-navbar">
                <Container>
                    <Navbar.Brand>
                        <Link to="/"> <Image src={Logo} alt="First slide" width="80px" fluid /></Link>
                    </Navbar.Brand>
                    <Nav>
                        <Nav.Link>
                            <p className='checkout-header-text'>100% Secure Payments</p>
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default CheckoutHeader;
