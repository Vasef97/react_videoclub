import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { table, tableHeader, tableRow, tableCell, addMovieButton, deleteButton } from '../styles/styles';

const MovieList = () => {
  const { videoclubId } = useParams();
  const navigate = useNavigate();
  const [videoclub, setVideoclub] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`http://localhost:8080/movie/all/videoclub/${videoclubId}`);
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies', error);
      }
    };

    const fetchVideoclub = async () => {
      try {
        const response = await fetch(`http://localhost:8080/videoclub/${videoclubId}`);
        const data = await response.json();
        setVideoclub(data);
      } catch (error) {
        console.error('Error fetching videoclub', error);
      }
    };

    fetchMovies();
    fetchVideoclub();
  }, [videoclubId]);

  const deleteMovie = async (movieId) => {
    try {
      const response = await fetch(`http://localhost:8080/movie/${movieId}/videoclub/${videoclubId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMovies(movies.filter(movie => movie.id !== movieId));
      } else {
        console.error('Failed to delete the movie');
      }
    } catch (error) {
      console.error('Error deleting the movie', error);
    }
  };

  return (
    <div>
      {videoclub && (
        <>
          <h2>{videoclub.name}</h2>
          <p>Phone: {videoclub.phoneNumber}</p>
          <p>Address: {videoclub.address}</p>
        </>
      )}
      <button style={addMovieButton} onClick={() => navigate(`/add-movie/${videoclubId}`)}>Add Movie</button>
      <h3>Movies</h3>
      <table style={table}>
        <thead>
          <tr style={tableHeader}>
            <th style={tableCell}>Name</th>
            <th style={tableCell}>Genre</th>
            <th style={tableCell}>Release Date</th>
            <th style={tableCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {[...movies].reverse().map(movie => (
            <tr key={movie.id} style={tableRow}>
              <td style={tableCell}>{movie.name}</td>
              <td style={tableCell}>{movie.genre}</td>
              <td style={tableCell}>{movie.releasedate}</td>
              <td style={tableCell}>
                <button style={deleteButton} onClick={() => deleteMovie(movie.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieList;



