import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import Card from '../../../components/Card'
import axiosInstance from '../../../js/api'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const UserAdd = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    mobile: '',
    email: '',
  })

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const response = await axiosInstance.get('/get-profile')

        if (response.data.status === 200) {
          const adminDetails = response.data.data
          setFormData({
            full_name: adminDetails.full_name,
            mobile: adminDetails.mobile,
            email: adminDetails.email,
          })
        } else {
          toast.error(`Failed to fetch admin details: ${response.data.message}`)
        }
      } catch (error) {
        toast.error('Error fetching admin details. Please try again later.')
        console.error('Error fetching admin details:', error)
      }
    }

    fetchAdminDetails()
  }, [])

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const handleUpdate = async () => {
    try {
      const response = await axiosInstance.post('/update-profile', formData)

      if (response.data.status === 200) {
        toast.success('Admin details updated successfully!')
      } else {
        toast.error(`Failed to update admin details: ${response.data.message}`)
      }
    } catch (error) {
      toast.error('Error updating admin details. Please try again later.')
      console.error('Error updating admin details:', error)
    }
  }

  return (
    <div>
      <Row>
        <Col xl="12" lg="12">
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <div className="header-title">
                <h4 className="card-title">Admin Details</h4>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="new-user-info">
                <form>
                  <div className="row">
                    <div className="col-10">
                      <div className="row">
                        <Form.Group className="col-md-6 form-group">
                          <Form.Label htmlFor="fname">Full Name:</Form.Label>
                          <Form.Control
                            type="text"
                            id="full_name"
                            placeholder="Enter Name"
                            value={formData.full_name}
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Form.Group className="col-md-6 form-group">
                          <Form.Label htmlFor="mobno">
                            Mobile Number:
                          </Form.Label>
                          <Form.Control
                            type="text"
                            id="mobile"
                            placeholder="enter your mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Form.Group className="col-md-6 form-group">
                          <Form.Label htmlFor="email">Email:</Form.Label>
                          <Form.Control
                            type="email"
                            id="email"
                            placeholder="Enter Your Email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </div>
                      <Button
                        type="button"
                        variant="btn btn-primary"
                        className="mt-2"
                        onClick={handleUpdate}
                      >
                        Update Admin Details
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  )
}

export default UserAdd
