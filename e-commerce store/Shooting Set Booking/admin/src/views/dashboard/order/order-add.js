import React, { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { Row, Col, Form, Button } from 'react-bootstrap'
import Card from '../../../components/Card'
import img from '../../../assets/images/frame 1.png'
import axiosInstance from '../../../js/api'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './styles.css'
import { format } from 'date-fns'
import { DateRangePicker } from 'rsuite'
import { FaDownload, FaShareAlt } from 'react-icons/fa'
import { WhatsappShareButton } from 'react-share'
import 'react-datepicker/dist/react-datepicker.css'

const OrderAdd = () => {
  const [orderDetails, setOrderDetails] = useState({
    transaction_id: '',
    selectedUser: '',
    mobile: '',
    email: '',
    bookDate: [new Date(), new Date()],
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

  const [qrCodeUrl, setQrCodeUrl] = useState()
  const [userList, setUserList] = useState([])

  const handleInputChange = (e) => {
    const { name, value } = e.target

    if (name === 'name') {
      const selectedUser = userList.find((user) => user.full_name === value)
      if (selectedUser) {
        setOrderDetails((prevDetails) => ({
          ...prevDetails,
          selectedUser: selectedUser,
          email: selectedUser.email,
          mobile: selectedUser.mobile,
        }))
      }
    } else {
      setOrderDetails((prevDetails) => ({ ...prevDetails, [name]: value }))
    }
  }

  const [isLoading, setIsLoading] = useState(false)
  const handleGenerateQRCode = async () => {
    try {
      setIsLoading(true)
      const dateOrderDetails = {
        ...orderDetails,
        name: orderDetails.selectedUser.full_name,
        bookDate: orderDetails.bookDate.map((date) =>
          format(date, 'dd/MM/yyyy'),
        ),
      }

      const qrCodeResponse = await axiosInstance.post(
        '/create-qr',
        dateOrderDetails,
      )

      if (qrCodeResponse.data.status === 200) {
        setQrCodeUrl(qrCodeResponse.data.data.qrCodeUrl)
        toast.success('QR code generated successfully')
      } else {
        toast.error('Error generating QR code: ' + qrCodeResponse.data.message)
      }
    } catch (error) {
      toast.error('Error generating QR code: ' + error.message)
    } finally {
      setIsLoading(false) // Ensure that isLoading is set to false regardless of success or failure
    }
  }

  function generateTransactionId() {
    const randomString = Math.random().toString(10).substring(2, 10)

    const timestamp = new Date().getTime()
    const transactionId = `TXN${randomString}${timestamp}`

    return setOrderDetails((prevDetails) => ({
      ...prevDetails,
      transaction_id: transactionId,
    }))
  }

  const handleCreateOrder = async () => {
    try {
      setIsLoading(true)

      const updatedOrderDetails = {
        ...orderDetails,
        user_id: orderDetails.selectedUser._id,
        name: orderDetails.selectedUser.full_name,
        qr_img_url: qrCodeUrl,
        bookDate: orderDetails.bookDate.map((date) =>
          format(date, 'dd/MM/yyyy'),
        ),
      }

      console.log(updatedOrderDetails)

      const response = await axiosInstance.post(
        '/create-order',
        updatedOrderDetails,
      )

      if (response.data.status === 200) {
        toast.success('Order created successfully')
      } else {
        toast.error('Error creating order: ' + response.data.message)
      }
    } catch (error) {
      toast.error('Error creating order: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await axiosInstance.get('/get-users-profile')
        if (response.data.status === 200) {
          setUserList(response.data.data)
        } else {
          toast.error('Error fetching user list: ' + response.data.message)
        }
      } catch (error) {
        toast.error('Error fetching user list: ' + error.message)
      }
    }

    fetchUserList()
    generateTransactionId()
  }, [])

  const handleDownloadQRCode = () => {
    const link = document.createElement('a')
    link.href = qrCodeUrl
    link.download = 'qrcode.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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
              </Card.Header>
              <Card.Body>
                <div className="new-user-info">
                  <form>
                    <div className="row">
                      <div className="col-md-3 text-center">
                        {qrCodeUrl ? (
                          <div className="mt-3">
                            <img
                              src={qrCodeUrl}
                              alt="QR Code"
                              className="img-fluid"
                            />
                          </div>
                        ) : (
                          <div className="mt-3">
                            <img
                              src={img}
                              alt="Placeholder"
                              className="img-fluid"
                              style={{ filter: 'blur(2px)' }}
                            />
                          </div>
                        )}
                        <Button
                          type="button"
                          variant="btn btn-primary"
                          className="mt-2"
                          onClick={handleGenerateQRCode}
                        >
                          Generate QR Code
                        </Button>
                        {/* Download QR Code Button */}
                        {qrCodeUrl && (
                          <Button
                            type="button"
                            variant="btn btn-secondary ml-2 mt-2"
                            onClick={handleDownloadQRCode}
                          >
                            <FaDownload /> Download
                          </Button>
                        )}
                        {/* Share QR Code Button */}
                        {qrCodeUrl && (
                          <WhatsappShareButton
                            url={qrCodeUrl}
                            title="Check out my QR Code"
                            className="btn btn-success ml-2 mt-2"
                          >
                            <FaShareAlt /> Share
                          </WhatsappShareButton>
                        )}
                      </div>
                      <div className="col-md-9">
                        <div className="row">
                          <Form.Group className="col-md-6  form-group">
                            <Form.Label htmlFor="transaction_id">
                              Transaction ID :-
                            </Form.Label>
                            <Form.Control
                              type="transaction_id"
                              id="transaction_id"
                              name="transaction_id"
                              value={orderDetails.transaction_id}
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="name">Name:</Form.Label>
                            <Form.Control
                              as="select"
                              id="name"
                              name="name"
                              onChange={handleInputChange}
                            >
                              <option value="">Select Name</option>
                              {userList.map((user) => (
                                <option key={user.id} value={user.full_name}>
                                  {user.full_name}
                                </option>
                              ))}
                            </Form.Control>
                          </Form.Group>
                          <Form.Group className="col-md-6  form-group">
                            <Form.Label htmlFor="mobile">Mobile:</Form.Label>
                            <Form.Control
                              type="text"
                              id="mobile"
                              name="mobile"
                              value={orderDetails.mobile}
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6  form-group">
                            <Form.Label htmlFor="email">Email:</Form.Label>
                            <Form.Control
                              type="email"
                              id="email"
                              name="email"
                              value={orderDetails.email}
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="days">Days:</Form.Label>
                            <Form.Control
                              type="text"
                              id="days"
                              name="days"
                              placeholder="Enter Days"
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="bookDate">
                              Book Date:
                            </Form.Label>
                            <br />
                            <DateRangePicker
                              value={orderDetails.bookDate}
                              onChange={(value) =>
                                setOrderDetails((prevDetails) => ({
                                  ...prevDetails,
                                  bookDate: value,
                                }))
                              }
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="total_persons">
                              Total Person:
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="total_persons"
                              name="total_persons"
                              placeholder="Enter total_person"
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="photographer_names">
                              Photographer Names :
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="photographer_names"
                              name="photographer_names"
                              placeholder="Enter Photographer Names"
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="photographer_mobile">
                              Photographer Mobile :
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="photographer_mobile"
                              name="photographer_mobile"
                              placeholder="Enter Photographer Mobile"
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="payment">Payment:</Form.Label>
                            <select
                              name="payment"
                              value={orderDetails.payment}
                              className="selectpicker form-control"
                              data-style="py-0"
                              onChange={handleInputChange}
                            >
                              <option hidden>Select Payment Status</option>
                              <option value="Full">Full</option>
                              <option value="Advance">Advance</option>
                            </select>
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="method">Method:</Form.Label>
                            <select
                              name="method"
                              value={orderDetails.method}
                              className="selectpicker form-control"
                              data-style="py-0"
                              onChange={handleInputChange}
                            >
                              <option hidden>Select</option>
                              <option value="online">Online</option>
                              <option value="cash">Cash</option>
                            </select>
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
                              value={orderDetails.paid_amount}
                              placeholder="Enter Amount in number"
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
                              value={orderDetails.due_amount}
                              placeholder="Due Amount"
                              readOnly
                            />
                          </Form.Group>
                          <Form.Group className="col-md-12 form-group">
                            <Form.Label htmlFor="access">Access:</Form.Label>
                            <select
                              name="access"
                              value={orderDetails.access}
                              className="selectpicker form-control"
                              data-style="py-0"
                              onChange={handleInputChange}
                            >
                              <option value="Full Day">Full Day</option>
                              <option value="Half Day 07:00 AM to 01:00 PM">
                                {' '}
                                Half Day 07:00 AM to 01:00 PM
                              </option>
                              <option value="Half Day 02:00 PM to 09:00 PM">
                                {' '}
                                Half Day 02:00 PM to 09:00 PM
                              </option>
                              <option value="Mini Package 02:30 hour">
                                Mini Package 02:30 hour
                              </option>
                            </select>
                          </Form.Group>
                        </div>
                        <Button
                          type="button"
                          variant="btn btn-primary"
                          className="mt-2"
                          onClick={handleCreateOrder}
                        >
                          Create Order
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </Card.Body>
            </Card>
            {isLoading && (
              <>
                {/* Desktop Spinner */}
                <div className="d-none d-md-block">
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'rgba(255, 255, 255, 0.8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Spinner animation="border" variant="primary" />
                  </div>
                </div>

                {/* Mobile Spinner */}
                <div className="d-md-none">
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'rgba(255, 255, 255, 0.8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '800px',
                    }}
                  >
                    <Spinner animation="border" variant="primary" />
                  </div>
                </div>
              </>
            )}
          </Col>
        </Row>
      </div>
    </>
  )
}

export default OrderAdd
