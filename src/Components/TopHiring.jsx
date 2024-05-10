import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';
import { Button, Modal } from 'react-bootstrap';

const TopHiring = () => {
  const [addeddata, setAddeddata] = useState([]);
  const [data, setData] = useState({
    name: '',
    email: '',
    mobileno: '',
    role: '',
    gender: '',
    course: '',
  });
  const [show, setShow] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5009/file/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAddeddata(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const [errors, setErrors]=useState({
    mobileno:'',
    email:'',
    server:'',
  });
  const validEmails = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  const validMobileno = (mobileno) => {
    const mobilenoPattern = /^\d{10}$/;
    return mobilenoPattern.test(mobileno);
  }
  const updateTask = async (id) => {
    console.log("update Task");
    setShow(true);
    setSelectedItemId(id);
    try {
      const response = await axios.get(`http://localhost:5009/file/create/${id}`);
      const updatedata = response.data;
      setData(updatedata);
      console.log("res :", response.data);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:5009/file/create', data);
    console.log("Response data", response.data);

    setShow(false); // Hide the modal after form submission
    const emailIdvalid = validEmails(data.email);
    const mobilelenovalid = validMobileno(data.mobileno);
    console.log('number :',data.mobileno)

    setErrors({
      email: emailIdvalid ? '' : 'Please enter a valid email',
      mobileno: mobilelenovalid ? '' : 'Mobileno must be at least 10 numbers',
      server: '',
    });
    if (emailIdvalid && mobilelenovalid){
    setData({
      name: '',
      email: '',
      mobileno: '',
      role: '',
      gender: '',
      course: '',
    });
  }};

  const handleEdit = async () => {
    console.log("Edit value:", selectedItemId);
    try {
      const response = await axios.put(`http://localhost:5009/file/create/${selectedItemId}`, data);
      const editData = response.data;
      setShow(false);
      console.log("editdata", response);
    } catch (error) {
      console.error('Error editing item:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5009/file/create/${id}`);
      console.log('Item deleted successfully:', response.data);
      // Remove the deleted item from the state
      setAddeddata(prevData => prevData.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
      // Handle error display or recovery here
    }
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const deleteTask = (id) => {
    // Implement delete task functionality
  };

  return (
    <div className='container mt-3'>
      <h1 className='text-center'>Create Employee</h1>
      <div className="row">
        <div className="col-9 container">
          <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Enter Name' className='form-control' name='name'
              onChange={handleOnChange} value={data.name} />
            <br />
            <input type='text' placeholder='Enter Email' className='form-control' name='email' required
              onChange={handleOnChange} value={data.email} />
                {errors.email && <p className="error text-danger">{errors.email}</p>}
            <br />
            <input type='text' placeholder='Enter MobileNo' className='form-control' name='mobileno' required
              onChange={handleOnChange} value={data.mobileno} />
              {errors.mobileno && <p className="error text-danger ">{errors.mobileno}</p>}
            <br />
            <input type='text' placeholder='Enter Designation' className='form-control' name='role' required
              onChange={handleOnChange} value={data.role} />
            <br />
            <input type='text' placeholder='Enter Gender' className='form-control' required
              name='gender' onChange={handleOnChange} value={data.gender} />
            <br />
            <input type='text' placeholder='Enter Course' className='form-control' name='course' required
              onChange={handleOnChange} value={data.course} />
            <br />
            <Button className='btn btn-primary mb-3' type="submit">Submit</Button>
          </form>
        </div>
      </div>
      <p>Total Count:4</p>
<input type='search' placeholder='search something' className='form-control mt-2 mb-2 container' style={{width:"200px"}}/>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobileno</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {addeddata.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.mobileno}</td>
              <td>{user.role}</td>
              <td>{user.gender}</td>
              <td>{user.course}</td>
              <td>
              <FontAwesomeIcon icon={faPenToSquare} className='btn btn-primary me-2'
                  onClick={() => updateTask(user._id)} />
                <FontAwesomeIcon icon={faTrash}
                  className='btn btn-primary'
                  onClick={() => handleDelete(user._id)} />
                
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Top Hiring Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleEdit}>
          <input type='text' placeholder='Enter Name' className='form-control' name='name'
              onChange={handleOnChange} value={data.name} />
            <br />
            <input type='text' placeholder='Enter Email' className='form-control' name='email' required
              onChange={handleOnChange} value={data.email} />
            <br />
            <input type='text' placeholder='Enter MobileNo' className='form-control' name='mobileno' required
              onChange={handleOnChange} value={data.mobileno} />
            <br />
            <input type='text' placeholder='Enter Designation' className='form-control' name='role' required
              onChange={handleOnChange} value={data.role} />
            <br />
            <input type='text' placeholder='Enter Gender' className='form-control' required
              name='gender' onChange={handleOnChange} value={data.gender} />
            <br />
            <input type='text' placeholder='Enter Course' className='form-control' name='course' required
              onChange={handleOnChange} value={data.course} />
            <br />
            <Button className='btn btn-primary mb-3' type="submit">Apply Changes</Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={() => setShow(false)}>Close</Button> */}
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default TopHiring;
