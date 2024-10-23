"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AdditionalUser from "@/components/profiles/additional-user";
import axios from "@/utils/axiosConfig";
import { toast } from "react-hot-toast";

interface Profile {
  id: string;
  name: string;
  thumbnail: string; // URL for the thumbnail image
  profileType: string;
}

const Profiles = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]); // Renamed from "thumbnail" to "profiles"
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch profiles from the API
  const fetchProfiles = async () => {
    try {
      const response = await axios.get("/api/v1/groups/users");
      setProfiles(response.data); // Assuming the API returns an array of profiles
      setLoading(false);
    } catch (error) {
      toast.error("Failed to load profiles");
      console.error("Error fetching profiles:", error);
      setLoading(false);
    }
  };

  // Load profiles when the component is mounted
  useEffect(() => {
    fetchProfiles();
  }, []);

  if (loading) {
    return <p className="text-white text-center">Loading profiles...</p>;
  }

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
          Welcome !
        </h2>

        {/* Profile section */}
        <div className="flex items-center justify-center gap-8 mt-10">
          <div className="flex flex-row">
            {/* Dynamically render profiles */}
            {profiles.map((profile) => (
              <div key={profile.id} className="w-44 mx-auto">
                {/* Profile image */}
                <div
                  onClick={() => router.push("/")} // Navigate to the home page or dashboard
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
                  <Image
                    src={profile.thumbnail || "/goku-pp.jpg"} // Use a default image if thumbnail is not available
                    alt={profile.name}
                    width={180}
                    height={180}
                  />
                </div>

                {/* Username section */}
                <div className="flex flex-row items-center justify-center border-2 rounded-md bg-gradient-to-r from-purple-200 to-purple-400 mt-4">
                  <div className="text-2xl text-center text-purple-800">
                    {profile.name}
                  </div>
                </div>
              </div>
            ))}

            {/* Additional user component */}
            <AdditionalUser />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
