"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "@/utils/axiosConfig"; // Import the axios config you created
import { useRouter } from "next/navigation";

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
    // Fetch user data with the token included in cookies
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
  }, []);

  // Redirect to /profiles if user is logged in
  useEffect(() => {
    if (user) {
      router.push('/profiles'); // Redirect to profiles page
    }
  }, [user, router]);

  const logout = async () => {
    try {
      await axios.delete('/api/v1/groups/users/auth'); // Call the logout API
    } catch (error) {
      console.error("Logout Error:", error);
    } finally {
      setUser(null); // Clear user data
      router.push('/login'); // Redirect to login page after logout
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};