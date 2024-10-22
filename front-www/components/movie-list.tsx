"use client";

import React from 'react';

// Define the movie type based on your JSON data structure
interface Movie {
  titre: string;
  description: string;
  duree: number;
  dateSortie: string;
  image: string;
  url: string;
}

// Dummy movie data. Ideally, you'd replace this with an API call if dynamic content is required.
const trendingMovies: Movie[] = [
  {
    titre: "Inception",
    description: "Inception is a science fiction action film written and directed by Christopher Nolan.",
    duree: 148,
    dateSortie: "2010-07-16",
    image: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
    url: "https://www.imdb.com/title/tt1375666/"
  },
  {
    titre: "The Dark Knight",
    description: "The Dark Knight is a superhero thriller film directed by Christopher Nolan.",
    duree: 162,
    dateSortie: "2008-07-18",
    image: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
    url: "https://www.imdb.com/title/tt0468569/"
  },
  {
    titre: "Interstellar",
    description: "Interstellar is a science fiction film directed by Christopher Nolan.",
    duree: 169,
    dateSortie: "2014-11-05",
    image: "https://m.media-amazon.com/images/M/MV5BMjIxNTU4MzY4MF5BMl5BanBnXkFtZTgwMzM4ODI3MjE@._V1_.jpg",
    url: "https://www.imdb.com/title/tt0816692/"
  },
];

const MovieList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8">
      {trendingMovies.map((movie) => (
        <a
          key={movie.titre}
          href={movie.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          <img
            src={movie.image}
            alt={movie.titre}
            className="object-cover w-full h-64 group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <h3 className="text-white text-lg font-bold">{movie.titre}</h3>
          </div>
        </a>
      ))}
    </div>
  );
};

export default MovieList;
