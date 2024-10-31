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
            <form onSubmit={handleSubmit} className="p-5 pt-0">
                <label for="furniture_make" className="form-label col-12">Make</label>
                <input type="text" name="furniture_make" className="col-6 mb-4" value={formData.furniture_make} onChange={handleChange} required />
                <label for="furniture_model" className="form-label col-12">Model</label>
                <input type="text" name="furniture_model" className="col-6 mb-4" value={formData.furniture_model} onChange={handleChange} required />
                <label for="furniture_color" className="form-label col-12">Colour</label>
                <input type="text" name="furniture_color" className="col-6 mb-4" value={formData.furniture_color} onChange={handleChange} required />
                <label for="furniture_type" className="form-label col-12">Type</label>
                <input type="text" name="furniture_type" className="col-6 mb-4" value={formData.furniture_type} onChange={handleChange} required />
                <label for="location" className="form-label col-12">Location</label>
                <input type="text" name="location" className="col-6 mb-4" value={formData.location} onChange={handleChange} required />
                <label for="year" className="form-label col-12">Year</label>
                <input type="text" name="year" className="col-6 mb-4" value={formData.year} onChange={handleChange} required />
                <label for="video_url" className="form-label col-12">Video URL</label>
                <input type="text" name="video_url" className="col-6 mb-4" value={formData.video_url} onChange={handleChange} />
                <label for="image_url" className="form-label col-12">Image URL</label>
                <input type="text" name="image_url" className="col-6 mb-4" value={formData.image_url} onChange={handleChange} />
                <button type="submit" className="row">Update</button>
            </form>
        </div>
    );
}

export default Edit;
