import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import H1 from '../components/H1';

function Edit() {
    const { id } = useParams();
    const [furnitureDetails, setFurnitureDetails] = useState(null);
    const [formData, setFormData] = useState({
        furniture_make: '',
        furniture_model: '',
        furniture_color: '',
        furniture_type: '',
        location: '',
        year: '',
        video_url: '',
        image_url: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFurnitureDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/furniture/${id}`, { withCredentials: true });
                setFurnitureDetails(response.data);
                setFormData(response.data);
            } catch (error) {
                console.error('Failed to fetch furniture details:', error);
                alert('Failed to fetch furniture details');
            }
        };

        fetchFurnitureDetails();
    }, [id]);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/furniture/${id}`, formData, { withCredentials: true });
            alert('Furniture updated successfully!');
            navigate('/view');
        } catch (error) {
            console.error('Failed to update furniture:', error);
            alert('Failed to update furniture');
        }
    };

    if (!furnitureDetails) return <div>Loading...</div>;

    return (
        <div className="container">
            <H1>Edit Furniture</H1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="furniture_make" value={formData.furniture_make} onChange={handleChange} required />
                <input type="text" name="furniture_model" value={formData.furniture_model} onChange={handleChange} required />
                <input type="text" name="furniture_color" value={formData.furniture_color} onChange={handleChange} required />
                <input type="text" name="furniture_type" value={formData.furniture_type} onChange={handleChange} required />
                <input type="text" name="location" value={formData.location} onChange={handleChange} required />
                <input type="text" name="year" value={formData.year} onChange={handleChange} required />
                <input type="text" name="video_url" value={formData.video_url} onChange={handleChange} />
                <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} />
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default Edit;
