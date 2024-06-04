import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import Card from '../../../components/Card'
// import img from '../../../assets/images/frame 1.png'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axiosInstance from '../../../js/api'
import { FaDownload, FaShareAlt, FaEdit } from 'react-icons/fa'
import { WhatsappShareButton } from 'react-share'
import { useLocation } from 'react-router-dom'

const OrderView = () => {
  const [orderDetails, setOrderDetails] = useState({
    id: '',
    name: '',
    mobno: '',
    email: '',
    bookDate: '',
    days: '',
    total_persons: '',
    total_amount: '',
    paid_amount: '',
    due_amount: '',
    photographer_mobile: '',
    photographer_names: '',
    payment: '',
    method: '',
    access: '',
    qr_img_url: '',
  })
  const [isEditing, setIsEditing] = useState(false)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const id = searchParams.get('id')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/get-order?id=${id}`)
        if (response.data.status === 200) {
          setOrderDetails(response.data.data[0])
        } else {
          toast.error('Error fetching order details: ' + response.data.message)
        }
      } catch (error) {
        toast.error('Error fetching order details: ' + error.message)
      }
    }
    fetchData()
  }, [id])

  const handleDownloadQRCode = () => {
    const link = document.createElement('a')
    link.href = orderDetails.qr_img_url
    link.download = 'qrcode.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleUpdate = async () => {
    try {
      orderDetails.id = id
      const response = await axiosInstance.post(`/update-order`, orderDetails)
      if (response.data.status === 200) {
        toast.success('Order details updated successfully')
        setIsEditing(false)
      } else {
        toast.error('Error updating order details: ' + response.data.message)
      }
    } catch (error) {
      toast.error('Error updating order details: ' + error.message)
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }))
  }

  useEffect(() => {
    const calculateDueAmount = () => {
      const totalAmount = parseFloat(orderDetails.total_amount) || 0
      const paidAmount = parseFloat(orderDetails.paid_amount) || 0

      const dueAmount = totalAmount - paidAmount

      setOrderDetails((prevDetails) => ({
        ...prevDetails,
        due_amount: isNaN(dueAmount) ? '' : dueAmount.toFixed(0),
      }))
    }

    calculateDueAmount()
  }, [orderDetails.total_amount, orderDetails.paid_amount])

  return (
    <>
      <div>
        <Row>
          <Col xl="12" lg="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Order Details</h4>
                </div>
                {!isEditing && (
                  <div>
                    <Button variant="btn btn-warning" onClick={handleEdit}>
                      <FaEdit /> Edit
                    </Button>
                  </div>
                )}
              </Card.Header>
              <Card.Body>
                <div className="new-user-info">
                  <form>
                    <div className="row">
                      <div className="col-md-3 text-center">
                        <Form.Label htmlFor="qr_img_url">QR Code:</Form.Label>
                        {orderDetails.qr_img_url ? (
                          <>
                            <img
                              src={orderDetails.qr_img_url}
                              alt="QR Code"
                              className="img-fluid"
                              style={{ maxHeight: '200px' }}
                            />
                            {/* Download QR Code Button */}
                            <Button
                              type="button"
                              variant="btn btn-secondary"
                              onClick={handleDownloadQRCode}
                              className="mt-2"
                            >
                              <FaDownload /> Download
                            </Button>
                            {/* Share QR Code Button */}
                            <WhatsappShareButton
                              url={orderDetails.qr_img_url}
                              title="Download this QR Code for your Entry in Vatrika Resort"
                              className="btn btn-success ml-2"
                            >
                              <FaShareAlt /> Share
                            </WhatsappShareButton>
                          </>
                        ) : (
                          <p>QR Code not found</p>
                        )}
                      </div>
                      <div className="col-md-9">
                        <div className="row">
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="transaction_id">
                              Transaction ID:
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="transaction_id"
                              value={orderDetails.transaction_id}
                              placeholder="TXN123451214"
                              readOnly={!isEditing}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="pass">
                              Payment Method:
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="pass"
                              value={orderDetails.method}
                              placeholder="Online"
                              readOnly={!isEditing}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="name">Name:</Form.Label>
                            <Form.Control
                              type="text"
                              id="name"
                              value={orderDetails.name}
                              placeholder="Demo"
                              readOnly={!isEditing}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6  form-group">
                            <Form.Label htmlFor="mobno">Mobile:</Form.Label>
                            <Form.Control
                              type="text"
                              id="mobno"
                              value={orderDetails.mobile}
                              placeholder="123456789"
                              readOnly={!isEditing}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6  form-group">
                            <Form.Label htmlFor="email">Email:</Form.Label>
                            <Form.Control
                              type="email"
                              id="email"
                              value={orderDetails.email}
                              placeholder="enter email"
                              readOnly={!isEditing}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="pass">Book Date:</Form.Label>
                            <Form.Control
                              type="text"
                              value={orderDetails.bookDate}
                              id="pass"
                              placeholder="demo"
                              readOnly={!isEditing}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="pass">Days:</Form.Label>
                            <Form.Control
                              type="text"
                              value={orderDetails.days}
                              id="pass"
                              placeholder="enter days"
                              readOnly={!isEditing}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="pass">
                              Total Person:
                            </Form.Label>
                            <Form.Control
                              type="text"
                              value={
                                orderDetails.total_persons || 'No Data Found'
                              }
                              id="pass"
                              placeholder="demo total_person"
                              readOnly={!isEditing}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="photographer_names">
                              Photographer Name:
                            </Form.Label>
                            <Form.Control
                              type="text"
                              value={
                                orderDetails.photographer_names ||
                                'No Data Found'
                              }
                              id="photographer_names"
                              placeholder="demo Name"
                              readOnly={!isEditing}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="photographer_mobile">
                              Photographer Mobile:
                            </Form.Label>
                            <Form.Control
                              type="text"
                              value={
                                orderDetails.photographer_mobile ||
                                'No Data Found'
                              }
                              id="photographer_mobile"
                              placeholder="demo Mobile"
                              readOnly={!isEditing}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="pass">Payment:</Form.Label>
                            <Form.Control
                              type="text"
                              value={orderDetails.payment}
                              id="pass"
                              placeholder="Done"
                              readOnly={!isEditing}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="total_amount">
                              Total Amount:
                            </Form.Label>
                            <Form.Control
                              type="number"
                              id="total_amount"
                              name="total_amount"
                              value={orderDetails.total_amount}
                              placeholder="Enter Amount in number"
                              readOnly={!isEditing}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="paid_amount">
                              Paid Amount:
                            </Form.Label>
                            <Form.Control
                              type="number"
                              id="paid_amount"
                              name="paid_amount"
                              value={orderDetails.paid_amount || 0}
                              placeholder="Enter Amount in number"
                              readOnly={!isEditing}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="due_amount">
                              Due Amount:
                            </Form.Label>
                            <Form.Control
                              type="number"
                              id="due_amount"
                              name="due_amount"
                              value={orderDetails.due_amount || 0}
                              placeholder="Due Amount"
                              readOnly={!isEditing}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                          <Form.Group className="col-md-12 form-group">
                            <Form.Label htmlFor="pass">Access:</Form.Label>
                            <Form.Control
                              type="text"
                              value={orderDetails.access}
                              id="pass"
                              placeholder="Full Day"
                              readOnly={!isEditing}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                        </div>
                        {isEditing && (
                          <div className="">
                            <Button
                              variant="btn btn-primary"
                              onClick={handleUpdate}
                            >
                              Update
                            </Button>
                            <Button
                              variant="btn btn-secondary"
                              style={{ marginLeft: '8px' }}
                              onClick={handleCancelEdit}
                            >
                              Cancel
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default OrderView
