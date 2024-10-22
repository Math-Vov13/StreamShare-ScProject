"use client";

import { useRouter } from "next/navigation";
// import { useUser } from "@/context/UserContext"; // Assuming you have UserContext set up
import Image from "next/image";

// Profile page component
const Profiles = () => {
  // const { user } = useUser(); // Get the user data from UserContext
  const router = useRouter();

  // If user data is not yet available, show a loading state
  // if (!user) {
  //   return <p className="text-white text-center">Loading...</p>;
  // }

  return (
    <div className="flex items-center h-full justify-center bg-gradient-to-b from-black to-purple-500">
      <div className="flex flex-col items-center justify-center">
        {/* Logo section */}
        <Image 
          src="/logo-streamshare-form.png" 
          alt="logo" 
          width={500} 
          height={500} 
          className="mb-8"
        />

        {/* Welcome message */}
        <h2 className="text-3xl md:text-6xl text-white text-center mb-6">
          Welcome back, {"Salut"} {/* Display the user's name */}
        </h2>

        {/* Profile section */}
        <div className="flex items-center justify-center gap-8 mt-10">
          <div>
            <div className="flex-row w-44 mx-auto">
              {/* Profile image */}
              <div
                onClick={() => router.push('/')} // Navigate to home on click
                className="
                  w-44 
                  h-44 
                  rounded-full
                  flex items-center 
                  justify-center 
                  border-2 
                  border-transparent 
                  hover:cursor-pointer
                  hover:border-purple-400
                  overflow-hidden
                  transition duration-300 ease-in-out
                "
              >
                <Image src="/goku-pp.jpg" alt="Profile" width={180} height={180} />
              </div>

              {/* Username section */}
              <div className="flex flex-row items-center justify-center border-2 rounded-md bg-gradient-to-r from-purple-200 to-purple-400 mt-4">
                <div className="text-2xl text-center text-purple-800">
                  {"Hello"} {/* Show the user's name */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
