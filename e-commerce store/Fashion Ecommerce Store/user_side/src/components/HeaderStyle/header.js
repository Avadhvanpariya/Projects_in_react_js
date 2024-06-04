import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import { Image } from 'react-bootstrap';
import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../../assets/logo.png';
import Form from 'react-bootstrap/Form';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import api from '../../js/api'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Offcanvas from 'react-bootstrap/Offcanvas';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import PinterestIcon from '@mui/icons-material/Pinterest';
import YouTubeIcon from '@mui/icons-material/YouTube';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const navbarStyle = {
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: 'rgb(7 64 68)',
    // position: 'absolute',
    top: 0,
    zIndex: 999,
    width: '100%',

};

const typewriterStyle = {
    animation: 'typing 1.5s steps(25, end) infinite',
    borderBottom: '1px solid white',
    color: 'white',
};

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    background: `linear-gradient(90deg, rgb(8, 68, 69) 46.16%, rgb(4, 31, 34) 99.29%)`,
    '&:hover': {
        background: `linear-gradient(90deg, rgb(8, 68, 69) 46.16%, rgb(4, 31, 34) 99.29%)`,
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    },
}));

function Header(props) {
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [placeholder, setPlaceholder] = useState("Search for Saree");
    const [index, setIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const toggleSearchVisibility = () => {
        setIsSearchVisible(!isSearchVisible);
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };


    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % (placeholder.length + 1));
        }, 200);
        return () => clearInterval(interval);
    }, []);


    const handleSignIn = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please enter both email and password.");
            return;
        }

        try {
            const response = await api.post("/login-user", { email, password });
            const token = response.data.data.authorization;

            localStorage.setItem("authorization", token);
            setModalShow(false);
            toast.success("Login successful", { position: "top-right", className: 'custom-toast' });
            getUserData();
        } catch (error) {
            console.error("Login failed:", error);
            toast.error("Login failed. Please check your details.", {
                position: "top-right",
                className: 'custom-toast'
            });
        }
    };

    const getUserData = async () => {
        try {
            const response = await api.get('/get-profile');
            localStorage.setItem('user_info', JSON.stringify(response.data.data));
            const userData = response.data.data.first_name;;
            setUserName(userData)
        } catch (error) {
            console.error('Error in Get User Data:', error);
        }
    };
    useEffect(() => {
        getUserData()
    }, []);

    const [modalShow, setModalShow] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        try {
            localStorage.removeItem('authorization')
            localStorage.removeItem('user_info')
            toast.success('Logout Successful!');
            window.location.href = '/';
        } catch (error) {
            console.error('Error in handleAgreeAndConfirm:', error);
            toast.error('Logout Failed. Please try again.');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = () => {
        if (searchValue.trim() !== '') {
            let formattedSearchValue = searchValue.trim().toLowerCase();
            formattedSearchValue = formattedSearchValue.replace('croptop', 'crop-top');
            formattedSearchValue = formattedSearchValue.replace('cordset', 'Cord-Set');

            setIsLoading(true);
            window.location.href = `/product-list?search=${formattedSearchValue}`;
            setIsSearchVisible(false);
        }
    };

    const closeLoader = () => {
        setIsLoading(false);
    };
    window.onload = closeLoader;

    const [show, setShow] = useState(false);

    const offhandleClose = () => setShow(false);
    const offhandleShow = () => setShow(true);


    return (
        <>
            {/* Loader */}
            {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255, 255, 255, 0.5)' }}>
                    <CircularProgress />
                </Box>
            )}
            <a href="https://api.whatsapp.com/send?phone=+919898173331&amp;text= I want to know more about Raj-Rachna" class="inquiry"><WhatsAppIcon style={{ fontSize: '30px' }} /></a>
            <Navbar expand="lg" className="custom-navbar" style={navbarStyle}>
                <Container>
                    <Navbar.Brand className="d-block d-md-none">
                        <Link to="/"><Image src={Logo} alt="First slide" width="60px" fluid /></Link>
                    </Navbar.Brand>
                    <div className="d-flex">
                        <Link style={{ color: '#fff' }} className="d-md-none d-block mt-1">
                            <button onClick={toggleSearchVisibility} style={{ background: 'none', border: 'none', padding: '0px' }}>
                                <SearchIcon style={{ fontSize: '30px', paddingTop: '0px', color: '#fff' }} />
                            </button>
                            <div className="container">
                                {isSearchVisible && (
                                    <Search style={{ display: 'flex', position: 'absolute', border: '1px solid #a1a1a1', bottom: '-35px', marginLeft: '0px', background: 'linear-gradient(90deg, rgb(8, 68, 69) 46.16%, rgb(4, 31, 34) 99.29%)!important', left: '00' }}>
                                        <SearchIconWrapper>
                                            <SearchIcon style={{ color: '#000' }} />
                                        </SearchIconWrapper>
                                        <StyledInputBase
                                            placeholder={placeholder.slice(0, index) + '|'}
                                            style={typewriterStyle}
                                            inputProps={{ 'aria-label': 'Search' }}
                                            onChange={(e) => setSearchValue(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                        />
                                        <SearchIconWrapper>
                                            <SearchIcon style={{ color: '#000' }} />
                                        </SearchIconWrapper>
                                        <button onClick={handleSearch} style={{ background: 'none', borderLeft: '1px solid #a1a1a1', color: '#fff' }}>Search</button>
                                    </Search>
                                )}
                            </div>
                        </Link>
                        <Button variant="primary" onClick={offhandleShow} className="d-md-none d-block">
                            <DensityMediumIcon style={{ color: '#fff' }} />
                        </Button>
                    </div>
                    <Navbar.Collapse className="d-lg-block d-none">
                        <Nav className="">
                            <Link to="/" style={{ color: '#e8b583' }}>
                                Home
                            </Link>
                            <Link to="/product-list" style={{ marginLeft: '15px', color: '#e8b583' }}>
                                Shop
                            </Link>
                            <Link to="/contact-us" style={{ marginLeft: '15px', color: '#e8b583' }}>
                                Contact
                            </Link>
                            {/* <Link to="/Blog" style={{ marginLeft: '15px', color: '#e8b583' }}>
                                Blog
                            </Link> */}
                            <Link to="/order-detail" style={{ marginLeft: '15px', color: '#e8b583' }}>
                                Track Order
                            </Link>
                        </Nav>
                        <Navbar.Brand className="me-auto m-auto d-none d-md-block">
                            <Link to="/"><Image src={Logo} alt="First slide" width="60px" fluid /></Link>
                        </Navbar.Brand>
                        <Nav>
                            <Nav.Link className="nav-icon" style={{ marginTop: '6px' }}>
                                <Link style={{ color: '#fff', }}>
                                    <Search style={{ display: 'flex', border: '1px solid #a1a1a1', }}>
                                        <StyledInputBase
                                            placeholder={placeholder.slice(0, 6) + (index <= 14 ? placeholder.slice(6, index) + '|' : placeholder.slice(6) + '|')}
                                            style={typewriterStyle} // Apply typewriter style to the placeholder
                                            inputProps={{ 'aria-label': 'search' }}
                                            onChange={(e) => setSearchValue(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                        />
                                        <SearchIconWrapper>
                                            <SearchIcon style={{ color: '#000' }} />
                                        </SearchIconWrapper>
                                    </Search>
                                </Link>
                            </Nav.Link>
                            <Nav.Link className="nav-icon" style={{ marginTop: '10px' }}>
                                <Link to="/favorites"><FaHeart style={{ fontSize: '25px', paddingTop: '0px', color: '#fff' }} /></Link>
                            </Nav.Link>
                            <Nav.Link className="nav-icon" style={{ marginTop: '10px' }}>
                                <Link to="/add-to-cart"> <FaShoppingCart style={{ fontSize: '25px', color: '#fff' }} /></Link>
                            </Nav.Link>

                            {localStorage.getItem('authorization') ? (
                                <div>
                                    <Button
                                        style={{ fontSize: '18px', color: '#e8b583', marginTop: '10px' }}
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    >
                                        Hi, {userName || 'Raj Rachna User'}
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem >
                                            <Link to="/profile" style={{ color: 'black' }}>
                                                Profile
                                            </Link></MenuItem>
                                        <MenuItem><Link to="/order-detail" style={{ color: 'black' }}>Order Details</Link></MenuItem>
                                        <MenuItem><Link onClick={handleLogout} style={{ color: 'black' }}>Logout</Link></MenuItem>
                                    </Menu>
                                </div>
                            ) : (
                                <Nav.Link className="nav-icon" style={{ marginTop: '10px' }} onClick={() => setModalShow(true)} >
                                    <FaUser style={{ fontSize: '25px', color: '#fff' }} />
                                </Nav.Link>
                            )}
                        </Nav>
                        <Offcanvas show={show} onHide={offhandleClose} style={{ backgroundColor: '#E0E8E8' }}>
                            <Offcanvas.Header closeButton>
                                {/* <Offcanvas.Title>
                                    <Link to="/"><Image src={Logo} alt="First slide" width="60px" fluid /></Link>
                                </Offcanvas.Title> */}
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <div>
                                    {localStorage.getItem('authorization') ? (
                                        <div className="text-left">
                                            <p className="menu-welcome mb-0">
                                                Namaskar!
                                            </p>
                                            <Button
                                                style={{ fontSize: '17px', color: '#000' }}
                                                id="basic-button"
                                                aria-controls={open ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}

                                            >
                                                hi, {userName || 'Raj Rachna User'}
                                            </Button>
                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                            >
                                                <MenuItem >
                                                    <Link to="/profile" style={{ color: 'black' }}>
                                                        Profile
                                                    </Link></MenuItem>
                                                <MenuItem><Link to="/order-detail" style={{ color: 'black' }}>Order Details</Link></MenuItem>
                                                <MenuItem><Link onClick={handleLogout} style={{ color: 'black' }}>Logout</Link></MenuItem>
                                            </Menu>
                                        </div>

                                    ) : (
                                        <>
                                            <p className="menu-welcome mb-0">
                                                Namaskar!
                                            </p>
                                            <Nav.Link className="nav-icon mt-3 text-left" onClick={() => setModalShow(true)} >
                                                <h5 style={{ fontSize: '17px', color: '#000' }} >Login</h5>
                                            </Nav.Link>
                                        </>

                                    )}
                                    <hr className="m-0" style={{ borderTop: '2px solid #042B2E' }} />
                                </div>
                                <Nav className="text-left mt-4">
                                    <Link to="/" className="mb-3" style={{ color: '#000', fontWeight: '500', fontSize: '17px' }}>
                                        Home
                                    </Link>
                                    {/* <Link to="/women" className="mb-3" style={{ color: '#000', fontWeight: '500', fontSize: '17px' }}>
                                        Women
                                    </Link> */}
                                    <Link to="/product-list" className="mb-3" style={{ color: '#000', fontWeight: '500', fontSize: '17px' }}>
                                        Shop
                                    </Link>
                                    <Link to="/contact-us" className="mb-3" style={{ color: '#000', fontWeight: '500', fontSize: '17px' }}>
                                        Contact
                                    </Link>
                                    <Link to="/order-detail" className="mb-3" style={{ color: '#000', fontWeight: '500', fontSize: '17px' }}>
                                        Track Order
                                    </Link>
                                    <Nav.Link className="nav-icon text-left">
                                        <Link to="/favorites"><h5 style={{ fontSize: '17px', color: '#000' }} >
                                            Favorite </h5>
                                        </Link>
                                    </Nav.Link>
                                    <Nav.Link className="nav-icon text-left">
                                        <Link to="/add-to-cart"> <h5 style={{ fontSize: '17px', color: '#000' }}>Cart</h5></Link>
                                    </Nav.Link>
                                </Nav>
                                <hr className="m-0" style={{ borderTop: '2px solid #042B2E' }} />
                                <div className="mt-1">
                                    <div>
                                        <p className="menu-contact mb-0">
                                            Contact
                                        </p>
                                        <div className="menu-email d-flex">
                                            <EmailIcon /> <p style={{ marginLeft: '10px', fontSize: '17px', fontWeight: '500' }} >support@rajrachna.com</p>
                                        </div>
                                        <div className="menu-email d-flex">
                                            <LocalPhoneIcon /> <p style={{ marginLeft: '10px', fontSize: '17px', fontWeight: '500' }}> +91 9898173331</p>
                                        </div>
                                    </div>
                                </div>
                                <hr className="m-0" style={{ borderTop: '2px solid #042B2E' }} />
                                <div>
                                    <div className='d-flex mt-3' style={{ marginLeft: '70px' }}>
                                        <a href='#' className='me-3 social-icon facebook'>
                                            <FacebookIcon style={{ color: "#042B2E" }} />
                                        </a>
                                        <a href='#' className='me-3 social-icon instagram'>
                                            <InstagramIcon style={{ color: "#042B2E" }} />
                                        </a>
                                        <a href='#' className='me-3 social-icon twitter'>
                                            <XIcon style={{ color: "#042B2E" }} />
                                        </a>
                                        <a href='#' className='me-3 social-icon pintrest'>
                                            <PinterestIcon style={{ color: "#042B2E" }} />
                                        </a>
                                        <a href='#' className='me-3 social-icon youtube'>
                                            <YouTubeIcon style={{ color: "#042B2E" }} />
                                        </a>
                                    </div>
                                </div>
                            </Offcanvas.Body>
                        </Offcanvas>

                    </Navbar.Collapse>
                </Container>
                {/* Login Modal */}
                <Modal
                    {...props}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                >
                    <Modal.Body className="login-popup" style={{ background: 'linear-gradient(90deg, #074044 16%, #021114 119.2%)' }}>
                        <div className="">
                            <div className="mt-2 mb-4 mb-md-4 text-white">
                                <h4 style={{ fontSize: '25px' }}>
                                    <i>Login / Sign Up</i>
                                </h4>
                            </div>
                            <Form onSubmit={handleSignIn}>
                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                    <Form.Label className="text-white">Email address</Form.Label>
                                    <Form.Control type="email" value={email} onChange={handleEmailChange} placeholder="Enter email" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupPassword" style={{ position: 'relative' }}>
                                    <Form.Label className="text-white">Password</Form.Label>
                                    <div className="password-input">
                                        <Form.Control
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Password"
                                            value={password}
                                            onChange={handlePasswordChange}
                                            style={{ height: 'calc(2.25rem + 10px)', borderRadius: '10px' }}
                                        />
                                        <div className="password-toggle" onClick={handleTogglePassword} style={{ position: 'absolute', right: '15px', fontSize: '20px', bottom: '10px' }}>
                                            {showPassword ? <BsEyeSlash /> : <BsEye />}
                                        </div>
                                    </div>
                                </Form.Group>
                                <Button className="mt-3 login-button" type="submit">Submit</Button>
                            </Form>
                        </div>
                    </Modal.Body>
                </Modal>
            </Navbar>
            <ToastContainer />
        </>
    );
}

export default Header;
