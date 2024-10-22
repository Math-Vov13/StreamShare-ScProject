import React from "react";
import { Button } from "@/components/ui/button";

const Billboard = () => {
  return (
    <div className="relative h-[56.25vw] w-full overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        src="https://d13mrx6brjrhcg.cloudfront.net/starwars.mp4" // Provided video URL
      />

      {/* Overlay for the text and buttons */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">Featured Movie</h1>
          <p className="text-white text-lg md:text-xl mb-8">
            A gripping movie you don’t want to miss. Watch now!
          </p>
          <Button className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg">
            Watch Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
