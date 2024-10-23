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
import { UpdateUserSchema } from "@/schemas"; // Ensure this schema is defined correctly
import * as z from "zod";
import axios from "@/utils/axiosConfig";
import { toast } from "react-hot-toast";
import { MdPhotoCamera, MdAddPhotoAlternate } from "react-icons/md";


type UserFormValues = z.infer<typeof UpdateUserSchema>;

const CreateUserProfile = () => {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof UpdateUserSchema>>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: "",
      profileType: "Adult",
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(URL.createObjectURL(file));
    }
  };

  async function onSubmit(values: UserFormValues) {
    setIsPending(true);
    const newProfile = {
      name: values.name,
      profileType: values.profileType,
      thumbnail,
    };
  
    console.log("Hello, World!");
  
    try {
      console.log("Send request :D");
      const response = await axios.post("/api/v1/groups/users", newProfile, {
        withCredentials: true,
      });
  
      if (!response) throw new Error("Failed to create profile");
  
      toast.success("Profile created successfully!");
      router.push("/profiles");
    } catch (error: any) {
      console.error("Error creating profile:", error.response?.data || error.message);
      toast.error("Error creating profile");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="flex items-center h-screen justify-center bg-gradient-to-b from-black to-purple-900">
      <div className="w-full max-w-lg mx-auto bg-zinc-900 rounded-lg shadow-md p-8">
        <h2 className="text-4xl text-white text-center mb-8">Créer un Profil Utilisateur</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
                {thumbnail ? (
                  <img
                    src={thumbnail}
                    alt="Profile Preview"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <MdPhotoCamera className="w-10 h-10 text-white" />
                )}
              </div>
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
            <FormItem>
              <FormLabel className="text-white">Nom du Profil</FormLabel>
              <FormControl>
                <Input
                  className="w-full text-white bg-zinc-800 border-none"
                  placeholder="Nom du Profil"
                  {...form.register("name", { required: true })}
                />
              </FormControl>
              <FormMessage className="text-red-500"/>
            </FormItem>

            
            <FormItem>
              <FormLabel className="text-white">Type de Profil</FormLabel>
              <FormControl>
                <RadioGroup 
                  value={form.watch("profileType")}
                  onValueChange={(value) => form.setValue("profileType", value as "Adult" | "Children")}
                  className="flex gap-6" 
                >
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
              <FormMessage className="text-red-500"/>
            </FormItem>
            
            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-500 text-white"
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
