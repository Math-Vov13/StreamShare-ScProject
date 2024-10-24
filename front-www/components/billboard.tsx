import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

const Billboard = () => {
  return (
    <div className="relative h-[56.25vw]">
     
      <video
        className="w-full h-[56.25vw] object-cover brightness-[60%]"
        autoPlay
        muted
        loop
        playsInline
        src="https://d13mrx6brjrhcg.cloudfront.net/banners/titanic.mp4 " // Provided video URL
      />
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          Titanic
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
        Titanic (1997) est un drame romantique qui raconte l'histoire d'amour entre Jack Dawson et Rose DeWitt à bord du paquebot, avant son naufrage tragique en 1912. 
        Le film mêle émotion et événements historiques, accompagné d'une bande originale mémorable.
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <button className="
            bg-purple-500 
            text-white 
            bg-opacity-30 
            rounded-md 
            py-1 md:py-2 
            px-2 md:px-4 
            w-auto 
            text-xs 
            lg:text-lg 
            font-semibold 
            flex 
            flex-row 
            items-center 
            hover:bg-opacity-20 
            transition"
            >
              <AiOutlineInfoCircle className="mr-1" />
              More Info
          </button>
        </div>
      </div>
    
      
    </div>
  );
};

export default Billboard;
