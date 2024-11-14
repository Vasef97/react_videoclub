import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteButton, container, card, updateButton, viewButton, buttonContainer } from '../styles/styles';

const Videoclubs = () => {
    const [videoclubs, setVideoclubs] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVideoclubs = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:8080/videoclub/all');
                const data = await response.json();
                setVideoclubs(data);
            } catch (error) {
                console.error('Error fetching the videoclubs', error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideoclubs();
    }, []);

    const deleteVideoclub = async (id) => {
        try {
            await fetch(`http://localhost:8080/videoclub/${id}`, {
                method: 'DELETE',
            });
            setVideoclubs(videoclubs.filter(videoclub => videoclub.id !== id));
        } catch (error) {
            console.error('Error deleting the videoclub', error);
        }
    };

    return (
        <div>
            <h2>Videoclubs</h2>
            {loading ? <p>Loading...</p> : (
                <div style={container}>
                    {videoclubs.map(videoclub => (
                        <div key={videoclub.id} style={card}>
                            <h3>{videoclub.name}</h3>
                            <p>Phone: {videoclub.phoneNumber}</p>
                            <p>Address: {videoclub.address}</p>
                            <div style={buttonContainer}>
                                <button style={viewButton} onClick={() => navigate(`/movies/${videoclub.id}`)}>View</button>
                                <button style={updateButton} onClick={() => navigate(`/update/${videoclub.id}`)}>Update</button>
                                <button style={deleteButton} onClick={() => deleteVideoclub(videoclub.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Videoclubs;


