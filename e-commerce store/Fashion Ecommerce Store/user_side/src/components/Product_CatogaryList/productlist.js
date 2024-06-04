/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Accordion from 'react-bootstrap/Accordion';
import { Form } from "react-bootstrap";
import { useLocation } from 'react-router-dom';
import axiosInstance from '../../js/api';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FavoriteIcon from '@mui/icons-material/Favorite';
import "./mobilefilter.css";
import SortIcon from '@mui/icons-material/Sort';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Login from '../auth/login';
import Spinner from 'react-bootstrap/Spinner';
import notfound from '../../assets/Empty-pana.png'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function ProductCategory() {
  const location = useLocation()
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  const searchParams = new URLSearchParams(location.search)
  const search_name = searchParams.get('search')
  const [productData, setProductData] = useState([])
  const [checked, setChecked] = useState(false)
  const [favoriteData, setFavoriteData] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [selectedSize, setSelectedSize] = useState(null)
  const [loginPopupVisible, setLoginPopupVisible] = useState(false)
  const [showFilters, setShowFilters] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [loading, setLoading] = useState(false)
  const [noProductFound, setNoProductFound] = useState(false)

  const getUserData = async () => {
    try {
      const response = await axiosInstance.get('/get-profile')
      const userData = response.data.data

      const favoriteData = userData.favorite_items
      setFavoriteData(favoriteData)
    } catch (error) {
      console.error('Error in getUserData:', error)
    }
  }

  const getProductData = async (fromSearch) => {
    try {
      setLoading(true)
      setNoProductFound(false)

      let searchParams = {}
      if (!fromSearch) {
        if (selectedCategory) {
          searchParams.name = ''
        } else {
          searchParams.name = search_name || ''
        }
      }
      searchParams.category = [selectedCategory]
      searchParams.size = [selectedSize]
      searchParams.color = selectedColors

      const response = await axiosInstance.post('/get-products', searchParams)
      const responseData = response.data.data
      if (responseData.length === 0) {
        setNoProductFound(true)
      } else {
        setProductData(responseData)
      }
    } catch (error) {
      console.error('Error fetching product data:', error)
      toast.error('Error fetching product data')
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    closeSidebar()
  }

  useEffect(() => {
    getProductData()
  }, [selectedCategory, selectedSize, selectedColors])

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const [showFullContent, setShowFullContent] = useState(false)

  const toggleContent = () => {
    setShowFullContent(!showFullContent)
  }

  const product = {
    id: 1,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Red', 'Blue', 'Wine', 'Pink'],
  }

  const handleColorClick = (color) => {
    setSelectedColors((prevColors) => {
      if (prevColors.includes(color)) {
        return prevColors.filter((c) => c !== color)
      } else {
        return [...prevColors, color]
      }
    })
  }

  const handleSizeClick = (size) => {
    setSelectedSize(size)
    closeSidebar()
  }

  const handleChange = async (product_id) => {
    try {
      if (favoriteData.includes(product_id)) {
        await axiosInstance.delete(`/remove-like?product_id=${product_id}`)
        getUserData()
        toast.success('favorites Removed successfully!')
      } else {
        await axiosInstance.post('/add-like', { product_id: product_id })
        getUserData()
        toast.success('favorites Added successfully!')
      }

      setChecked(!checked)

      setFavoriteData((prevData) => {
        if (prevData.includes(product_id)) {
          return prevData.filter((id) => id !== product_id)
        } else {
          return [...prevData, product_id]
        }
      })
    } catch (error) {
      toast.error('Error updating favorites. Please try again.')
      console.error('Error updating favorites:', error)
    }
  }

  const [isMobile, setIsMobile] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // useEffect to check if the screen size is less than 768 pixels
  useEffect(() => {
    const mediaQuerymobile = window.matchMedia('(max-width: 768.98px)')
    setIsMobile(mediaQuerymobile.matches)
  }, [])

  // Event handler for opening the sidebar
  const openSidebar = () => {
    setIsSidebarOpen(true)
    document.body.style.overflow = 'hidden'
  }

  // Event handler for closing the sidebar
  const closeSidebar = () => {
    setIsSidebarOpen(false)
    document.body.style.overflow = 'auto'
  }

  return (
    <>
      <div className="py-md-5">
        <div className="">
          <div className="row">
            {/* Filters */}
            <div className="col-md-4 p-4">
              <div className="d-none d-lg-block">
                <div className="d-flex justify-content-between">
                  <h3 className="mb-4">Filters</h3>
                </div>
                <Accordion defaultActiveKey="0" flush>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>CATEGORY</Accordion.Header>
                    <Accordion.Body style={{ backgroundColor: '#09444612' }}>
                      <RadioGroup
                        name="category"
                        value={selectedCategory}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                      >
                        <FormControlLabel
                          value="Crop-top"
                          label="Crop-Top"
                          control={<Radio />}
                        />
                        <FormControlLabel
                          value="Cord-Set"
                          label="Cord-set"
                          control={<Radio />}
                        />
                        <FormControlLabel
                          value="Gown"
                          label="Gown"
                          control={<Radio />}
                        />
                        <FormControlLabel
                          value="Kurti"
                          label="Kurti"
                          control={<Radio />}
                        />
                        <FormControlLabel
                          value="Saree"
                          label="Saree"
                          control={<Radio />}
                        />
                        {/* <FormControlLabel value="Dress" label="Dress" control={<Radio />} /> */}
                        <FormControlLabel
                          value="Bridal Lehenga"
                          label="Bridal Lehenga"
                          control={<Radio />}
                        />
                        <FormControlLabel
                          value="Shirt"
                          label="Shirts"
                          control={<Radio />}
                        />
                        <FormControlLabel
                          value="Top"
                          label="Tops"
                          control={<Radio />}
                        />
                        <FormControlLabel
                          value="Ready To Wear Saree"
                          label="Ready To Wear Saree"
                          control={<Radio />}
                        />
                      </RadioGroup>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>SIZE</Accordion.Header>
                    <Accordion.Body style={{ backgroundColor: '#09444612' }}>
                      <div className="row" style={{ marginLeft: '8px' }}>
                        <div className="d-flex" style={{ marginLeft: '8px' }}>
                          {product.sizes.map((size) => (
                            <div
                              key={size}
                              className={`size-text m-1 ${selectedSize === size ? 'size-active' : ''
                                }`}
                              onClick={() => handleSizeClick(size)}
                              style={{ cursor: 'pointer' }}
                            >
                              {size}
                            </div>
                          ))}
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>COLOR</Accordion.Header>
                    <Accordion.Body style={{ backgroundColor: '#09444612' }}>
                      <div className="row">
                        {product.colors.map((color) => (
                          <div
                            key={color}
                            className={`size-text col-3  m-1 ${selectedSize === color ? 'size-active' : ''
                              }`}
                            onClick={() => handleColorClick(color)}
                            style={{ cursor: 'pointer' }}
                          >
                            {color}
                          </div>
                        ))}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
            {/* Product List */}
            <div className="col-md-8">
              <div className="d-flex px-4 justify-content-between">
                <h1
                  className="mb-4"
                  style={{ fontSize: '26px', textTransform: 'capitalize' }}
                >
                  {search_name || 'Shop'}
                </h1>
                {/* <DropdownButton id="dropdown-basic-button" size="sm" title="Sort by Category" style={{ textAlign: 'end', marginRight: '20px' }}>
                                    <Dropdown.Item>Hand Picked</Dropdown.Item>
                                    <Dropdown.Item>What's New</Dropdown.Item>
                                    <Dropdown.Item>Price - High to Low</Dropdown.Item>
                                    <Dropdown.Item>Price - Low To High</Dropdown.Item>
                                    <Dropdown.Item>Popularity</Dropdown.Item>
                                    <Dropdown.Item>Best Seller</Dropdown.Item>
                                </DropdownButton> */}
              </div>
              <div>
                <p style={{ fontSize: '16px' }} className="mb-0 px-4">
                  {showFullContent ? (
                    <>
                      Step into a world where tradition meets elegance with Rajrachana's stunning collection of clothing. Our pieces are inspired by India's rich cultural heritage, blending timeless grace with modern sophistication. Each cloth is crafted with care and attention to detail, ensuring that you feel like royalty whenever you wear Rajrachana. Whether you're a bride, a bridesmaid, or simply love traditional attire, we have something special for you. Explore our range today and experience the beauty, grace, and femininity that define Rajrachana.
                      <button className="btn btn-link" style={{ fontSize: '13px', color: '#073a3b' }} onClick={toggleContent}>Read Less</button>
                    </>
                  ) : (
                    <>
                      Step into a world where tradition meets elegance with Rajrachana's stunning collection of clothing. Our pieces are inspired by India's rich cultural heritage, blending timeless grace with modern sophistication. Each cloth is crafted with care and attention to detail, ensuring...
                      <button className="btn btn-link" style={{ fontSize: '13px', color: '#073a3b' }} onClick={toggleContent}>Read More</button>
                    </>
                  )}
                </p>
              </div>
              {/* Product cards */}
              <div className="row">
                {loading &&
                  <div className="text-center" style={{ marginTop: '100px' }}>
                    <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>
                  </div>
                }
                {noProductFound && (
                  <div className="text-center" style={{ marginTop: '60px' }}>
                    <img src={notfound} alt="notfound" width='40%' />
                    <p style={{ fontSize: '25px' }}>No products found.</p>
                  </div>
                )}
                {!loading && !noProductFound && productData.map(product => (
                  <div key={product.id} className="col-md-3 pt-3 px-3 col-6">
                    <div className="fav-1">
                      <div className="">
                        <a className="" href={`/product-view/${encodeURIComponent(product.name.toLowerCase())}`}>
                          <img src={product.product_images[0]} alt="product" className="img-fluid" />
                          <div className="product-card-details2 mt-3 mb-0 d-flex ">
                            <div>
                              <p style={{ color: '#000', fontSize: '20px' }}>{product.name}</p>
                              <p className="product-card-price2" style={{ fontFamily: 'sans-serif', fontSize: '16px' }}>₹ {product.price}</p>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div className="fav-2">
                        <label htmlFor={`favorite_${product._id}`} className="container">
                          <Checkbox
                            id={`favorite_${product._id}`}
                            className="p-0"
                            {...label}
                            onChange={
                              localStorage.getItem('authorization')
                                ? () => handleChange(product._id)
                                : () => setLoginPopupVisible(true)
                            }
                            icon={
                              <FavoriteIcon
                                sx={{
                                  color: favoriteData.includes(product._id) ? 'red' : 'black',
                                  transform: favoriteData.includes(product._id) ? 'scale(1.1)' : 'scale(1)',
                                }}
                              />
                            }
                            checkedIcon={
                              <FavoriteIcon
                                sx={{
                                  color: 'red',
                                }}
                              />
                            }
                          />
                        </label>
                      </div>
                      <Login show={loginPopupVisible} onHide={() => setLoginPopupVisible(false)} />
                    </div>
                  </div>
                )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile filter */}
      <div className="d-md-none d-block">
        {isMobile && (
          <>
            <div
              className="overlay"
              style={{ display: isSidebarOpen ? 'block' : 'none' }}
              onClick={closeSidebar}
            ></div>
            <div
              className={`search-section d-md-none d-block ${isSidebarOpen ? 'sidebar-open' : ''
                }`}
            >
              <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="d-flex border-bottom filter-header justify-content-between p-3 mb-0">
                  <p className="filter-close-btn" onClick={closeSidebar}>
                    X
                  </p>
                  <p className="" onClick={closeSidebar}>
                    Reset Filters
                  </p>
                </div>
                <div className="sidebar__inner">
                  <h2 className="border-bottom filter-title">CATEGORY</h2>
                  <div className="mb-30 filter-options">
                    <RadioGroup
                      name="use-radio-group"
                      className="row"
                      value={selectedCategory}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                    >
                      <FormControlLabel
                        value="Cord-Set"
                        label="Crop-Top"
                        control={<Radio />}
                      />
                      <FormControlLabel
                        value="Cord-set"
                        label="Cord-set"
                        control={<Radio />}
                      />
                      <FormControlLabel
                        value="Gown"
                        label="Gown"
                        control={<Radio />}
                      />
                      <FormControlLabel
                        value="Kurti"
                        label="Kurti"
                        control={<Radio />}
                      />
                      <FormControlLabel
                        value="Saree"
                        label="Saree"
                        control={<Radio />}
                      />
                      <FormControlLabel
                        value="Shirt"
                        label="Shirts"
                        control={<Radio />}
                      />
                      <FormControlLabel
                        value="Top"
                        label="Tops"
                        control={<Radio />}
                      />
                      <FormControlLabel
                        value="Ready To Wear Saree"
                        label="Ready To Wear Saree"
                        control={<Radio />}
                      />
                      {/* <FormControlLabel value="Dress" label="Dress" control={<Radio />} /> */}
                      <FormControlLabel
                        value="Bridal Lehenga"
                        label="Bridal Lehenga"
                        control={<Radio />}
                      />
                    </RadioGroup>
                  </div>
                  <h2 className="border-bottom filter-title">SIZE</h2>
                  <div className="mb-30 filter-options">
                    <div className="row" style={{ marginLeft: '8px' }}>
                      <div className="d-flex" style={{ marginLeft: '8px' }}>
                        {product.sizes.map((size) => (
                          <div
                            key={size}
                            className={`size-text m-1 ${selectedSize === size ? 'size-active' : ''
                              }`}
                            onClick={() => handleSizeClick(size)}
                            style={{ cursor: 'pointer' }}
                          >
                            {size}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <h2 className="border-bottom filter-title">Color</h2>
                  <div className="mb-30 filter-options">
                    {product.colors?.map((color) => (
                      <FormControlLabel
                        key={color}
                        control={
                          <Checkbox
                            checked={selectedColors.includes(color)}
                            onChange={() => handleColorClick(color)}
                          />
                        }
                        label={color}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="filter-btn-sticky">
              <div className="row">
                <div className="col-6">
                  <button className="w-100 filter-btn" onClick={openSidebar}>
                    <SortIcon /> Filter
                  </button>
                </div>
                <div className="col-6">
                  <Dropdown>
                    <Dropdown.Toggle
                      className="w-100 filter-btn text-black"
                      id="dropdown-basic"
                    >
                      <FilterAltIcon /> Newest First
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="javascript:void(0)">
                        Newest First
                      </Dropdown.Item>
                      <Dropdown.Item href="javascript:void(0)">
                        Lowest First
                      </Dropdown.Item>
                      <Dropdown.Item href="javascript:void(0)">
                        Highest First
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default ProductCategory
