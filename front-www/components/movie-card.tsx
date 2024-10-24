import React, { useState, useEffect } from 'react';
import PlayButton from './playbutton'; // Adjust the import path as necessary

interface MovieCardProps {
  id: string;
  title: string;
  thumbnail: string;
  note: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, title, thumbnail, note }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    const timeout = setTimeout(() => {
      setIsHovered(true);
    }, 1000);
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    setIsHovered(false);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  return (
    <div 
      className={`relative bg-zinc-900 p-4 rounded-lg flex flex-col justify-between h-full cursor-pointer transition-transform duration-300 ${isHovered ? 'translate-y-[-40px]' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-48 object-cover rounded-lg mb-2"
      />
      <div>
        <h2 className="text-lg">{title}</h2>
        <p className="text-sm text-gray-400">Note: {note}</p>
      </div>
      {isHovered && <PlayButton contentId={id} />} {/* Show PlayButton only when hovered */}
    </div>
  );
};

export default MovieCard;
