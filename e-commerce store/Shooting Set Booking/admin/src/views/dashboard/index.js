import React, { useEffect, memo, Fragment, useState } from 'react'
import { Row, Col, Dropdown, Button } from 'react-bootstrap'
import axiosInstance from '../../js/api'
import Circularprogressbar from '../../components/circularprogressbar.js'
import AOS from 'aos'
import '../../../node_modules/aos/dist/aos'
import '../../../node_modules/aos/dist/aos.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'
import 'swiper/swiper-bundle.min.css'
import CountUp from 'react-countup'
import { useSelector } from 'react-redux'
import * as SettingSelector from '../../store/setting/selectors'

// install Swiper modules
SwiperCore.use([Navigation])

const Index = memo((props) => {
  useSelector(SettingSelector.theme_color)

  const getVariableColor = () => {
    let prefix =
      getComputedStyle(document.body).getPropertyValue('--prefix') || 'bs-'
    if (prefix) {
      prefix = prefix.trim()
    }
    const color1 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}primary`,
    )
    const color2 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}info`,
    )
    const color3 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}primary-tint-20`,
    )
    const color4 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}warning`,
    )
    return {
      primary: color1.trim(),
      info: color2.trim(),
      warning: color4.trim(),
      primary_light: color3.trim(),
    }
  }
  const variableColors = getVariableColor()

  const colors = [variableColors.primary, variableColors.info]
  useEffect(() => {
    return () => colors
  })

  useEffect(() => {
    AOS.init({
      startEvent: 'DOMContentLoaded',
      disable: function () {
        var maxWidth = 996
        return window.innerWidth < maxWidth
      },
      throttleDelay: 10,
      once: true,
      duration: 700,
      offset: 10,
    })
  })

  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [todayOrders, setTodayOrders] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total number of orders
        const ordersResponse = await axiosInstance.get('/get-order');
        const data = ordersResponse.data.data
        const totalOrdersCount = ordersResponse.data.data.length;
        setTotalOrders(totalOrdersCount);

        const totalProfitSum = data.reduce((sum, invoice) => sum + parseFloat(invoice.total_amount), 0);
        setTotalProfit(totalProfitSum);

        // Filter today's orders
        const todayDate = new Date().toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        });

        const todayOrdersCount = data.filter(
          (order) => order.bookDate === todayDate
        ).length;

        setTodayOrders(todayOrdersCount);
      } catch (error) {
        console.error('Error fetching order data:', error.message);
      }
    };

    fetchData();
  }, []);


  return (
    <Fragment>
      <Row>
        <Col md="12" lg="12">
          <Row className="row-cols-1">
            <div
              className="overflow-hidden d-slider1 "
              data-aos="fade-up"
              data-aos-delay="800"
            >
              <Swiper
                className="p-0 m-0 mb-2 list-inline "
                slidesPerView={5}
                spaceBetween={32}
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  550: { slidesPerView: 2 },
                  991: { slidesPerView: 3 },
                  1400: { slidesPerView: 3 },
                  1500: { slidesPerView: 4 },
                  1920: { slidesPerView: 4 },
                  2040: { slidesPerView: 7 },
                  2440: { slidesPerView: 8 },
                }}
              >
                <SwiperSlide className="card card-slide">
                  <div className="card-body">
                    <div className="progress-widget">
                      <Circularprogressbar
                        stroke={variableColors.primary}
                        width="60px"
                        height="60px"
                        Linecap="rounded"
                        trailstroke="#ddd"
                        strokewidth="4px"
                        style={{ width: 60, height: 60 }}
                        value={90}
                        id="circle-progress-01"
                      >
                        <svg
                          className=""
                          width="24"
                          height="24px"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z"
                          />
                        </svg>
                      </Circularprogressbar>
                      <div className="progress-detail">
                        <p className="mb-2">Total Order</p>
                        <h4 className="counter">
                          {totalOrders}
                        </h4>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className=" card card-slide">
                  <div className="card-body">
                    <div className="progress-widget">
                      <Circularprogressbar
                        stroke={variableColors.info}
                        width="60px"
                        height="60px"
                        trailstroke="#ddd"
                        strokewidth="4px"
                        Linecap="rounded"
                        style={{ width: 60, height: 60 }}
                        value={60}
                        id="circle-progress-02"
                      >
                        <svg
                          className=""
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M19,6.41L17.59,5L7,15.59V9H5V19H15V17H8.41L19,6.41Z"
                          />
                        </svg>
                      </Circularprogressbar>
                      <div className="progress-detail">
                        <p className="mb-2">Total Profit</p>
                        <h4 className="counter">
                          {totalProfit}
                        </h4>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className=" card card-slide">
                  <div className="card-body">
                    <div className="progress-widget">
                      <Circularprogressbar
                        stroke={variableColors.info}
                        width="60px"
                        height="60px"
                        trailstroke="#ddd"
                        Linecap="rounded"
                        strokewidth="4px"
                        value={40}
                        style={{ width: 60, height: 60 }}
                        id="circle-progress-06"
                      >
                        <svg
                          className=""
                          width="24px"
                          height="24px"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z"
                          />
                        </svg>
                      </Circularprogressbar>
                      <div className="progress-detail">
                        <p className="mb-2">Today's Order</p>
                        <h4 className="counter">
                          {todayOrders}
                        </h4>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <div className="swiper-button swiper-button-next"></div>
                <div className="swiper-button swiper-button-prev"></div>
              </Swiper>
            </div>
          </Row>
        </Col>
      </Row>
    </Fragment>
  )
})

export default Index
