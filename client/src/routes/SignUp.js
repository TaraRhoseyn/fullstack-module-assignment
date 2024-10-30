// SignUp.js

import React, { useState } from 'react';
import axios from 'axios';
import H1 from '../components/H1';

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
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
        <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} />
        <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} />
        <input type="text" name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} />
        <input type="text" name="address1" placeholder="Address 1" value={formData.address1} onChange={handleChange} />
        <input type="text" name="address2" placeholder="Address 2" value={formData.address2} onChange={handleChange} />
        <input type="text" name="address3" placeholder="Address 3" value={formData.address3} onChange={handleChange} />
        <input type="text" name="postcode" placeholder="Postcode" value={formData.postcode} onChange={handleChange} />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="tel" name="telephone" placeholder="Telephone" value={formData.telephone} onChange={handleChange} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
