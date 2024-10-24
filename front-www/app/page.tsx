"use client";

import Navbar from "@/components/navbar";
import Billboard from "@/components/billboard";
import MovieList from "@/components/movie-list";

import { useUser } from "@/context/UserContext";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-zinc-800"> {/* Changed h-screen to min-h-screen */}
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList />
      </div>    
    </div>
  );
} 
