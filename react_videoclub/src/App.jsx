import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/Home';
import Videoclubs from './components/Videoclubs';
import VideoclubForm from './components/VideoclubForm';
import AddMovieForm from './components/AddMovieForm';
import MovieList from './components/MovieList';
import { content } from './styles/styles';

const App = () => {
  return (
    <div>
      <Navbar />
      <div style={content}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videoclubs" element={<Videoclubs />} />
          <Route path="/create" element={<VideoclubForm />} />
          <Route path="/update/:id" element={<VideoclubForm />} />
          <Route path="/add-movie/:videoclubId" element={<AddMovieForm />} />
          <Route path="/movies/:videoclubId" element={<MovieList />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
