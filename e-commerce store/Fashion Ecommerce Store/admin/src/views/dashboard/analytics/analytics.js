import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, Form, Button, Dropdown } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Chart from "react-apexcharts";
import AOS from "aos";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../../js/api';
import MarkersMap from './map';
import '@fortawesome/fontawesome-free/css/all.min.css';
import men from '../../../assets/images/man-user.png';
import women from '../../../assets/images/woman-avatar.png';
import {
    isSameDay,
    getPastDays,
    getStartOfMonth,
    getStartOfLastMonth,
    getStartOfLast3Months,
    getStartOfLastYear,
} from './data';

const Analytics = () => {
    const [productCount, setProductCount] = useState("");
    const [orderCount, setOrderCount] = useState("");
    const [analyticsData, setAnalyticsData] = useState([]);
    const [abandonedCheckoutCount, setAbandonedCheckoutCount] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);
    const [selectedTimeFrame, setSelectedTimeFrame] = useState('This Week');
    const [chartData, setChartData] = useState({
        options: {},
        series: [],
    });

    const filterOrdersByTimeFrame = (orders) => {
        const today = new Date();
        switch (selectedTimeFrame) {
            case 'Today':
                return orders.filter(order => isSameDay(new Date(order.createdAt), today));
            case 'Last 7 days':
                const last7Days = getPastDays(today, 7);
                return orders.filter(order => new Date(order.createdAt) >= last7Days && new Date(order.createdAt) <= today);
            case 'Last Month':
                const startOfMonth = getStartOfLastMonth(today);
                return orders.filter(order => new Date(order.createdAt) >= startOfMonth && new Date(order.createdAt) <= today);
            case 'Last 3 Months':
                const startOfLast3Months = getStartOfLast3Months(today);
                return orders.filter(order => new Date(order.createdAt) >= startOfLast3Months && new Date(order.createdAt) <= today);
            case '365 days':
                const last365Days = getPastDays(today, 365);
                return orders.filter(order => new Date(order.createdAt) >= last365Days && new Date(order.createdAt) <= today);
            case 'Life Time':
                return orders;
            default:
                return orders;
        }
    };

    useEffect(() => {
        const fetchDataProduct = async () => {
            try {
                const response = await axiosInstance.get(`/get-product`);
                setProductCount(response.data.data.length);
            } catch (error) {
                console.error('Error fetching product data:', error);
                toast.error('Error fetching product data');
            }
        };

        const fetchDataAnalytics = async () => {
            try {
                const response = await axiosInstance.get(`/get-analytics`);
                setAnalyticsData(response.data.data)
            } catch (error) {
                console.error('Error fetching product data:', error);
                toast.error('Error fetching product data');
            }
        };

        const fetchDataOrder = async () => {
            try {
                const response = await axiosInstance.get(`/get-order`);
                const filteredOrders = filterOrdersByTimeFrame(response.data.data);
                setOrderCount(filteredOrders.length);

                // Calculate total amount using filteredOrders
                const total = filteredOrders.reduce((acc, order) => acc + order.amount, 0);
                setTotalAmount(total);

                const pipelineAmount = filteredOrders
                    .filter(order => order.delivery_status !== 'DELIVERED')
                    .reduce((acc, order) => acc + order.amount, 0);

                // Update chart data
                const chartOptions = {
                    options: {
                        chart: {
                            fontFamily:
                                '"Inter", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                            toolbar: {
                                show: false,
                            },
                            sparkline: {
                                enabled: false,
                            },
                        },
                        colors: colors,
                        dataLabels: {
                            enabled: false,
                        },
                        stroke: {
                            curve: "smooth",
                            width: 3,
                        },
                        yaxis: {
                            show: true,
                            labels: {
                                show: true,
                                minWidth: 19,
                                maxWidth: 19,
                                style: {
                                    colors: "#8A92A6",
                                },
                                offsetX: -5,
                            },
                        },
                        legend: {
                            show: false,
                        },
                        xaxis: {
                            categories: filteredOrders.map(order => order.createdAt),
                        },
                        grid: {
                            show: false,
                        },
                        fill: {
                            type: "gradient",
                            gradient: {
                                shade: "dark",
                                type: "vertical",
                                shadeIntensity: 0,
                                gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
                                inverseColors: true,
                                opacityFrom: 0.4,
                                opacityTo: 0.1,
                                stops: [0, 50, 80],
                                colors: colors,
                            },
                        },
                        tooltip: {
                            enabled: true,
                        },
                    },
                    series: [
                        {
                            name: "total",
                            data: [94, 80, 200, 80, 94, 80, 150, 94, 80, 94, 80, 94, 80, 94],
                        },
                        {
                            name: "pipline",
                            data: [0, 30, 20, 45, 30, 55, 40, 60, 50, 55, 45, 20, 5, 50],
                        },
                    ],
                };

                const chartSeries = [
                    {
                        name: 'total',
                        data: filteredOrders.map(order => order.amount),
                    },
                    {
                        name: 'pipeline',
                        data: filteredOrders.map(order => (order.delivery_status !== 'DELIVERED' ? order.amount : 0)),
                    },
                ];

                setChartData({ options: chartOptions, series: chartSeries });
            } catch (error) {
                console.error('Error fetching Order data:', error);
                toast.error('Error fetching Order data');
            }
        };

        const fetchDataAbandoned = async () => {
            try {
                const response = await axiosInstance.get(`/get-abandoned-checkout`);
                setAbandonedCheckoutCount(response.data.data.length);
            } catch (error) {
                console.error('Error fetching Abandoned data:', error);
                toast.error('Error fetching Abandoned data');
            }
        };

        fetchDataAnalytics()
        fetchDataAbandoned()
        fetchDataOrder()
        fetchDataProduct()
    }, [selectedTimeFrame]);

    const getVariableColor = () => {
        let prefix =
            getComputedStyle(document.body).getPropertyValue("--prefix") || "bs-";
        if (prefix) {
            prefix = prefix.trim();
        }
        const color1 = getComputedStyle(document.body).getPropertyValue(
            `--${prefix}primary`
        );
        const color2 = getComputedStyle(document.body).getPropertyValue(
            `--${prefix}info`
        );
        const color3 = getComputedStyle(document.body).getPropertyValue(
            `--${prefix}primary-tint-20`
        );
        const color4 = getComputedStyle(document.body).getPropertyValue(
            `--${prefix}warning`
        );
        return {
            primary: color1.trim(),
            info: color2.trim(),
            warning: color4.trim(),
            primary_light: color3.trim(),
        };
    };
    const variableColors = getVariableColor();

    const colors = [variableColors.primary, variableColors.info];
    useEffect(() => {
        return () => colors;
    });

    useEffect(() => {
        AOS.init({
            startEvent: "DOMContentLoaded",
            disable: function () {
                var maxWidth = 996;
                return window.innerWidth < maxWidth;
            },
            throttleDelay: 10,
            once: true,
            duration: 700,
            offset: 10,
        });
    });

    return (
        <div className='margintop'>
            <Fragment>
                <Row>
                    <Row>
                        <Col md="12" lg="8">
                            <Row>
                                <Col md="12">
                                    <div className="card" data-aos="fade-up" data-aos-delay="800">
                                        <div className="flex-wrap card-header d-flex justify-content-between">
                                            <div className="header-title">
                                                <h4 className="card-title">₹{totalAmount || "0"}</h4>
                                                <p className="mb-0">Sales</p>
                                            </div>
                                            <div className="d-flex align-items-center align-self-center">
                                                <div className="d-flex align-items-center text-primary">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="12"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                    >
                                                        <g>
                                                            <circle
                                                                cx="12"
                                                                cy="12"
                                                                r="8"
                                                                fill="currentColor"
                                                            ></circle>
                                                        </g>
                                                    </svg>
                                                    <div className="ms-2">
                                                        <span className="text-gray">Sales</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Dropdown>
                                                <Dropdown.Toggle as={Button} variant="text-gray" type="button" id="dropdownMenuButtonSM">
                                                    {selectedTimeFrame}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => setSelectedTimeFrame('Today')}>Today</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => setSelectedTimeFrame('Last 7 days')}>Last 7 days</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => setSelectedTimeFrame('Last Month')}>Last Month</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => setSelectedTimeFrame('Last 3 Months')}>Last 3 Months</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => setSelectedTimeFrame('365 days')}>Last 365 Days</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => setSelectedTimeFrame('Life Time')}>Life Time</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                        <div className="card-body">
                                            <Chart options={chartData.options} series={chartData.series} type="area" height="245" />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col md="12" lg="4">
                            <Row>
                                <Col md="12" lg="12">
                                    <div
                                        className="card credit-card-widget"
                                        data-aos="fade-up"
                                        data-aos-delay="700"
                                    >
                                        <div className="card-body">
                                            <div className="flex-wrap mb-4 d-flex align-itmes-center">
                                                <div className="d-flex align-itmes-center mb-2 me-0 me-md-4">
                                                    <div>
                                                        <div className="p-3 mb-2 rounded bg-soft-primary">
                                                            <svg
                                                                width="20"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M16.9303 7C16.9621 6.92913 16.977 6.85189 16.9739 6.77432H17C16.8882 4.10591 14.6849 2 12.0049 2C9.325 2 7.12172 4.10591 7.00989 6.77432C6.9967 6.84898 6.9967 6.92535 7.00989 7H6.93171C5.65022 7 4.28034 7.84597 3.88264 10.1201L3.1049 16.3147C2.46858 20.8629 4.81062 22 7.86853 22H16.1585C19.2075 22 21.4789 20.3535 20.9133 16.3147L20.1444 10.1201C19.676 7.90964 18.3503 7 17.0865 7H16.9303ZM15.4932 7C15.4654 6.92794 15.4506 6.85153 15.4497 6.77432C15.4497 4.85682 13.8899 3.30238 11.9657 3.30238C10.0416 3.30238 8.48184 4.85682 8.48184 6.77432C8.49502 6.84898 8.49502 6.92535 8.48184 7H15.4932ZM9.097 12.1486C8.60889 12.1486 8.21321 11.7413 8.21321 11.2389C8.21321 10.7366 8.60889 10.3293 9.097 10.3293C9.5851 10.3293 9.98079 10.7366 9.98079 11.2389C9.98079 11.7413 9.5851 12.1486 9.097 12.1486ZM14.002 11.2389C14.002 11.7413 14.3977 12.1486 14.8858 12.1486C15.3739 12.1486 15.7696 11.7413 15.7696 11.2389C15.7696 10.7366 15.3739 10.3293 14.8858 10.3293C14.3977 10.3293 14.002 10.7366 14.002 11.2389Z"
                                                                    fill="currentColor"
                                                                ></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div className="ms-3">
                                                        <h5>{productCount || "0"}</h5>
                                                        <small className="mb-0">Total Products</small>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-itmes-center mb-2">
                                                    <div>
                                                        <div className="p-3 mb-2 rounded bg-soft-info">
                                                            <svg
                                                                width="20"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M14.1213 11.2331H16.8891C17.3088 11.2331 17.6386 10.8861 17.6386 10.4677C17.6386 10.0391 17.3088 9.70236 16.8891 9.70236H14.1213C13.7016 9.70236 13.3719 10.0391 13.3719 10.4677C13.3719 10.8861 13.7016 11.2331 14.1213 11.2331ZM20.1766 5.92749C20.7861 5.92749 21.1858 6.1418 21.5855 6.61123C21.9852 7.08067 22.0551 7.7542 21.9652 8.36549L21.0159 15.06C20.8361 16.3469 19.7569 17.2949 18.4879 17.2949H7.58639C6.25742 17.2949 5.15828 16.255 5.04837 14.908L4.12908 3.7834L2.62026 3.51807C2.22057 3.44664 1.94079 3.04864 2.01073 2.64043C2.08068 2.22305 2.47038 1.94649 2.88006 2.00874L5.2632 2.3751C5.60293 2.43735 5.85274 2.72207 5.88272 3.06905L6.07257 5.35499C6.10254 5.68257 6.36234 5.92749 6.68209 5.92749H20.1766ZM7.42631 18.9079C6.58697 18.9079 5.9075 19.6018 5.9075 20.459C5.9075 21.3061 6.58697 22 7.42631 22C8.25567 22 8.93514 21.3061 8.93514 20.459C8.93514 19.6018 8.25567 18.9079 7.42631 18.9079ZM18.6676 18.9079C17.8282 18.9079 17.1487 19.6018 17.1487 20.459C17.1487 21.3061 17.8282 22 18.6676 22C19.4969 22 20.1764 21.3061 20.1764 20.459C20.1764 19.6018 19.4969 18.9079 18.6676 18.9079Z"
                                                                    fill="currentColor"
                                                                ></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div className="ms-3">
                                                        <h5>{orderCount || "0"}</h5>
                                                        <small className="mb-0">Total Order Delivered</small>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-itmes-center">
                                                    <div>
                                                        <div className="p-3 mb-2 rounded bg-soft-info">
                                                            <svg
                                                                width="20"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M14.1213 11.2331H16.8891C17.3088 11.2331 17.6386 10.8861 17.6386 10.4677C17.6386 10.0391 17.3088 9.70236 16.8891 9.70236H14.1213C13.7016 9.70236 13.3719 10.0391 13.3719 10.4677C13.3719 10.8861 13.7016 11.2331 14.1213 11.2331ZM20.1766 5.92749C20.7861 5.92749 21.1858 6.1418 21.5855 6.61123C21.9852 7.08067 22.0551 7.7542 21.9652 8.36549L21.0159 15.06C20.8361 16.3469 19.7569 17.2949 18.4879 17.2949H7.58639C6.25742 17.2949 5.15828 16.255 5.04837 14.908L4.12908 3.7834L2.62026 3.51807C2.22057 3.44664 1.94079 3.04864 2.01073 2.64043C2.08068 2.22305 2.47038 1.94649 2.88006 2.00874L5.2632 2.3751C5.60293 2.43735 5.85274 2.72207 5.88272 3.06905L6.07257 5.35499C6.10254 5.68257 6.36234 5.92749 6.68209 5.92749H20.1766ZM7.42631 18.9079C6.58697 18.9079 5.9075 19.6018 5.9075 20.459C5.9075 21.3061 6.58697 22 7.42631 22C8.25567 22 8.93514 21.3061 8.93514 20.459C8.93514 19.6018 8.25567 18.9079 7.42631 18.9079ZM18.6676 18.9079C17.8282 18.9079 17.1487 19.6018 17.1487 20.459C17.1487 21.3061 17.8282 22 18.6676 22C19.4969 22 20.1764 21.3061 20.1764 20.459C20.1764 19.6018 19.4969 18.9079 18.6676 18.9079Z"
                                                                    fill="currentColor"
                                                                ></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div className="ms-3">
                                                        <h5>{abandonedCheckoutCount || "0"}</h5>
                                                        <small className="mb-0">Abandoned Checkout</small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <div className="flex-wrap d-flex justify-content-between">
                                                    <h2 className="mb-2">₹{totalAmount || "0"}/-</h2>
                                                </div>
                                                <p className="text-info">Life time sales</p>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        {/* <Col md="12" lg="8">
                            <div className="card" data-aos="fade-up" data-aos-delay="800">
                                <div className="card-body">
                                    <MarkersMap />
                                </div>
                            </div>
                        </Col> */}
                        <Col md="12" lg="8">
                            <div
                                className="card credit-card-widget"
                                data-aos="fade-up"
                                data-aos-delay="700"
                            >
                                <div className="card-body ">
                                    <div className="header-title ">
                                        <h4 className="card-title">User Count</h4>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <div className="mt-3">
                                            <span>Male - {analyticsData[1]?.genderAnalytics?.male?.orderCount || 0}</span>
                                            <div className="d-flex">
                                                <div
                                                    className="mt-2"
                                                    style={{
                                                        backgroundColor: '#88a7ff',
                                                        width: `${analyticsData[1]?.genderAnalytics?.male?.percentage || 1}%`,
                                                        height: '30px',
                                                        marginRight: '5px',
                                                        transition: 'width 1s ease-in-out'
                                                    }}
                                                ></div>
                                                <p className="mt-15">
                                                    {analyticsData[1]?.genderAnalytics?.male?.percentage || 0}%
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <span>Female - {analyticsData[1]?.genderAnalytics?.female?.orderCount || 0}</span>
                                            <div className="d-flex">
                                                <div
                                                    className="mt-2"
                                                    style={{
                                                        backgroundColor: '#f5a0ff',
                                                        width: `${analyticsData[1]?.genderAnalytics?.female?.percentage || 1}%`,
                                                        height: '30px',
                                                        marginRight: '5px',
                                                        transition: 'width 1s ease-in-out'
                                                    }}
                                                ></div>
                                                <p className="mt-15">
                                                    {analyticsData[1]?.genderAnalytics?.female?.percentage || 0}%
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <span>Other - {analyticsData[1]?.genderAnalytics?.other?.orderCount || 0}</span>
                                            <div className="d-flex">
                                                <div
                                                    className="mt-2"
                                                    style={{
                                                        backgroundColor: '#ffab55',
                                                        width: `${analyticsData[1]?.genderAnalytics?.other?.percentage || 1}%`,
                                                        height: '30px',
                                                        marginRight: '5px',
                                                        transition: 'width 1s ease-in-out'
                                                    }}
                                                ></div>
                                                <p className="mt-15">
                                                    {analyticsData[1]?.genderAnalytics?.other?.percentage || 0}%
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md="12" lg="4">
                            <div
                                className="card credit-card-widget"
                                data-aos="fade-up"
                                data-aos-delay="700"
                            >
                                <div className="card-body">
                                    <div className="header-title">
                                        <h4 className="card-title">Order Around City</h4>
                                    </div>
                                    <hr />
                                    {analyticsData.map((cityData, index) => (
                                        <div
                                            key={index}
                                            className="d-flex align-items-center mb-2 me-0 me-md-4 justify-content-between"
                                        >
                                            <div className="mb-2 ">
                                                <h5 style={{ textTransform: 'capitalize' }}>{cityData.city}</h5>
                                            </div>
                                            <div className="ms-3">
                                                <h5>{cityData.orderCount}</h5>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Row>
            </Fragment>
        </div>
    );
};

export default Analytics;
