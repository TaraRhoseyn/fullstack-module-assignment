import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('user_id'); 
        setIsLoggedIn(!!userId); 
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user_id'); 
        setIsLoggedIn(false); 
        navigate('/'); 
		window.location.reload();
    };

    return (
        <nav className="d-flex flex-column p-5 mr-5">
            <Link to="/">
				<p className="text-white text-hover-primary">
					<i className="bi bi-house-door-fill me-2"></i> Home
				</p>
            </Link>
            {isLoggedIn ? (
                <>
                    <Link to="/add">
						<p className="text-white text-hover-primary">
							<i className="bi bi-plus-lg me-2"></i> Add
						</p>
                    </Link>
                    <Link to="/view">
						<p className="text-white text-hover-primary">
							<i className="bi bi-eye me-2"></i> View
						</p>
                    </Link>
                    <Link to="/" onClick={handleLogout}>
						<p className="text-white text-hover-primary">
							<i className="bi bi-box-arrow-in-left me-2"></i> Log out
						</p>
                    </Link>
                </>
            ) : (
                <>
                    <Link to="/login">
						<p className="text-white text-hover-primary">
							<i className="bi bi-box-arrow-in-right me-2"></i> Log in
						</p>
                    </Link>
                    <Link to="/signup">
						<p className="text-white text-hover-primary">
							<i className="bi bi-pencil-square me-2"></i> Sign up
						</p>
                    </Link>
                </>
            )}
            <Link to="/about">
				<p className="text-white text-hover-primary">
					<i className="bi bi-file-person-fill me-2"></i> About
				</p>
            </Link>
        </nav>
    );
}

export default Navbar;
