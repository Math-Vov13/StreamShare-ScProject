import React from 'react';

interface MovieModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  thumbnail: string;
  note: number;
  description: string; // Add a description for the movie
}

const MovieModal: React.FC<MovieModalProps> = ({ isOpen, onClose, title, thumbnail, note, description }) => {
  if (!isOpen) return null; // Don't render anything if not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:text-gray-400"
        >
          ✖
        </button>
        <img src={thumbnail} alt={title} className="w-full h-48 object-cover rounded-lg mb-4" />
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-400">Note: {note}</p>
        <p className="text-gray-300 mt-4">{description}</p>
      </div>
    </div>
  );
};

export default MovieModal;
