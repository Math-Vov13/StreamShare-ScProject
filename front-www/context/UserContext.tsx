"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "@/utils/axiosConfig"; // Import the axios config
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie'; // Import a library to handle cookies

// Define the shape of the UserContext data
interface UserContextType {
  user: { name: string; thumbnail: string } | null;
  setUser: React.Dispatch<React.SetStateAction<{ name: string; thumbnail: string } | null>>;
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
  const [user, setUser] = useState<{ name: string; thumbnail: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    

    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/v1/groups/users');
        setUser(response.data.response); // Assuming response contains the user data
      } catch (error: any) {
        console.error('Error fetching user data:', error);
        if (error.response?.status === 401) {
          router.push('/login');
        }
      }
    };
    fetchUserData();
  }, []);

  
  // Handle logout: remove only the 'tokenU' cookie and reset user
  const logout = async () => {
    try {
      await axios.delete('/api/v1/groups/users/auth', { withCredentials: true }); // Call the logout API if necessary
    } catch (error) {
      console.error("Logout Error:", error);
    } finally {
      Cookies.remove('tokenU'); // Remove only 'tokenU' cookie
      setUser(null); // Clear user data

      // Redirect to '/profiles' after logout instead of '/login'
      router.push('/profiles');
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
