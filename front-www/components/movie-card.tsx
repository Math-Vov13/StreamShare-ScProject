import React from 'react';

interface MovieCardProps {
  id: string;
  title: string;
  thumbnail: string;
  note: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, title, thumbnail, note }) => {
  return (
    <div key={id} className="bg-gray-800 p-4 rounded-lg flex flex-col justify-between h-full">
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-48 object-cover rounded-lg mb-2" // Set a fixed height for images
      />
      <div>
        <h2 className="text-lg">{title}</h2>
        <p className="text-sm text-gray-400">Note: {note}</p>
      </div>
    </div>
  );
};

export default MovieCard;
