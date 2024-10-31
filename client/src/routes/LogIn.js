import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import H1 from '../components/H1';

function LogIn() {
	const [formData, setFormData] = useState({
		username: '',
		password: ''
	});
	const navigate = useNavigate();

	const handleChange = e => {
		const { name, value } = e.target;
		setFormData(prevState => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const response = await axios.post('http://localhost:5000/api/login', formData, { withCredentials: true });
			alert(response.data.message);
			if (response.data.user_id) {
				localStorage.setItem('user_id', response.data.user_id); 
			}
			navigate('/');
			window.location.reload();
		} catch (error) {
			console.error('Login error:', error);
			alert(error.response?.data?.error || 'Failed to log in');
		}
	};

	return (
		<div className="container">
			<H1>Log in</H1>
			<form onSubmit={handleSubmit} className="p-5 pt-0">
				<label for="username" className="form-label col-12">Username</label>
				<input
					type="text"
					name="username"
					className="col-6 mb-2"
					value={formData.username}
					onChange={handleChange}
					required
				/>
				<label for="password" className="form-label col-12">Password</label>
				<input
					type="password"
					name="password"
					className="col-6 mb-4"
					value={formData.password}
					onChange={handleChange}
					required
				/>
				<button type="submit" className="row">Log In</button>
			</form>
		</div>
	);
}

export default LogIn;
