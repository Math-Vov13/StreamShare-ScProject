"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as z from "zod";
import axios from "axios";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
import { RegisterSchema } from "@/schemas";

// Define the type for the form values based on Zod schema
type RegisterFormValues = z.infer<typeof RegisterSchema>;

// Define the type for the response from the login API
interface RegisterResponse {
  error?: string;
  success?: string;
  token?: string;  // Add token field
  user?: {
    name: string;
    email: string;
  };
}

export const RegisterForm: React.FC = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, setIsPending] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = async (values) => {
    setError(undefined);
    setSuccess(undefined);
    setIsPending(true);  // Set to true when the request starts

    try {
      // Send request to the API
      const response = await axios.post<RegisterResponse>("http://localhost:5000/auth/register", values);

      if (response.status === 201) {
        // Store the token in localStorage
        const token = response.data.token;
        if (token) {
          localStorage.setItem('token', token);
        }

        // Optionally, display a success message
        setSuccess("Inscription réussie!");

        // Redirect to the subscriptions page
        router.push("/subscriptions");
      } else {
        setError(response.data.error || "Une erreur s'est produite.");
      }
    } catch (error) {
      // Handle request errors
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
      headerLabel="Bienvenue sur StreamShare 😊🍿"
      backButtonLabel="Je suis déjà abonné à StreamShare"
      backButtonHref="/login"
      showSocialLogin
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Nom</FormLabel>
                  <FormControl>
                    <Input
                      className="text-white bg-zinc-800 border-none"
                      type="text"
                      disabled={isPending}
                      placeholder="John Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
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
                      disabled={isPending}
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
                  <FormLabel className="text-white">Mot de passe</FormLabel>
                  <FormControl>
                    <Input
                      className="text-white bg-zinc-800 border-none"
                      type="password"
                      disabled={isPending}
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
            disabled={isPending}
            className="flex w-full justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#a558c8] to-violet-600 hover:opacity-75"
            type="submit"
          >
            {isPending ? "Inscription en cours..." : "Créer votre compte"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
