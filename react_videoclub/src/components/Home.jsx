import React from 'react';
import { homeImage, homeContainer } from '../styles/styles';


const Home = () => (
    <div style={homeContainer}>
        <h1>Welcome to the Videoclub App</h1>
        <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/ef/3-strip_Technicolor_camera.jpg"
            alt="Technicolor Camera"
            style={homeImage}
        />
    </div>
);

export default Home;

