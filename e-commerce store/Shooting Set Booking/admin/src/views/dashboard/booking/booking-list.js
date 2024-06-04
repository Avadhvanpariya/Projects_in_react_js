import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Card from '../../../components/Card';
import axiosInstance from '../../../js/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookinList = () => {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const fetchUserList = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get('/get-order', {
        params: {
          startDate: startDate ? startDate.toISOString() : null,
          endDate: endDate ? endDate.toISOString() : null,
        },
      });

      if (response.data.status === 200) {
        setUserList(response.data.data);
      } else {
        console.error('Error fetching user list:', response.data.message);
        toast.error('Error fetching user list: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error fetching user list:', error);
      toast.error('Error fetching user list: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, [startDate, endDate]);

  const handleSearch = () => {
    fetchUserList();
  };

  const filterUserList = (users) => {
    return users.filter((user) => {
      const nameMatch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
      const dateRangeMatch =
        (!startDate || new Date(user.createdAt) >= startDate) &&
        (!endDate || new Date(user.createdAt) <= endDate);
      return nameMatch && dateRangeMatch;
    });
  };
  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Booking List</h4>
                </div>
                <div className="header-title">
                  <Link
                    to="/dashboard/scan"
                    className="btn btn-btn btn-primary"
                  >
                    Scan QR Code
                  </Link>
                </div>
              </Card.Header>
              <Card.Body className="px-0" style={{ position: 'relative' }}>
                <div className="row" style={{ paddingLeft: '20px' }}>
                  <div className="mb-3 col-md-5">
                    <Form className="d-flex" style={{ alignItems: 'end' }}>
                      <div>
                        <Form.Label className="my-1 mr-2">Search:</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter name"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <div>
                        <Button
                          variant="primary"
                          style={{ marginLeft: '10px', padding: '5px 8px 5px 8px' }}
                          onClick={handleSearch}
                        >
                          <svg
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon-32"
                            style={{ marginBottom: '5px' }}
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                          >
                            <circle cx="11.7669" cy="11.7666" r="8.98856" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle>
                            <path
                              d="M18.0186 18.4851L21.5426 22"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </Button>
                      </div>
                    </Form>
                  </div>
                  <div className="mb-3 col-md-7 d-none d-md-block">
                    <Form
                      className="d-flex"
                      style={{ alignItems: 'end', justifyContent: 'end', marginRight: '21px' }}
                    >
                      <div>
                        <Form.Label className="my-1 mr-2">Start Date:</Form.Label>
                        <Form.Control
                          type="date"
                          value={startDate ? startDate.toISOString().split('T')[0] : ''}
                          onChange={(e) => setStartDate(new Date(e.target.value))}
                        />
                      </div>
                      <div style={{ marginLeft: '10px' }}>
                        <Form.Label className="my-1 mx-2">End Date:</Form.Label>
                        <Form.Control
                          type="date"
                          value={endDate ? endDate.toISOString().split('T')[0] : ''}
                          onChange={(e) => setEndDate(new Date(e.target.value))}
                        />
                      </div>
                      <div className="d-none d-md-block" style={{ marginLeft: '10px', alignItems: 'end' }}>
                        <Button variant="primary" className="ml-2" onClick={handleSearch}>
                          Apply Filters
                        </Button>
                      </div>
                    </Form>
                    <div className="d-block d-md-none" style={{ marginTop: '10px', alignItems: 'end' }}>
                      <Button variant="primary" className="ml-2" onClick={handleSearch}>
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  {isLoading && (
                    <>
                      {/* Desktop Spinner */}
                      <div className="d-none d-md-block">
                        <div
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            background: 'rgba(255, 255, 255, 0.8)',
                            zIndex: 1,
                            marginTop: '70px',
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
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            background: 'rgba(255, 255, 255, 0.8)',
                            zIndex: 1,
                            marginTop: '70px',
                          }}
                        >
                          <Spinner animation="border" variant="primary" />
                        </div>
                      </div>
                    </>
                  )}
                  <table
                    id="user-list-table"
                    className="table table-striped"
                    role="grid"
                    data-toggle="data-table"
                  >
                    <thead>
                      <tr className="ligth">
                        <th>No.</th>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Date</th>
                        <th>Days</th>
                        <th>Persons</th>
                        <th min-width="100px">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterUserList(userList).map((item, index) => (
                        <tr key={item._id}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.mobile}</td>
                          <td>{item.email}</td>
                          <td>{item.days}</td>
                          <td>{item.total_persons}</td>
                          <td>
                            <div className="flex align-items-center list-user-action">
                              <Link
                                className="btn btn-sm btn-icon btn-success"
                                to={`/dashboard/order-update?id=${item._id}`}
                              >
                                <span className="btn-inner">
                                  <svg
                                    width="32"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M15.1614 12.0531C15.1614 13.7991 13.7454 15.2141 11.9994 15.2141C10.2534 15.2141 8.83838 13.7991 8.83838 12.0531C8.83838 10.3061 10.2534 8.89111 11.9994 8.89111C13.7454 8.89111 15.1614 10.3061 15.1614 12.0531Z"
                                      stroke="currentColor"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    ></path>
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M11.998 19.355C15.806 19.355 19.289 16.617 21.25 12.053C19.289 7.48898 15.806 4.75098 11.998 4.75098H12.002C8.194 4.75098 4.711 7.48898 2.75 12.053C4.711 16.617 8.194 19.355 12.002 19.355H11.998Z"
                                      stroke="currentColor"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    ></path>
                                  </svg>
                                </span> View
                              </Link>{' '}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default BookinList
