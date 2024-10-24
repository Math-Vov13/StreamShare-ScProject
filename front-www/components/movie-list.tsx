"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './movie-card'; // Import the MovieCard component

const MovieList = () => {
  // State to store movies
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch movies from the API
  const fetchMovies = async () => {
    try {
      const response = await axios.get('api/v1/search');
      // Access the 'response' property of the returned data
      if (Array.isArray(response.data.response)) {
        setMovies(response.data.response); // Set movies to the array
      } else {
        throw new Error('Expected an array of movies');
      }
    } catch (error: any) {
      setError(error.message); // Capture error message
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  // Use useEffect to fetch movies on component mount
  useEffect(() => {
    fetchMovies();
  }, []);

  // Loading state
  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  // Error state
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  // Render the list of movies
  return (
    <div className="text-white">
      <h1 className="text-white text-md md:text-xl lg:text-2xl font-semibold mt-2 mb-2">Trending Now</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <MovieCard 
            key={movie.id} 
            id={movie.id} 
            title={movie.title} 
            thumbnail={movie.thumbnail} 
            note={movie.note} 
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
