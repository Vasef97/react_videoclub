import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { form, input, button } from '../styles/styles';

const VideoclubForm = () => {
    const [videoclub, setVideoclub] = useState({ name: '', phoneNumber: '', address: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:8080/videoclub/${id}`)
                .then(response => response.json())
                .then(data => setVideoclub(data))
                .catch(error => console.error('Error fetching the videoclub', error));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVideoclub({ ...videoclub, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = id ? 'PUT' : 'POST';
        const endpoint = id ? `http://localhost:8080/videoclub/${id}` : 'http://localhost:8080/videoclub';
        try {
            await fetch(endpoint, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(videoclub),
            });
            navigate('/videoclubs');
        } catch (error) {
            console.error(`Error ${id ? 'updating' : 'creating'} the videoclub`, error);
        }
    };

    return (
        <form style={form} onSubmit={handleSubmit}>
            <h2>{id ? 'Update' : 'Create'} Videoclub</h2>
            <input
                type="text"
                name="name"
                value={videoclub.name}
                onChange={handleChange}
                placeholder="Name"
                style={input}
                required
            />
            <input
                type="text"
                name="phoneNumber"
                value={videoclub.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                style={input}
                required
            />
            <input
                type="text"
                name="address"
                value={videoclub.address}
                onChange={handleChange}
                placeholder="Address"
                style={input}
                required
            />
            <button type="submit" style={button}>
                {id ? 'Update' : 'Create'}
            </button>
        </form>
    );
};

export default VideoclubForm;
