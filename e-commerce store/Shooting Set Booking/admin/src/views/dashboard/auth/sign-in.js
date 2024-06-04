import React, { useState } from 'react'
import { Row, Col, Image, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Card from '../../../components/Card'
import Logo from '../../../assets/images/vartika.png'
import LoginImg from '../../../assets/images/login-img.png'

const SignIn = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleLogin = async () => {
    // Simple form validation
    if (!formData.email.trim() || !formData.password.trim()) {
      toast.error('Please enter both email and password.')
      return
    }

    try {
      // Make an API request to your backend for authentication
      const response = await fetch(
        'https://vartika-server-side.onrender.com/admin/v1/login',
        {
          // const response = await fetch('http://localhost/admin/v1/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData), // Send form data directly
        },
      )

      if (response.ok) {
        const data = await response.json()
        var result = data.data
        localStorage.setItem('authorization', result.authorization)

        toast.success('Login successful!', {
          onClose: () => {
            navigate('/dashboard')
          },
        })
      } else {
        toast.error('Invalid email or password. Please try again.')
      }
    } catch (error) {
      console.error('Login failed', error)
      toast.error(
        'An error occurred while trying to log in. Please try again later.',
      )
    }
  }

  return (
    <>
      <section className="login-content">
        <Row className="m-0 align-items-center bg-white vh-100">
          <Col md="6">
            <Row className="justify-content-center">
              <Col md="10">
                <Card className="card-transparent shadow-none d-flex justify-content-center mb-0 auth-card">
                  <Card.Body>
                    <div className="text-center mb-4">
                      <img src={Logo} alt="" />
                    </div>
                    <h4 className="mb-2 text-center text-dark">Sign In</h4>
                    <Form>
                      <Row className="justify-content-center">
                        <Col lg="8">
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="email" className="">
                              Email
                            </Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              id="email"
                              aria-describedby="email"
                              placeholder=" "
                            />
                          </Form.Group>
                        </Col>
                        <Col lg="8" className="">
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="password" className="">
                              Password
                            </Form.Label>
                            <Form.Control
                              type={showPassword ? 'text' : 'password'}
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                              className=""
                              id="password"
                              aria-describedby="password"
                              placeholder=" "
                            />
                          </Form.Group>
                        </Col>
                        <Col lg="8" className="d-flex justify-content-between">
                          <Form.Check className="form-check mb-3">
                            <Form.Check.Input
                              type="checkbox"
                              id="customCheck1"
                              onChange={() => setShowPassword(!showPassword)}
                            />
                            <Form.Check.Label htmlFor="customCheck1">
                              Show Password
                            </Form.Check.Label>
                          </Form.Check>
                        </Col>
                      </Row>
                      <div className="d-flex justify-content-center mt-3">
                        <Button
                          onClick={handleLogin}
                          type="button"
                          variant="btn btn-primary"
                        >
                          Sign In
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col
            md="6"
            className="d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden"
          >
            <Image
              src={LoginImg}
              className="Image-fluid gradient-main animated-scaleX"
              alt="images"
            />
          </Col>
        </Row>
      </section>
      <ToastContainer />
    </>
  )
}

export default SignIn
