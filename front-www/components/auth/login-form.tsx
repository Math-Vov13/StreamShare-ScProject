"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as z from "zod";
import axios from "@/utils/axiosConfig";
import Cookie from "js-cookie";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import React from "react";
import { CardWrapper } from "@/components/auth/card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormSuccess } from "@/components/auth/form-success";
import { FormError } from "@/components/auth/form-error";
import { LoginSchema } from "@/schemas";

// Define the type for the form values based on Zod schema
type LoginFormValues = z.infer<typeof LoginSchema>;

// Define the type for the response from the login API
interface LoginResponse {
  error?: string;
  success?: string;
  token?: string;
  account?: {
    name: string;
    email: string;
  };
}

export const LoginForm: React.FC = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, setIsPending] = useState<boolean>(false); // Correct state management
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    setError(undefined);
    setSuccess(undefined);
    setIsPending(true);  // Set to true when the request starts

    try {
      // Utilisation d'Axios pour envoyer une requête POST
      const response = await axios.post<LoginResponse>("http://localhost:5000/api/v1/groups/auth", values, {withCredentials: false});

      // Gestion des réponses
      if (response.status === 201) {
        const token = response.data.token;
        if (token) {
          Cookie.set("token", token, { expires: 7 });
        }

        setSuccess(response.data.success || "Connexion réussie !");
        //Optionnel : Rediriger vers une autre page après connexion
        router.push("/profiles");
      } else {
        setError(response.data.error || "Une erreur s'est produite.");
      }
    } catch (error) {
      // Gestion des erreurs lors de la requête
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.error || "Erreur de connexion.");
      } else {
        setError("Une erreur imprévue est survenue.");
      }
    } finally {
      setIsPending(false);  // Reset to false when the request finishes
    }
  };

  return (
    <CardWrapper
      headerLabel="Content de vous revoir 😊🍿"
      backButtonLabel="Je ne suis pas abonné à SteamShare"
      backButtonHref="/register"
      showSocialLogin
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4 w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <Input
                      className="text-white bg-zinc-800 border-none"
                      type="email"
                      disabled={isPending}  // Disable input when pending
                      placeholder="johndoe@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <Input
                      className="text-white bg-zinc-800 border-none"
                      type="password"
                      disabled={isPending}  // Disable input when pending
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}  // Disable button when pending
            className="flex w-full justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#a558c8] to-violet-600 hover:opacity-75"
            type="submit"
          >
            {isPending ? "Connexion en cours..." : "Se connecter"} {/* Show loading state */}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
