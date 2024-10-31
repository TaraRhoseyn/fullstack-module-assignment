import React, { useState } from 'react';
import axios from 'axios';
import H1 from '../components/H1';
import { Link  } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    title: '',
    first_name: '',
    last_name: '',
    gender: '',
    address1: '',
    address2: '',
    address3: '',
    postcode: '',
    description: '',
    email: '',
    telephone: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/signup', formData);
      alert(response.data.message);
      setFormData({
        username: '',
        password: '',
        title: '',
        first_name: '',
        last_name: '',
        gender: '',
        address1: '',
        address2: '',
        address3: '',
        postcode: '',
        description: '',
        email: '',
        telephone: ''
      });
    } catch (error) {
      console.error('There was an error!', error);
      alert('Failed to create user');
    }
  };

  return (
    <div className="container">
      <H1>Sign up</H1>
      <form onSubmit={handleSubmit} className="p-5 pt-0">
        <label for="username" className="form-label col-12">Username</label>
        <input
          type="text"
          name="username" 
          className="col-6 mb-4"
          value={formData.username} 
          onChange={handleChange} 
          required />
        <label for="password" className="form-label col-12">Password</label>
        <input 
          type="password" 
          name="password" 
          className="col-6 mb-4"
          value={formData.password} 
          onChange={handleChange} 
          required />
        <label for="title" className="form-label col-12">Title</label>
        <input 
          type="text" 
          name="title" 
          className="col-6 mb-4"
          value={formData.title} 
          onChange={handleChange} 
          required />
        <label for="first_name" className="form-label col-12">First name</label>  
        <input 
          type="text" 
          name="first_name" 
          className="col-6 mb-4"
          value={formData.first_name} 
          onChange={handleChange} 
          required />
        <label for="last_name" className="form-label col-12">Last name</label>
        <input 
          type="text" 
          name="last_name" 
          className="col-6 mb-4"
          value={formData.last_name} 
          onChange={handleChange} 
          required />
        <label for="gender" className="form-label col-12">Gender</label>
        <input 
          type="text" 
          name="gender" 
          className="col-6 mb-4"
          value={formData.gender} 
          onChange={handleChange} 
          required />
        <label for="address1" className="form-label col-12">Address line 1</label>
        <input 
          type="text" 
          name="address1" 
          className="col-6 mb-4"
          value={formData.address1} 
          onChange={handleChange} 
          required />
        <label for="address2" className="form-label col-12">Address line 2</label>
        <input 
          type="text" 
          name="address2" 
          className="col-6 mb-4"
          value={formData.address2} 
          onChange={handleChange} 
          required />
        <label for="address3" className="form-label col-12">Address line 3</label>
        <input 
          type="text" 
          name="address3" 
          className="col-6 mb-4"
          value={formData.address3} 
          onChange={handleChange} 
          required />
        <label for="postcode" className="form-label col-12">Postcode</label>
        <input 
          type="text" 
          name="postcode" 
          className="col-6 mb-4"
          value={formData.postcode} 
          onChange={handleChange} 
          required />
        <label for="description" className="form-label col-12">Description</label>
        <input 
          type="text" 
          name="description" 
          className="col-6 mb-4"
          value={formData.description} 
          onChange={handleChange} 
          required />
        <label for="email" className="form-label col-12">Email</label>
        <input 
          type="email" 
          name="email" 
          className="col-6 mb-4"
          value={formData.email} 
          onChange={handleChange} 
          required />
        <label for="telephone" className="form-label col-12">Telephone</label>
        <input 
          type="tel" 
          name="telephone" 
          className="col-6 mb-4"
          value={formData.telephone} 
          onChange={handleChange} 
          required />
        <div className="d-flex flex-row">
					<button type="submit">Sign up</button>
					<Link to="/login">
						<button className="secondary-btn border border-3">Log in</button>
					</Link>
				</div>
      </form>
    </div>
  );
}

export default SignUp;
