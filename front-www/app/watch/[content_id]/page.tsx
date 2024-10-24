"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { format } from 'date-fns';

interface MovieDetails {
  id: string;
  title: string;
  description: string;
  actors: string[];
  director: string;
  duration: number;
  release_date: string;
  note: number;
  categories: string[];
  tags: string[];
  thumbnail: string;
  video_key: string;
  type_content: string;
}

const Watch = ({ params }: { params: { content_id: string } }) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cloudFrontUrl = 'https://d13mrx6brjrhcg.cloudfront.net';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`/api/v1/search/${params.content_id}`);
        setMovieDetails(response.data.response); // Access the 'response' property correctly
      } catch (error) {
        setError('Error fetching movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [params.content_id]);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!movieDetails) {
    return <div className="text-white">No movie details available.</div>;
  }

  // Helper function to format release date
  const formattedReleaseDate = movieDetails.release_date
    ? format(new Date(movieDetails.release_date), 'MMMM d, yyyy')
    : 'Unknown';

  // Video URL (ensure it's an absolute path or fully qualified URL)
  const videoUrl = `${cloudFrontUrl}/${movieDetails.video_key}`;

  return (
    <div className="flex flex-col items-center bg-zinc-800 min-h-screen p-4">
      <img 
        src="/logo-streamshare-form.png" 
        alt="Streamshare logo" 
        className='w-[300px] mb-4' />
      
      
      <h1 className="text-white text-2xl mb-4 font-bold">{movieDetails.title}</h1>
      
      {/* Video Player */}
      <ReactPlayer
        url={videoUrl} // Ensure this is the correct video URL path
        controls
        width="100%"
        height="auto"
        className="mb-4"
      />
      
      {/* Thumbnail */}
      <img
        src={movieDetails.thumbnail}
        alt={movieDetails.title}
        className="w-full max-w-lg object-cover rounded-lg mb-4"
      />

      {/* Movie Information */}
      <div className="text-white text-left max-w-3xl">
        {/* Description */}
        <p className="mb-4 text-gray-300">{movieDetails.description}</p>
        
        {/* Director */}
        <p className="mb-2"><strong>Director:</strong> {movieDetails.director}</p>
        
        {/* Actors */}
        {movieDetails.actors?.length > 0 ? (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Actors:</h3>
            <ul>
              {movieDetails.actors.map((actor, index) => (
                <li key={index}>{actor}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No actors available for this movie.</p>
        )}
        
        {/* Categories */}
        <p className="mb-2"><strong>Categories:</strong> {movieDetails.categories.join(', ')}</p>
        
        {/* Duration */}
        <p className="mb-2"><strong>Duration:</strong> {movieDetails.duration} minutes</p>
        
        {/* Release Date */}
        <p className="mb-2"><strong>Release Date:</strong> {formattedReleaseDate}</p>
        
        {/* Rating */}
        <p className="mb-2"><strong>Rating:</strong> {movieDetails.note}</p>
        
        {/* Tags */}
        <p className="mb-2"><strong>Tags:</strong> {movieDetails.tags.join(', ')}</p>
        
        {/* Type of Content */}
        <p className="mb-2"><strong>Content Type:</strong> {movieDetails.type_content}</p>
      </div>
    </div>
  );
};

export default Watch;
