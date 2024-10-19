"use client";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from 'next-auth/react'; // Import signIn from NextAuth

export const SocialLogin = () => {
    return (
        <div className="flex items-center w-full gap-x-2">
            <Button
                className="w-full bg-zinc-800 hover:opacity-75"
                size="lg"
                onClick={() => signIn('google', { callbackUrl: '/' })} // Call NextAuth signIn method for Google
            >
                <FcGoogle className="w-5 h-5" />
            </Button>
            <Button
                className="w-full bg-zinc-800 hover:opacity-75"
                size="lg"
                onClick={() => signIn('github', { callbackUrl: '/' })} // Call NextAuth signIn method for GitHub
            >
                <FaGithub className="w-5 h-5" />
            </Button>
        </div>
    );
};
