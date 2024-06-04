import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Form } from 'react-bootstrap';
import Card from '../../../components/Card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@mui/material/TextField';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import AddIcon from '@mui/icons-material/Add';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import axiosInstance from '../../../js/api';
import Swal from 'sweetalert2';
import CircularProgress from '@mui/material/CircularProgress';


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/get-users-profile');
        setUsers(response.data.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        toast.error('Error fetching admin data');
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when changing the search term
  };

  const filteredUsers = users.filter((admin) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const firstNameIncludes = admin.first_name?.toLowerCase().includes(lowerCaseSearchTerm);
    const lastNameIncludes = admin.last_name?.toLowerCase().includes(lowerCaseSearchTerm);
    const emailIncludes = admin.email?.toLowerCase().includes(lowerCaseSearchTerm);

    return firstNameIncludes || emailIncludes || lastNameIncludes;
  });

  const indexOfLastAdmin = currentPage * itemsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstAdmin, indexOfLastAdmin);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when changing items per page
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleUserRemove = (userId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        removeUser(userId);
      }
    });
  };

  const removeUser = async (userId) => {
    try {
      await axiosInstance.post(`/remove-user?id=${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId)); // Change 'id' to '_id'
      toast.success('User removed successfully');
    } catch (error) {
      console.error('Error removing user:', error);
      toast.error('Error removing user');
    }
  };


  // Display admins
  const displayUsers = currentUsers.map((users, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{users.first_name + ' ' + users.last_name}</td>
      <td>{new Date(users.createdAt).toLocaleDateString()}</td>
      <td>{users.mobile}</td>
      <td>{users.email}</td>
      <td>
        <div className="flex align-items-center list-user-action">
          <Link
            className="btn btn-sm btn-icon btn-success"
            to={`/user/update-user?id=${users._id}`}
          >
            <span className="btn-inner">
              <VisibilityIcon style={{ fontSize: '35px' }} />
            </span>
          </Link>
          <button
            style={{ marginLeft: '10px' }}
            className="btn btn-sm btn-icon btn-danger"
            onClick={() => handleUserRemove(users._id)}
          >
            <span className="btn-inner">
              <DeleteIcon style={{ fontSize: '35px' }} />
            </span>
          </button>
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
                  <h4 className="card-title">User List</h4>
                </div>
                <div className='header-title'>
                  <Link
                    className="btn btn-btn btn-primary px-3 mb-lg-0 mb-2 mr-10 "
                    to="/user/add-user"
                    style={{ fontWeight: '600' }}
                  >
                    <AddIcon /> Add User
                  </Link>
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
                      <Form
                        as="select"
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        style={{ width: '80px', padding: '5px 5px' }}
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        {/* Add more options as needed */}
                      </Form>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <table
                    id="user-list-table"
                    className="table table-striped"
                    role="grid"
                    data-toggle="data-table"
                  >
                    <thead>
                      <tr className="ligth">
                        <th><b>No.</b></th>
                        <th><b>Full Name</b></th>
                        <th><b>Join date</b></th>
                        <th><b>Mobile</b></th>
                        <th><b>Email</b></th>
                        <th><b>Action</b></th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayUsers}
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

export default UserList;
