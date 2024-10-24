import React from 'react';
import { useRouter } from 'next/navigation';
import { FaPlay } from 'react-icons/fa';

interface PlayButtonProps {
  contentId: string; // Passer l'ID du contenu
}

const PlayButton: React.FC<PlayButtonProps> = ({ contentId }) => {
  const router = useRouter();

  const handlePlayClick = () => {
    router.push(`/watch/${contentId}`); // Rediriger vers la page de lecture
  };

  return (
    <button
      onClick={handlePlayClick}
      className="absolute bottom-4 right-4 bg-green-500 text-center text-white rounded-full p-2 transition duration-300 hover:bg-green-600"
    >
      <FaPlay className="w-6 h-6" />
    </button>
  );
};

export default PlayButton;

