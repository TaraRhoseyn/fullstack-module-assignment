import React, { useEffect, useState } from 'react';
import axios from 'axios';
import H1 from '../components/H1';
import { useNavigate } from 'react-router-dom';

function View() {
    const [furnitureList, setFurnitureList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFurniture = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/userFurniture', { withCredentials: true });
                setFurnitureList(response.data);
            } catch (error) {
                console.error('Error fetching furniture:', error);
                alert('Failed to fetch furniture');
            } finally {
                setLoading(false);
            }
        };

        fetchFurniture();
    }, []);

    const handleDelete = async (furniture_id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/furniture/${furniture_id}`, { withCredentials: true });
            alert(response.data.message);
            setFurnitureList(furnitureList.filter(item => item.furniture_id !== furniture_id));
        } catch (error) {
            console.error('Error deleting furniture:', error);
            alert(error.response?.data?.error || 'Failed to delete furniture');
        }
    };

    const handleEdit = (furniture_id) => {
        navigate(`/edit/${furniture_id}`);
    };

    return (
        <div className="container">
            <H1>View Furniture</H1>
            {loading ? (
                <p>Loading furniture...</p>
            ) : (
                <div>
                    {furnitureList.length > 0 ? (
                        <div className="row">
                            {furnitureList.map((item) => (
                                <div className="col-md-6 mb-4" key={item.furniture_id}>
                                    <div className="d-flex p-5 pt-0">
                                        {item.image_url && (
                                            <img 
                                                src={item.image_url} 
                                                alt="Furniture" 
                                                className="me-3" 
                                                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                                            />
                                        )}
                                        <div>
                                            <p><strong>Make:</strong> {item.furniture_make}</p>
                                            <p><strong>Model:</strong> {item.furniture_model}</p>
                                            <p><strong>Colour:</strong> {item.furniture_color}</p>
                                            <p><strong>Type:</strong> {item.furniture_type}</p>
                                            <p><strong>Location:</strong> {item.location}</p>
                                            <p><strong>Year:</strong> {item.year}</p>
                                            {item.video_url && (
                                            <a 
                                                href={item.video_url} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="text-primary d-block mt-2"
                                            >
                                                Watch video
                                            </a>
                                        )}
                                            <div className="mt-2">
                                                <button 
                                                    className="bg-transparent btn-sm view-btn border"
                                                    onClick={() => handleEdit(item.furniture_id)}
                                                >
                                                    <i className="bi bi-pencil-square me-2"></i>
                                                    Edit
                                                </button>
                                                <button 
                                                    className="bg-transparent btn-sm view-btn border"
                                                    id="delete-btn"
                                                    onClick={() => handleDelete(item.furniture_id)}
                                                >
                                                    <i className="bi bi-x-square me-2"></i>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No furniture found for this user.</p>
                    )}
                </div>
            )}
        </div>
    );
    
}

export default View;
