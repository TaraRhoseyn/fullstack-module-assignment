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
      <form onSubmit={handleSubmit} className="p-5 pt-0">
        <label for="furniture_make" className="form-label col-12">Make</label>
        <input
          type="text"
          name="furniture_make"
          className="col-6 mb-4"
          value={formData.furniture_make}
          onChange={handleChange}
          required
        />
        <label for="furniture_model" className="form-label col-12">Model</label>
        <input
          type="text"
          name="furniture_model"
          className="col-6 mb-4"
          value={formData.furniture_model}
          onChange={handleChange}
          required
        />
        <label for="furniture_color" className="form-label col-12">Colour</label>
        <input
          type="text"
          name="furniture_color"
          className="col-6 mb-4"
          value={formData.furniture_color}
          onChange={handleChange}
          required
        />
        <label for="furniture_type" className="form-label col-12">Type</label>
        <input
          type="text"
          name="furniture_type"
          className="col-6 mb-4"
          value={formData.furniture_type}
          onChange={handleChange}
          required
        />
        <label for="location" className="form-label col-12">Location</label>
        <input
          type="text"
          name="location"
          className="col-6 mb-4"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <label for="year" className="form-label col-12">Year</label>
        <input
          type="text"
          name="year"
          className="col-6 mb-4"
          value={formData.year}
          onChange={handleChange}
          required
        />
        <label for="video_url" className="form-label col-12">Video URL</label>
        <input
          type="text"
          name="video_url"
          className="col-6 mb-4"
          value={formData.video_url}
          onChange={handleChange}
          required
        />
        <label for="image_url" className="form-label col-12">Image URL</label>
        <input
          type="text"
          name="image_url"
          className="col-6 mb-4"
          value={formData.image_url}
          onChange={handleChange}
          required
        />
        <button type="submit" className="row">Add Furniture</button>
      </form>
    </div>
  );
}

export default Add;
