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
                <p>Home</p>
            </Link>
            {isLoggedIn ? (
                <>
                    <Link to="/add">
                        <p>Add</p>
                    </Link>
                    <Link to="/view">
                        <p>View</p>
                    </Link>
                    <Link to="/" onClick={handleLogout}>
                        <p>Logout</p>
                    </Link>
                </>
            ) : (
                <>
                    <Link to="/login">
                        <p>Log In</p>
                    </Link>
                    <Link to="/signup">
                        <p>Sign Up</p>
                    </Link>
                </>
            )}
            <Link to="/about">
                <p>About</p>
            </Link>
        </nav>
    );
}

export default Navbar;
