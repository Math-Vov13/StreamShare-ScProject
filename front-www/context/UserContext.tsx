"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "@/utils/axiosConfig";
import { useRouter } from "next/navigation";

// Define the shape of the UserContext data
interface UserContextType {
  user: { name: string; thumbnail: string } | null;
  setUser: React.Dispatch<React.SetStateAction<{ name: string; thumbnail: string } | null>>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

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

  const logout = async () => {
    try {
      await axios.delete('/api/v1/groups/users/auth');
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
