import React from 'react'
import H1 from '../components/H1'
import { Link, useNavigate } from 'react-router-dom';

function Home() {
	return (
		<div className="container">
			<H1>Welcome</H1>
			<div className="p-5">
				<p>
					Welcome to Furniturezz! We're a a platform to advertise extra household furniture for sale.
				</p>
				<p>
					Begin by adding your own furniture:
				</p>
				<Link to="/add">
					<button className="row">Add Furniture</button>
				</Link>
			</div>
		</div>
	)
}

export default Home;