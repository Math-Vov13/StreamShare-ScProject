"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { MdAddPhotoAlternate } from "react-icons/md";
import { Button } from "@/components/ui/button";

const CreateUserProfile = () => {
  const [name, setName] = useState("");
  const [profileType, setProfileType] = useState("Adult");
  const [profilePic, setProfilePic] = useState<string | null>(null); // explicitly typed as string or null
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  // Handle submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true); // Start the loading state

    // Simulate async action, such as an API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a 2-second delay for an API call

      console.log("Profile Created", { name, profileType, profilePic });

      // Redirect to profiles page after creation
      router.push('/profiles');
    } catch (error) {
      console.error("Error creating profile:", error);
    } finally {
      setIsPending(false); // End the loading state
    }
  };

  return (
    <div className="flex items-center h-screen justify-center bg-gradient-to-b from-black to-purple-900">
      <div className="w-full max-w-lg mx-auto bg-gray-900 rounded-lg shadow-md p-8">
        <h2 className="text-4xl text-white text-center mb-8">Créer un Profil Utilisateur</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center mb-6">
            {/* Profile Picture */}
            <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center mb-4">
              {profilePic ? (
                <img src={profilePic} alt="Profile Preview" className="w-full h-full rounded-full object-cover" />
              ) : (
                <MdOutlinePhotoCamera className="w-8 h-8"/>
              )}
            </div>

            {/* Upload button */}
            <label className="bg-purple-600 text-white flex flex-row items-center gap-2 px-4 py-2 rounded-md hover:bg-purple-500 cursor-pointer">
              <MdAddPhotoAlternate className="w-6 h-6" />
              IMPORTER UNE IMAGE
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          {/* Name Input */}
          <div className="mb-6">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)} // onChange event doesn't need explicit typing here
              placeholder="Nom du Profil"
              className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-600"
              required
            />
          </div>

          {/* Profile Type (Adult / Children) */}
          <div className="mb-6">
            <label className="block text-white mb-2">Type de Profil</label>
            <div className="flex items-center justify-between gap-4">
              <label className="flex items-center text-white">
                <input
                  type="radio"
                  value="Adult"
                  checked={profileType === "Adult"}
                  onChange={() => setProfileType("Adult")}
                  className="mr-2"
                />
                Adulte
              </label>

              <label className="flex items-center text-white">
                <input
                  type="radio"
                  value="Children"
                  checked={profileType === "Children"}
                  onChange={() => setProfileType("Children")}
                  className="mr-2"
                />
                Enfant
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-r from-purple-700 to-purple-400 text-white text-lg py-3 rounded-md hover:opacity-75 transition-colors"
          >
            {isPending ? "Chargement..." : "AJOUTER LE PROFIL"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateUserProfile;
