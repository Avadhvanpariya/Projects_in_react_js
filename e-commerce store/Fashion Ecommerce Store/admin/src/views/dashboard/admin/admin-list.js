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
import DrawIcon from '@mui/icons-material/Draw';
import axiosInstance from '../../../js/api';


const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [loggedInAdminId, setLoggedInAdminId] = useState('');
  const adminType = localStorage.getItem('adminType');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/get-admins');
        setAdmins(response.data.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        toast.error('Error fetching admin data');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axiosInstance.get('/get-profile');
        const adminData = response.data.data;
        setLoggedInAdminId(adminData._id);
      } catch (error) {
        console.error('Error fetching admin details:', error);
        toast.error('Error fetching admin details');
      }
    };

    fetchProfileData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when changing the search term
  };

  const filteredAdmins = admins.filter((admin) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const fullNameIncludes = admin.full_name?.toLowerCase().includes(lowerCaseSearchTerm);
    const emailIncludes = admin.email?.toLowerCase().includes(lowerCaseSearchTerm);

    return fullNameIncludes || emailIncludes;
  });

  const indexOfLastAdmin = currentPage * itemsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - itemsPerPage;
  const currentAdmins = filteredAdmins.slice(indexOfFirstAdmin, indexOfLastAdmin);

  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when changing items per page
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Fetch admin data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/get-admins');
        setAdmins(response.data.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        toast.error('Error fetching admin data');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axiosInstance.get('/get-profile');
        const adminData = response.data.data;
        setLoggedInAdminId(adminData._id);
      } catch (error) {
        console.error('Error fetching admin details:', error);
        toast.error('Error fetching admin details');
      }
    };

    fetchProfileData();
  }, []);

  // Display admins
  const displayAdmins = currentAdmins.map((admin, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{admin.full_name}</td>
      <td>{admin.type}</td>
      <td>{new Date(admin.createdAt).toLocaleDateString()}</td>
      <td>{admin.mobile}</td>
      <td>{admin.email}</td>
      <td>
        <div className="flex align-items-center list-user-action">
          <Link
            className="btn btn-sm btn-success"
            to={`/admin/update-admin?id=${admin._id}`}
            style={{ padding: '0px 8px' }}
          >
            <span className="btn-inner">
              <DrawIcon style={{ fontSize: '35px' }} /> View Details
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
                  <h4 className="card-title">Admin List</h4>
                </div>
                <div className='header-title'>
                  <Link
                    className="btn btn-btn btn-primary px-3 mb-lg-0 mb-2 mr-10 "
                    to="/admin/add-admin"
                    style={{ fontWeight: '600' }}
                  >
                    <AddIcon /> Add Admin
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
                        <th><b>Type</b></th>
                        <th><b>Date</b></th>
                        <th><b>Mobile</b></th>
                        <th><b>Email</b></th>
                        <th><b>Action</b></th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayAdmins}
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
      </div>
      <ToastContainer />
    </>
  );
};

export default AdminList;
