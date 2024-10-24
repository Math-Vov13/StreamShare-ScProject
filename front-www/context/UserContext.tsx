"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "@/utils/axiosConfig"; // Import the axios config
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie'; // Import a library to handle cookies

// Define the shape of the UserContext data
interface UserContextType {
  user: { name: string } | null;
  setUser: React.Dispatch<React.SetStateAction<{ name: string } | null>>;
  logout: () => void;
}

// Create the UserContext
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook to use UserContext easily
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// UserProvider component
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    const tokenU = Cookies.get('tokenU');

    if (token && tokenU) { // Only make the request if tokens exist
      axios.get('/api/v1/groups/users')
        .then(response => {
          setUser(response.data.response); // Assuming response contains the user data
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          if (error.response?.status === 401) {
            // If unauthorized, redirect to login page
            router.push('/login');
          }
        });
    }
  }, [router]);

  // Handle logout: remove only the 'tokenU' cookie and reset user
  const logout = async () => {
    try {
        await axios.delete('/api/v1/groups/users/auth', {
            withCredentials: true, // Envoie des cookies avec la requête
        });
    } catch (error) {
        console.error("Logout Error:", error);
    } finally {
        Cookies.remove('tokenU'); // Supprime le cookie du client si nécessaire
        setUser(null); // Réinitialise l'état utilisateur
        router.push('/profiles'); // Redirige vers les profils
    }
};


  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
