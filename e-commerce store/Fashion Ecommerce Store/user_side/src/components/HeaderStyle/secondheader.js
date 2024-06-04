import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Modal from 'react-bootstrap/Modal'
import { Image } from 'react-bootstrap'
import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from '../../assets/logo.png'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import api from '../../js/api'
import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import Offcanvas from 'react-bootstrap/Offcanvas'
import DensityMediumIcon from '@mui/icons-material/DensityMedium'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import XIcon from '@mui/icons-material/X'
import PinterestIcon from '@mui/icons-material/Pinterest'
import YouTubeIcon from '@mui/icons-material/YouTube'
import EmailIcon from '@mui/icons-material/Email'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'

const navbarStyle = {
  paddingTop: 0,
  paddingBottom: 0,
  background: 'linear-gradient(90deg, #084445 46.16%, #041F22 99.29%)',
  top: 0,
  width: '100%',
}

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
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}))

function Header(props) {
  const [userData, setUserData] = useState({
    mobile: '',
    password: '',
    email: '',
  })
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [isSignUpModalVisible, setIsSignUpModalVisible] = useState(false)
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false)

  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible)
  }

  const toggleModal = () => {
    setModalShow(!modalShow)
    setIsSignUpModalVisible(false)
  }

  const toggleSignUpModal = () => {
    setIsSignUpModalVisible(!isSignUpModalVisible)
    setModalShow(false)
  }

  const toggleLoginModal = () => {
    setIsLoginModalVisible(!isLoginModalVisible)
    setIsSignUpModalVisible(false)
    setModalShow(true)
  }

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSignIn = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('Please enter both email and password.')
      return
    }

    try {
      const response = await api.post('/login-user', { email, password })
      const token = response.data.data.authorization

      localStorage.setItem('authorization', token)
      setModalShow(false)
      toast.success('Login successful', {
        position: 'top-right',
        className: 'custom-toast',
      })
      getUserData()
    } catch (error) {
      console.error('Login failed:', error)
      toast.error('Login failed. Please check your details.', {
        position: 'top-right',
        className: 'custom-toast',
      })
    }
  }

  const getUserData = async () => {
    try {
      const response = await api.get('/get-profile')
      localStorage.setItem('user_info', JSON.stringify(response.data.data))
      const userData = response.data.data.first_name
      setUserName(userData)
    } catch (error) {
      console.error('Error in Get User Data:', error)
    }
  }
  useEffect(() => {
    getUserData()
  }, [])

  const [modalShow, setModalShow] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    try {
      localStorage.removeItem('authorization')
      localStorage.removeItem('user_info')
      toast.success('Logout Successful!')
      window.location.href = '/'
    } catch (error) {
      console.error('Error in handleAgreeAndConfirm:', error)
      toast.error('Logout Failed. Please try again.')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleSearch = () => {
    if (searchValue.trim() !== '') {
      let formattedSearchValue = searchValue.trim().toLowerCase();
      formattedSearchValue = formattedSearchValue.replace('croptop', 'crop-top');
      formattedSearchValue = formattedSearchValue.replace('Cord set', 'Cord-set');

      window.location.href = `/product-list?search=${formattedSearchValue}`;
      setIsSearchVisible(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault()
    if (
      !userData.email ||
      !userData.mobile ||
      !userData.password ||
      !userData.rePassword
    ) {
      toast.error('Please fill in all the fields.')
      return
    }

    if (userData.password !== userData.rePassword) {
      toast.error('Passwords do not match. Please re-enter your password.')
      return
    }

    try {
      const response = await api.post('/create-user', userData)

      console.log(response.data.data.success)
      const token = response.data.data.authorization
      localStorage.setItem('authorization', token)
      getUserData()

      toast.success('Sing-Up successfully', {
        position: 'top-right',
        className: 'custom-toast',
      })

      setUserData({
        mobile: '',
        password: '',
        email: '',
        rePassword: '',
      })

      setIsSignUpModalVisible(false)
    } catch (error) {
      console.error('Error creating user:', error)
      toast.error('An unexpected error occurred. Please try again later.', {
        position: 'top-right',
        className: 'custom-toast',
      })
    }
  }

  const [show, setShow] = useState(false)

  const offhandleClose = () => setShow(false)
  const offhandleShow = () => setShow(true)
  return (
    <>
      <a
        href="https://api.whatsapp.com/send?phone=+919898173331&amp;text= I want to know more about Raj-Rachna"
        class="inquiry"
      >
        <WhatsAppIcon style={{ fontSize: '30px' }} />
      </a>
      <Navbar expand="lg" className="custom-navbar" style={navbarStyle}>
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <Image src={Logo} alt="First slide" width="60px" fluid />
            </Link>
          </Navbar.Brand>
          <div className="d-flex">
            <Link style={{ color: '#fff' }} className="d-md-none d-block mt-1">
              <button
                onClick={toggleSearchVisibility}
                style={{ background: 'none', border: 'none', padding: '0px' }}
              >
                <SearchIcon
                  style={{ fontSize: '30px', paddingTop: '0px', color: '#fff' }}
                />
              </button>
              <div className="container">
                {isSearchVisible && (
                  <Search
                    style={{
                      display: 'flex',
                      position: 'absolute',
                      border: '1px solid #a1a1a1',
                      bottom: '-35px',
                      marginLeft: '0px',
                      zIndex: '999',
                      background:
                        'linear-gradient(90deg, rgb(8, 68, 69) 46.16%, rgb(4, 31, 34) 99.29%)!important',
                      left: '00',
                    }}
                  >
                    <SearchIconWrapper>
                      <SearchIcon style={{ color: '#000', zIndex: '1000' }} />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search…"
                      inputProps={{ 'aria-label': 'search' }}
                      onChange={(e) => setSearchValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <button
                      onClick={handleSearch}
                      style={{
                        background: 'none',
                        borderLeft: '1px solid #a1a1a1',
                        color: '#fff',
                      }}
                    >
                      Search
                    </button>
                  </Search>
                )}
              </div>
            </Link>
            <Button
              variant="primary"
              onClick={offhandleShow}
              className="d-md-none d-block"
            >
              <DensityMediumIcon style={{ color: '#fff' }} />
            </Button>
          </div>
          <Navbar.Collapse className="d-lg-block d-none">
            <Nav className="me-auto m-auto">
              <Link to="/" style={{ color: '#e8b583' }}>
                Home
              </Link>
              {/* <Link
                to="/women"
                style={{ marginLeft: '15px', color: '#e8b583' }}
              >
                Women
              </Link> */}
              <Link
                to="/product-list"
                style={{ marginLeft: '15px', color: '#e8b583' }}
              >
                Shop
              </Link>
              <Link
                to="/contact-us"
                style={{ marginLeft: '15px', color: '#e8b583' }}
              >
                Contact
              </Link>
              {/* <Link to="/Blog" style={{ marginLeft: '15px', color: '#e8b583' }}>
                                Blog
                            </Link> */}
              <Link
                to="/order-detail"
                style={{ marginLeft: '15px', color: '#e8b583' }}
              >
                Track Order
              </Link>
            </Nav>
            <Offcanvas
              show={show}
              onHide={offhandleClose}
              style={{ backgroundColor: '#E0E8E8' }}
            >
              <Offcanvas.Header closeButton>
                {/* <Offcanvas.Title>
                                    <Link to="/"><Image src={Logo} alt="First slide" width="60px" fluid /></Link>
                                </Offcanvas.Title> */}
              </Offcanvas.Header>
              <Offcanvas.Body>
                <div>
                  {localStorage.getItem('authorization') ? (
                    <div className="text-left">
                      <p className="menu-welcome mb-0">Namaskar!</p>
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
                        <MenuItem>
                          <Link to="/profile" style={{ color: 'black' }}>
                            Profile
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link to="/order-detail" style={{ color: 'black' }}>
                            Order Details
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link
                            onClick={handleLogout}
                            style={{ color: 'black' }}
                          >
                            Logout
                          </Link>
                        </MenuItem>
                      </Menu>
                    </div>
                  ) : (
                    <Nav.Link
                      className="nav-icon mt-3 text-left"
                      onClick={() => setModalShow(true)}
                    >
                      <h5 style={{ fontSize: '17px', color: '#000' }}>Login</h5>
                    </Nav.Link>
                  )}
                  <hr
                    className="m-0"
                    style={{ borderTop: '2px solid #042B2E' }}
                  />
                </div>
                <Nav className="text-left mt-4">
                  <Link
                    to="/"
                    className="mb-3"
                    style={{
                      color: '#000',
                      fontWeight: '500',
                      fontSize: '17px',
                    }}
                  >
                    Home
                  </Link>
                  <Link
                    to="/product-list"
                    className="mb-3"
                    style={{
                      color: '#000',
                      fontWeight: '500',
                      fontSize: '17px',
                    }}
                  >
                    Shop
                  </Link>
                  <Link
                    to="/contact-us"
                    className="mb-3"
                    style={{
                      color: '#000',
                      fontWeight: '500',
                      fontSize: '17px',
                    }}
                  >
                    Contact
                  </Link>
                  {/* <Link to="/Blog" className="mb-3" style={{ color: '#000', fontWeight: '500', fontSize: '17px' }}>
                                        Blog
                                    </Link> */}
                  <Link
                    to="/order-detail"
                    className="mb-3"
                    style={{
                      color: '#000',
                      fontWeight: '500',
                      fontSize: '17px',
                    }}
                  >
                    Track Order
                  </Link>
                  <Nav.Link className="nav-icon text-left">
                    <Link to="/favorites">
                      <h5 style={{ fontSize: '17px', color: '#000' }}>
                        Favorite{' '}
                      </h5>
                    </Link>
                  </Nav.Link>
                  <Nav.Link className="nav-icon text-left">
                    <Link to="/add-to-cart">
                      {' '}
                      <h5 style={{ fontSize: '17px', color: '#000' }}>Cart</h5>
                    </Link>
                  </Nav.Link>
                </Nav>
                <hr
                  className="m-0"
                  style={{ borderTop: '2px solid #042B2E' }}
                />
                <div className="mt-1">
                  <div>
                    <p className="menu-contact mb-0">Contact</p>
                    <div className="menu-email d-flex">
                      <EmailIcon />{' '}
                      <p
                        style={{
                          marginLeft: '10px',
                          fontSize: '17px',
                          fontWeight: '500',
                        }}
                      >
                        support@rajrachna.com
                      </p>
                    </div>
                    <div className="menu-email d-flex">
                      <LocalPhoneIcon />{' '}
                      <p
                        style={{
                          marginLeft: '10px',
                          fontSize: '17px',
                          fontWeight: '500',
                        }}
                      >
                        {' '}
                        +91 9898173331
                      </p>
                    </div>
                  </div>
                </div>
                <hr
                  className="m-0"
                  style={{ borderTop: '2px solid #042B2E' }}
                />
                <div>
                  <div className="d-flex mt-3" style={{ marginLeft: '70px' }}>
                    <a href="#" className="me-3 social-icon facebook">
                      <FacebookIcon style={{ color: '#042B2E' }} />
                    </a>
                    <a href="#" className="me-3 social-icon instagram">
                      <InstagramIcon style={{ color: '#042B2E' }} />
                    </a>
                    <a href="#" className="me-3 social-icon twitter">
                      <XIcon style={{ color: '#042B2E' }} />
                    </a>
                    <a href="#" className="me-3 social-icon pintrest">
                      <PinterestIcon style={{ color: '#042B2E' }} />
                    </a>
                    <a href="#" className="me-3 social-icon youtube">
                      <YouTubeIcon style={{ color: '#042B2E' }} />
                    </a>
                  </div>
                </div>
              </Offcanvas.Body>
            </Offcanvas>
            <Nav>
              <Nav.Link className="nav-icon">
                <Link style={{ marginLeft: '15px', color: '#fff' }}>
                  <button
                    onClick={toggleSearchVisibility}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '0px',
                    }}
                  >
                    <SearchIcon
                      style={{
                        fontSize: '30px',
                        paddingTop: '0px',
                        color: '#fff',
                      }}
                    />
                  </button>
                  {isSearchVisible && (
                    <Search
                      style={{
                        display: 'flex',
                        position: 'absolute',
                        border: '1px solid #a1a1a1',
                        bottom: '-35px',
                        marginLeft: '0px',
                        zIndex: '999',
                        background:
                          'linear-gradient(90deg, rgb(8, 68, 69) 46.16%, rgb(4, 31, 34) 99.29%)!important',
                      }}
                    >
                      <SearchIconWrapper>
                        <SearchIcon style={{ color: '#000', zIndex: '1000' }} />
                      </SearchIconWrapper>
                      <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                      />
                      <button
                        onClick={handleSearch}
                        style={{
                          background: 'none',
                          borderLeft: '1px solid #a1a1a1',
                          color: '#fff',
                        }}
                      >
                        Search
                      </button>
                    </Search>
                  )}
                </Link>
              </Nav.Link>
              <Nav.Link className="nav-icon">
                <Link to="/favorites">
                  <FaHeart
                    style={{
                      fontSize: '25px',
                      paddingTop: '0px',
                      color: '#fff',
                    }}
                  />
                </Link>
              </Nav.Link>
              <Nav.Link className="nav-icon">
                <Link to="/add-to-cart">
                  {' '}
                  <FaShoppingCart style={{ fontSize: '25px', color: '#fff' }} />
                </Link>
              </Nav.Link>

              {localStorage.getItem('authorization') ? (
                <div>
                  <Button
                    style={{ fontSize: '18px', color: '#e8b583' }}
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
                    <MenuItem>
                      <Link to="/profile" style={{ color: 'black' }}>
                        Profile
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="/order-detail" style={{ color: 'black' }}>
                        Order Details
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link onClick={handleLogout} style={{ color: 'black' }}>
                        Logout
                      </Link>
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <Nav.Link
                  className="nav-icon"
                  onClick={() => setModalShow(true)}
                >
                  <FaUser style={{ fontSize: '25px', color: '#fff' }} />
                </Nav.Link>
              )}
            </Nav>
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
          <Modal.Body
            className="login-popup"
            style={{
              background: 'linear-gradient(90deg, #074044 16%, #021114 119.2%)',
            }}
          >
            <div className="">
              <div className="mt-2 mb-4 mb-md-4 text-white">
                <h4 style={{ fontSize: '25px' }}>
                  <i>
                    Login /{' '}
                    <Link
                      onClick={toggleSignUpModal}
                      style={{
                        fontSize: '12px',
                        textDecorationLine: 'underline',
                        color: '#27c0d0',
                      }}
                    >
                      Don't Have An Account?
                    </Link>
                  </i>
                </h4>
              </div>
              <Form onSubmit={handleSignIn}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label className="text-white">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter email"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="formGroupPassword"
                  style={{ position: 'relative' }}
                >
                  <Form.Label className="text-white">Password</Form.Label>
                  <div className="password-input">
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={password}
                      onChange={handlePasswordChange}
                      style={{
                        height: 'calc(2.25rem + 10px)',
                        borderRadius: '10px',
                      }}
                    />
                    <div
                      className="password-toggle"
                      onClick={handleTogglePassword}
                      style={{
                        position: 'absolute',
                        right: '15px',
                        fontSize: '20px',
                        bottom: '10px',
                      }}
                    >
                      {showPassword ? <BsEyeSlash /> : <BsEye />}
                    </div>
                  </div>
                </Form.Group>
                <Button className="mt-3 login-button" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </Modal.Body>
        </Modal>
        {/* Sing-up Modal */}
        <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={isSignUpModalVisible}
          onHide={() => setIsSignUpModalVisible(false)}
        >
          <Modal.Body
            className="login-popup"
            style={{
              background: 'linear-gradient(90deg, #074044 16%, #021114 119.2%)',
            }}
          >
            <div className="">
              <div className="mt-2 mb-4 mb-md-4 text-white">
                <h4 style={{ fontSize: '25px' }}>
                  <i>
                    Sign Up /{' '}
                    <Link
                      onClick={toggleLoginModal}
                      style={{
                        fontSize: '12px',
                        textDecorationLine: 'underline',
                        color: '#27c0d0',
                      }}
                    >
                      I Already Have An Account.
                    </Link>
                  </i>
                </h4>
              </div>
              <Form onSubmit={handleSignUp}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label className="text-white">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label className="text-white">Mobile no.</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Mobile no."
                    value={userData.mobile}
                    onChange={(e) =>
                      setUserData({ ...userData, mobile: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="formGroupPassword"
                  style={{ position: 'relative' }}
                >
                  <Form.Label className="text-white">Password</Form.Label>
                  <div className="password-input">
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={userData.password}
                      onChange={(e) =>
                        setUserData({ ...userData, password: e.target.value })
                      }
                      style={{
                        height: 'calc(2.25rem + 10px)',
                        borderRadius: '10px',
                      }}
                    />
                    <div
                      className="password-toggle"
                      onClick={handleTogglePassword}
                      style={{
                        position: 'absolute',
                        right: '15px',
                        fontSize: '20px',
                        bottom: '10px',
                      }}
                    >
                      {showPassword ? <BsEyeSlash /> : <BsEye />}
                    </div>
                  </div>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="formGroupRePassword"
                  style={{ position: 'relative' }}
                >
                  <Form.Label className="text-white">Re-Password</Form.Label>
                  <div className="password-input">
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Re-Enter Password"
                      value={userData.rePassword}
                      onChange={(e) =>
                        setUserData({ ...userData, rePassword: e.target.value })
                      }
                      style={{
                        height: 'calc(2.25rem + 10px)',
                        borderRadius: '10px',
                      }}
                    />
                    <div
                      className="password-toggle"
                      onClick={handleTogglePassword}
                      style={{
                        position: 'absolute',
                        right: '15px',
                        fontSize: '20px',
                        bottom: '10px',
                      }}
                    >
                      {showPassword ? <BsEyeSlash /> : <BsEye />}
                    </div>
                  </div>
                </Form.Group>
                <Button className="mt-3 login-button" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </Modal.Body>
        </Modal>
      </Navbar>
      <ToastContainer />
    </>
  )
}

export default Header
