// LogIn.js

import React, { useState } from 'react';
import axios from 'axios';
import H1 from '../components/H1';

function LogIn() {
	const [formData, setFormData] = useState({
		username: '',
		password: ''
	});

	const handleChange = e => {
		const { name, value } = e.target;
		setFormData(prevState => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = async e => {
		e.preventDefault();
		try {
		  const response = await axios.post(
			'http://localhost:5000/api/login', 
			formData, 
			{ withCredentials: true }
		  );
		  alert(response.data.message);
		} catch (error) {
		  console.error('Login error details:', error.response || error);
		  alert(error.response?.data?.error || 'Failed to log in');
		}
	  };

	return (
		<div className="container">
			<H1>Log in</H1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="username"
					placeholder="Username"
					value={formData.username}
					onChange={handleChange}
					required
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					value={formData.password}
					onChange={handleChange}
					required
				/>
				<button type="submit">Log In</button>
			</form>
		</div>
	);
}

export default LogIn;
