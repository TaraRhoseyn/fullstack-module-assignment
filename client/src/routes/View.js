// View.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import H1 from '../components/H1';

function View() {
    const [furnitureList, setFurnitureList] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <div className="container">
            <H1>View Furniture</H1>
            {loading ? (
                <p>Loading furniture...</p>
            ) : (
                <div>
                    {furnitureList.length > 0 ? (
                        <ul>
                            {furnitureList.map((item) => (
                                <li key={item.furniture_id}>
                                    <p><strong>Make:</strong> {item.furniture_make}</p>
                                    <p><strong>Model:</strong> {item.furniture_model}</p>
                                    <p><strong>Color:</strong> {item.furniture_color}</p>
                                    <p><strong>Type:</strong> {item.furniture_type}</p>
                                    <p><strong>Location:</strong> {item.location}</p>
                                    <p><strong>Year:</strong> {item.year}</p>
                                    {item.image_url && <img src={item.image_url} alt="Furniture" width="200" />}
                                    <button onClick={() => handleDelete(item.furniture_id)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>You haven't added any furniture yet...</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default View;
