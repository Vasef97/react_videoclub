import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { form, input, button } from '../styles/styles';

const AddMovieForm = () => {
    const { videoclubId } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [releasedate, setReleaseDate] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/movie/videoclub/${videoclubId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, genre, releasedate }),
            });
            if (response.ok) {
                navigate(`/movies/${videoclubId}`);
            } else {
                console.error('Failed to add movie');
            }
        } catch (error) {
            console.error('Error adding movie', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={form}>
            <h2>Add Movie</h2>
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={input}
                    required
                />
            </label>
            <label>
                Genre:
                <input
                    type="text"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    style={input}
                    required
                />
            </label>
            <label>
                Release Date:
                <input
                    type="date"
                    value={releasedate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                    style={input}
                    required
                />
            </label>
            <button type="submit" style={button}>Add Movie</button>
        </form>
    );
};

export default AddMovieForm;
