import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Form } from 'react-bootstrap'
import Card from '../../../components/Card'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import TextField from '@mui/material/TextField'
import AddIcon from '@mui/icons-material/Add'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import DrawIcon from '@mui/icons-material/Draw'
import VisibilityIcon from '@mui/icons-material/Visibility'
import img from '../../../assets/images/category3.webp'
import axiosInstance from '../../../js/api'
import DeleteIcon from '@mui/icons-material/Delete'
import CircularProgress from '@mui/material/CircularProgress'
import Swal from 'sweetalert2'

const ProductList = () => {
  const [product, setProduct] = useState([])

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await axiosInstance.get('/get-product')
        setProduct(response.data.data)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        console.error('Error fetching product data:', error)
        toast.error('Error fetching product data')
      }
    }

    fetchData()
  }, [])

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const filteredPrices = product.filter((admin) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase()
    const productName = admin.name?.toLowerCase().includes(lowerCaseSearchTerm)
    const stockIncludes = admin.stock
      ?.toLowerCase()
      .includes(lowerCaseSearchTerm)
    const categoryIncludes = admin.category
      ?.toLowerCase()
      .includes(lowerCaseSearchTerm)

    return productName || categoryIncludes || stockIncludes
  })

  const indexOfLastPrice = currentPage * itemsPerPage
  const indexOfFirstPrice = indexOfLastPrice - itemsPerPage
  const currentPrices = filteredPrices.slice(
    indexOfFirstPrice,
    indexOfLastPrice,
  )

  const totalPages = Math.ceil(filteredPrices.length / itemsPerPage)

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

  const handleProductRemove = (productId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        removeProduct(productId)
      }
    })
  }

  const removeProduct = async (productId) => {
    try {
      await axiosInstance.delete(`/remove-product?productId=${productId}`)
      setProduct((prevProduct) =>
        prevProduct.filter((product) => product._id !== productId),
      ) // Change 'id' to '_id'
      toast.success('product removed successfully')
    } catch (error) {
      console.error('Error removing product:', error)
      toast.error('Error removing product')
    }
  }

  const displayProduct = currentPrices.map((product, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={product.product_images[0] || img}
            alt={`Product ${product.id}`}
            style={{
              width: '50px',
              height: '50px',
              marginRight: '10px',
              objectFit: 'contain',
            }}
            className="img-fluid"
          />
          <span>
            <b>{product.name}</b>
          </span>
        </div>
      </td>
      <td>{product.stockQuantity}</td>
      <td>{product.category_name}</td>
      <td>{product.price}</td>
      <td>
        <div className="flex align-items-center list-user-action">
          <Link
            className="btn btn-sm btn-icon btn-success"
            to={`/product/view-product?id=${product._id}`}
          >
            <span className="btn-inner">
              <VisibilityIcon style={{ fontSize: '35px' }} />
            </span>
          </Link>
          <Link
            style={{ marginLeft: '10px' }}
            className="btn btn-sm btn-icon btn-info"
            to={`/product/update-product?id=${product._id}`}
          >
            <span className="btn-inner">
              <DrawIcon style={{ fontSize: '35px' }} />
            </span>
          </Link>
          <button
            style={{ marginLeft: '10px' }}
            className="btn btn-sm btn-icon btn-danger"
            onClick={() => handleProductRemove(product._id)}
          >
            <span className="btn-inner">
              <DeleteIcon style={{ fontSize: '35px' }} />
            </span>
          </button>
        </div>
      </td>
    </tr>
  ))

  return (
    <>
      <div className="margintop">
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header>
                <div className="header-title d-none d-md-block">
                  <h4 className="card-title">Product List</h4>
                </div>
                <div className="header-title">
                  <Link
                    className="btn btn-btn btn-primary px-3 mb-lg-0 mb-2 mr-10 "
                    to="/product/add-product"
                    style={{ fontWeight: '600' }}
                  >
                    <AddIcon /> Add Product
                  </Link>
                </div>
              </Card.Header>
              <Card.Body className="px-0" style={{ position: 'relative' }}>
                <div className="card-body pt-0">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="header-title">
                      <TextField
                        placeholder="Search"
                        id="outlined-size-small"
                        size="small"
                        className="search-filed"
                        style={{ marginRight: '10px', width: '300px' }}
                        value={searchTerm}
                        onChange={handleSearchInputChange}
                      />
                    </div>
                    <div className="header-title">
                      <Form
                        as="select"
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        style={{ width: '80px', padding: '5px 5px' }}
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        {/* Add more options as needed */}
                      </Form>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <table
                    id="user-list-table"
                    className="table table-striped"
                    role="grid"
                    data-toggle="data-table"
                  >
                    <thead>
                      <tr className="ligth">
                        <th>
                          <b>No.</b>
                        </th>
                        <th>
                          <b>Product</b>
                        </th>
                        <th>
                          <b>Stock</b>
                        </th>
                        <th>
                          <b>Category</b>
                        </th>
                        <th>
                          <b>Price</b>
                        </th>
                        <th>
                          <b>Action</b>
                        </th>
                      </tr>
                    </thead>
                    <tbody>{displayProduct}</tbody>
                  </table>
                </div>
                {/* Material-UI Pagination */}
                <Stack spacing={2} style={{ marginTop: '20px' }}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                  />
                </Stack>
              </Card.Body>
            </Card>
          </Col>
          {isLoading && (
            <div
              style={{
                position: 'fixed',
                top: '0%',
                left: '0%',
                background: '#00000094',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: '999',
              }}
            >
              <CircularProgress
                sx={{
                  color: '#59acff',
                  width: '60px!important',
                  height: '60px!important',
                }}
              />
            </div>
          )}
        </Row>
      </div>
      <ToastContainer />
    </>
  )
}

export default ProductList
