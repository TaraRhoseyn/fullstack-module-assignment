import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
	return (
		<div>
			<nav>
			<Link to="/edit">
				<p>Edit</p>
			</Link>
			<Link to="/add">
				<p>Add</p>
			</Link>
			<Link to="/view">
				<p>View</p>
			</Link>
			<Link to="/">
				<p>Home</p>
			</Link>
			<Link to="/login">
				<p>LogIn</p>
			</Link>
			<Link to="/signup">
				<p>Sign Up</p>
			</Link>
			<Link to="/about">
				<p>About</p>
			</Link>
			</nav>
		</div>
	);
}

export default Navbar;
