// Add.js

import React, { useState } from 'react';
import axios from 'axios';
import H1 from '../components/H1';

function Add() {
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

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/addFurniture',
        formData,
        { withCredentials: true }
      );
      alert(response.data.message);
      setFormData({
        furniture_make: '',
        furniture_model: '',
        furniture_color: '',
        furniture_type: '',
        location: '',
        year: '',
        video_url: '',
        image_url: ''
      });
    } catch (error) {
      console.error('Error adding furniture:', error);
      alert('Failed to add furniture');
    }
  };

  return (
    <div className="container">
      <H1>Add Furniture</H1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="furniture_make"
          placeholder="Furniture Make"
          value={formData.furniture_make}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="furniture_model"
          placeholder="Furniture Model"
          value={formData.furniture_model}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="furniture_color"
          placeholder="Furniture Color"
          value={formData.furniture_color}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="furniture_type"
          placeholder="Furniture Type"
          value={formData.furniture_type}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="video_url"
          placeholder="Video URL"
          value={formData.video_url}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image_url"
          placeholder="Image URL"
          value={formData.image_url}
          onChange={handleChange}
        />
        <button type="submit">Add Furniture</button>
      </form>
    </div>
  );
}

export default Add;
