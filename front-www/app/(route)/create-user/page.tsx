"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUserSchema } from "@/schemas";
import * as z from "zod";
import axios from "@/utils/axiosConfig";
import { toast } from "react-hot-toast";  // Import toast

type UserFormValues = z.infer<typeof UpdateUserSchema>;

const CreateUserProfile = () => {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  // Use shadcn Form hook
  const form = useForm({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: "",
      profileType: "Adult",
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(URL.createObjectURL(file)); // Preview local image
    }
  };

  const handleSubmit = async (values: any) => {
    setIsPending(true); // Set pending state

    // Prepare profile data
    const newProfile = {
      name: values.name,
      profileType: values.profileType,
      thumbnail,
    };

    try {
      const response = await axios.post("/api/v1/groups/users", newProfile, {
        withCredentials: false,
      });
      console.log("Code:", response.status)
      console.log("Data:", response.data)

      if (!response) throw new Error("Failed to create profile");

      // Show success toast notification
      toast.success("Profile created successfully!");
      router.push("/profiles");
    } catch (error) {
      console.error("Error creating profile:", error);
      toast.error("Error creating profile");
    } finally {
      setIsPending(false); // Reset loading state
    }
  };

  return (
    <div className="flex items-center h-screen justify-center bg-gradient-to-b from-black to-purple-900">
      <div className="w-full max-w-lg mx-auto bg-zinc-900 rounded-lg shadow-md p-8">
        <h2 className="text-4xl text-white text-center mb-8">Créer un Profil Utilisateur</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center mb-4">
                {thumbnail ? (
                  <img
                    src={thumbnail}
                    alt="Profile Preview"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-white">📷</span>
                )}
              </div>
              <label className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-500 cursor-pointer">
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
            <FormItem>
              <FormLabel className="text-white">Nom du Profil</FormLabel>
              <FormControl>
                <Input className="w-full text-white bg-zinc-800 border-none" placeholder="Nom du Profil" {...form.register("name")} />
              </FormControl>
              <FormMessage />
            </FormItem>

            {/* Profile Type Selection */}
            <FormItem>
              <FormLabel className="text-white">Type de Profil</FormLabel>
              <FormControl>
                <RadioGroup {...form.register("profileType")} className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem className="bg-zinc-800 text-background" value="Adult" id="r1" />
                    <Label className="text-white" htmlFor="r1">Adult</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem className="bg-zinc-800 text-background" value="Children" id="r2" />
                    <Label className="text-white" htmlFor="r2">Children</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              disabled={isPending}
            >
              {isPending ? "En cours..." : "FINALISER"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateUserProfile;
