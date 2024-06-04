import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Card from '../../../components/Card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@mui/material/TextField';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Pagination from '@mui/material/Pagination';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import axiosInstance from '../../../js/api';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axiosInstance.get('/get-order');
                setOrders(response.data.data);
                applyFilters();
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.error('Error fetching admin data:', error);
                toast.error('Error fetching admin data');
            }
        };

        fetchData();
    }, []);

    const applyFilters = () => {
        const filteredOrders = orders.filter((order) =>
            order.user.name.toLowerCase().includes(searchTerm) ||
            order.transaction_id.toLowerCase().includes(searchTerm)
        );

        setFilteredOrders(filteredOrders);
    };

    useEffect(() => {
        applyFilters();
    }, [searchTerm, orders]);

    const handleSearchChange = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchTerm(searchValue);
        setCurrentPage(1);
    };

    const indexOfLastOrder = currentPage * itemsPerPage;
    const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // Display orders
    const displayOrder = currentOrders.map((order, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{order.transaction_id}</td>
            <td>{order.user.name}</td>
            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
            <td>{order.amount}</td>
            <td>{order.method || 'N/A'}</td>
            <td>{order.status}</td>
            <td>{order.delivery_status.length > 0 ? order.delivery_status[order.delivery_status.length - 1].shipment_status : 'N/A'}</td>
            <td>
                <div className="flex align-items-center list-user-action">
                    <Link
                        className="btn btn-sm btn-icon btn-success"
                        to={`/order/orderView?id=${order._id}`}
                    >
                        <span className="btn-inner">
                            <VisibilityIcon style={{ fontSize: '35px' }} />
                        </span>
                    </Link>
                </div>
            </td>
        </tr>
    ));

    return (
        <>
            <div className='margintop'>
                <Row>
                    <Col sm="12">
                        <Card>
                            <Card.Header>
                                <div className="header-title d-none d-md-block">
                                    <h4 className="card-title">Order List</h4>
                                </div>
                            </Card.Header>
                            <Card.Body className="px-0" style={{ position: 'relative' }}>
                                <div className='card-body pt-0'>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="header-title">
                                            <TextField
                                                placeholder="Search"
                                                id="outlined-size-small"
                                                size="small"
                                                className='search-filed'
                                                style={{ marginRight: '10px', width: '300px' }}
                                                value={searchTerm}
                                                onChange={handleSearchChange}
                                            />
                                        </div>
                                        <div className="header-title">
                                            <div className="d-flex justify-content-between align-items-center mt-3">
                                                {/* <Form.Control
                                                    as="select"
                                                    value={filterOptions.paymentStatus}
                                                    onChange={(e) => handleFilterChange('paymentStatus', e.target.value)}
                                                    className='mr-20'
                                                >
                                                    <option value="">Filter</option>
                                                    <option value="Paid">Paid</option>
                                                    <option value="Unpaid">Unpaid</option>
                                                    <option value="Fulfilled">Fulfilled</option>
                                                    <option value="Done">Delivery Done</option>
                                                </Form.Control> */}
                                                <Form
                                                    as="select"
                                                    value={itemsPerPage}
                                                    onChange={handleItemsPerPageChange}
                                                    style={{ width: '80px', padding: '5px 5px' }}
                                                >
                                                    <option value={5}>5</option>
                                                    <option value={10}>10</option>
                                                    <option value={25}>25</option>
                                                    <option value={50}>50</option>
                                                    <option value={100}>100</option>
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table
                                        id="order-list-table"
                                        className="table table-striped"
                                        role="grid"
                                        data-toggle="data-table"
                                    >
                                        <thead>
                                            <tr className="ligth">
                                                <th><b>No.</b></th>
                                                <th><b>Order ID</b></th>
                                                <th><b>Customer Name</b></th>
                                                <th><b>Date</b></th>
                                                <th><b>Total Amount</b></th>
                                                <th><b>Method</b></th>
                                                <th><b>Order Status</b></th>
                                                <th><b>Fulfillment Status</b></th>
                                                <th><b>Action</b></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {displayOrder}
                                        </tbody>
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
                    {isLoading && <div style={{ position: 'fixed', top: '0%', left: '0%', background: '#00000094', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '999' }}>
                        <CircularProgress sx={{ color: '#59acff', width: '60px!important', height: '60px!important' }} />
                    </div>}
                </Row>
            </div>
            <ToastContainer />
        </>
    );
};

export default OrderList;
