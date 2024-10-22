// "use client";

// import React, { createContext, useState, useEffect, useContext } from "react";
// import axios from "../utils/axiosConfig"; // Import the axios config you created
// import { useRouter } from "next/navigation";

// // Define the shape of the UserContext data
// interface UserContextType {
//   user: { Name: string } | null;
//   setUser: React.Dispatch<React.SetStateAction<{ Name: string } | null>>;
//   logout: () => void;
// }

// // Create the UserContext
// const UserContext = createContext<UserContextType | undefined>(undefined);

// // Custom hook to use UserContext easily
// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("useUser must be used within a UserProvider");
//   }
//   return context;
// };

// // UserProvider component
// export const UserProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<{ Name: string } | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     // Fetch user data with the token included in cookies
//     axios.get('/api/user')
//       .then(response => {
//         setUser(response.data); // Assuming response contains the user data
//       })
//       .catch(error => {
//         console.error('Error fetching user data:', error);
//         if (error.response?.status === 401) {
//           // If unauthorized, redirect to login page
//           router.push('/login');
//         }
//       });
//   }, []);

//   // Redirect to /profiles if user is logged in
//   useEffect(() => {
//     if (user) {
//       router.push('/profiles'); // Redirect to profiles page
//     }
//   }, [user, router]);

//   const logout = async () => {
//     try {
//       await axios.post('/api/logout'); // Call the logout API
//     } catch (error) {
//       console.error("Logout Error:", error);
//     } finally {
//       setUser(null); // Clear user data
//       router.push('/login'); // Redirect to login page after logout
//     }
//   };

//   return (
//     <UserContext.Provider value={{ user, setUser, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
