import React, { memo, Fragment, useState, useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import axiosInstance from '../../../../js/api'

import topHeader from '../../../../assets/images/dashboard/top-header.png'
import topHeader1 from '../../../../assets/images/dashboard/top-header1.png'
import topHeader2 from '../../../../assets/images/dashboard/top-header2.png'
import topHeader3 from '../../../../assets/images/dashboard/top-header3.png'
import topHeader4 from '../../../../assets/images/dashboard/top-header4.png'
import topHeader5 from '../../../../assets/images/dashboard/top-header5.png'

const SubHeader = memo((props) => {
  const [userData, setUserData] = useState({
    full_name: '',
    type: '',
  })

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get('/get-profile')
        if (response.data.status === 200) {
          const { full_name, type } = response.data.data;

          // Save the admin type in local storage
          localStorage.setItem('adminType', type);

          setUserData({ full_name, type });
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()
  }, [])

  return (
    <Fragment>
      <div className="iq-navbar-header" style={{ height: '215px' }}>
        <Container fluid className=" iq-container">
          <Row>
            <Col md="12">
              <div className="d-flex justify-content-between flex-wrap">
                <div>
                  <h1>Hello {userData.full_name}!</h1>
                  <p>Welcome Back! {userData.type}</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        {/* {{!-- rounded-bottom if not using animation --}} */}
        <div className="iq-header-img">
          <img
            src={topHeader}
            alt="header"
            className="theme-color-default-img img-fluid w-100 h-100 animated-scaleX"
          />
          <img
            src={topHeader1}
            alt="header"
            className=" theme-color-purple-img img-fluid w-100 h-100 animated-scaleX"
          />
          <img
            src={topHeader2}
            alt="header"
            className="theme-color-blue-img img-fluid w-100 h-100 animated-scaleX"
          />
          <img
            src={topHeader3}
            alt="header"
            className="theme-color-green-img img-fluid w-100 h-100 animated-scaleX"
          />
          <img
            src={topHeader4}
            alt="header"
            className="theme-color-yellow-img img-fluid w-100 h-100 animated-scaleX"
          />
          <img
            src={topHeader5}
            alt="header"
            className="theme-color-pink-img img-fluid w-100 h-100 animated-scaleX"
          />
        </div>
      </div>
    </Fragment>
  )
})

export default SubHeader