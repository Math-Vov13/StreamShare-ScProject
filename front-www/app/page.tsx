"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Billboard from "@/components/billboard";


export default function Home() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  useEffect(() => {
    // Use axios to fetch the user data from the API
    axios.get('/api/user')
      .then(response => {
        setUser(response.data.user); // Set the user data
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);


  return (
    <div className="flex w-full h-screen bg-gradient-to-b from-black to-purple-500">
      <Navbar />
      <Billboard />
    </div>
  );
}
