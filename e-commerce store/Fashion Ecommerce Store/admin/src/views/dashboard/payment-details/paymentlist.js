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
import axiosInstance from '../../../js/api';

const Paymentlist = () => {
    const [payments, setPayment] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPayment, setFilteredPayment] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/get-order');
                setPayment(response.data.data);
                applyFilters();
            } catch (error) {
                console.error('Error fetching admin data:', error);
                toast.error('Error fetching admin data');
            }
        };

        fetchData();
    }, []); // Removed [searchTerm] from the dependency array

    const applyFilters = () => {
        const filteredPayment = payments.filter((order) =>
            order.user.name.toLowerCase().includes(searchTerm) ||
            order.transaction_id.toLowerCase().includes(searchTerm)
        );

        setFilteredPayment(filteredPayment);
    };

    useEffect(() => {
        applyFilters();
    }, [searchTerm, payments]); // Added [payments] to the dependency array

    const handleSearchChange = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchTerm(searchValue);
        setCurrentPage(1);
    };

    const indexOfLastOrder = currentPage * itemsPerPage;
    const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
    const currentPayment = filteredPayment.slice(indexOfFirstOrder, indexOfLastOrder);

    const totalPages = Math.ceil(filteredPayment.length / itemsPerPage);

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // Display Payment
    const displayPayment = currentPayment.map((payments, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{payments.transaction_id}</td>
            <td>{payments.user.name}</td>
            <td>{new Date(payments.createdAt).toLocaleDateString()}</td>
            <td>{payments.amount}</td>
            <td>{payments.amount}</td>
            <td>{payments.status}</td>
            <td>{payments.delivery_status}</td>
            <td>
                <div className="flex align-items-center list-user-action">
                    <Link
                        className="btn btn-sm btn-icon btn-success"
                        to={`/payment/payment-view?id=${payments._id}`}
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
                                                <th><b>Recipt ID</b></th>
                                                <th><b>User ID</b></th>
                                                <th><b>User Name</b></th>
                                                <th><b>Mobile</b></th>
                                                <th><b>Item Name</b></th>
                                                <th><b>Amount</b></th>
                                                <th><b>Purchase Date</b></th>
                                                <th><b>Action</b></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {displayPayment}
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
                </Row>
            </div >
            <ToastContainer />
        </>
    );
};

export default Paymentlist;
