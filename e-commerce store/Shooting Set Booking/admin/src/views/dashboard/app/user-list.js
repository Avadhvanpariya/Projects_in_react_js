import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Card from '../../../components/Card';
import axiosInstance from '../../../js/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const fetchUserList = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get('/get-users-profile', {
        params: {
          startDate: startDate ? startDate.toISOString() : null,
          endDate: endDate ? endDate.toISOString() : null,
        },
      });
      if (response.data.status === 200) {
        setTimeout(() => {
          setUserList(response.data.data);
          setIsLoading(false);
        }, 1000);
      } else {
        console.error('Error fetching user list:', response.data.message);
        toast.error('Error fetching user list: ' + response.data.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching user list:', error);
      toast.error('Error fetching user list: ' + error.message);
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchUserList();
  }, [startDate, endDate]);

  const handleRemoveUser = async (userId) => {
    // Show SweetAlert confirmation
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosInstance.post('/remove-user', { id: userId });

          if (response.data.status === 200) {
            toast.success('User removed successfully');
            // After successful removal, update the user list
            setUserList((prevUserList) =>
              prevUserList.filter((user) => user._id !== userId)
            );
          } else {
            console.error('Error removing user:', response.data.message);
            toast.error('Error removing user: ' + response.data.message);
          }
        } catch (error) {
          console.error('Error removing user:', error);
          toast.error('Error removing user: ' + error.message);
        }
      }
    });
  };

  const filterUserList = (userList) => {
    return userList.filter((user) => {
      const numberMatch = user.mobile.includes(searchTerm);
      const nameMatch = user.full_name.toLowerCase().includes(searchTerm.toLowerCase());
      const dateRangeMatch =
        (!startDate || new Date(user.createdAt) >= startDate) &&
        (!endDate || new Date(user.createdAt) <= endDate);

      return (searchTerm === '' || numberMatch || nameMatch) && dateRangeMatch;
    });
  };


  const handleSearch = () => {
    fetchUserList();
  };

  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">User List</h4>
                </div>
                <div className="header-title">
                  <Link to="/dashboard/user-add" className="btn btn-btn btn-primary">
                    Create User
                  </Link>
                </div>
              </Card.Header>
              <Card.Body className="px-0" style={{ position: 'relative' }}>
                <div className='row' style={{ paddingLeft: '20px' }}>
                  <div className="mb-3 col-md-5">
                    <Form className='d-flex' style={{ alignItems: 'end' }}>
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
                        <Button variant="primary" style={{ marginLeft: '10px', padding: '5px 8px 5px 8px' }} onClick={handleSearch}>
                          <svg fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-32" style={{ marginBottom: '5px' }} width="20" height="20" viewBox="0 0 24 24"><circle cx="11.7669" cy="11.7666" r="8.98856" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle><path d="M18.0186 18.4851L21.5426 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        </Button>
                      </div>
                    </Form>
                  </div>
                  <div className="mb-3 col-md-7 d-none d-md-block">
                    <Form className='d-flex' style={{ alignItems: 'end', justifyContent:'end', marginRight:'21px' }}>
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
                      <div className='d-none d-md-block' style={{ marginLeft: '10px', alignItems: 'end' }}>
                        <Button variant="primary" className="ml-2" onClick={handleSearch}>
                          Apply Filters
                        </Button>
                      </div>
                    </Form>
                    <div className='d-block d-md-none' style={{ marginTop: '10px', alignItems: 'end' }}>
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
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterUserList(userList).map((item, index) => (
                        <tr key={item._id}>
                          <td>{index + 1}</td>
                          <td>{item.full_name}</td>
                          <td>{item.mobile}</td>
                          <td>{item.email}</td>
                          <td>
                            <div className="flex align-items-center list-user-action">
                              <Link
                                className="btn btn-sm btn-icon btn-success"
                                to={`/dashboard/user-update?id=${item._id}`}
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
                                </span>
                              </Link>{' '}
                              <button
                                className="btn btn-sm btn-icon btn-danger"
                                onClick={() => handleRemoveUser(item._id)}
                              >
                                <span className="btn-inner">
                                  <svg
                                    width="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    stroke="currentColor"
                                  >
                                    <path
                                      d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></path>
                                    <path
                                      d="M20.708 6.23975H3.75"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></path>
                                    <path
                                      d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></path>
                                  </svg>
                                </span>
                              </button>{' '}
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
  );
};

export default UserList;
