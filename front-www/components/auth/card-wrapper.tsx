"use client";

import 
{ 
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} 
    from "../ui/card";
import { Header } from "@/components/auth/header";
import { SocialLogin } from "@/components/auth/social";
import BackButton from "@/components/auth/back-button";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocialLogin?: boolean;
}

export const CardWrapper =  ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocialLogin
}: CardWrapperProps) => {

    return ( 
        <Card className="w-[400px] shadow-md bg-white">
            <CardHeader>
                <Header label={headerLabel}/>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocialLogin && (
                <CardFooter>
                    <SocialLogin />
                </CardFooter>
            )}
            <CardFooter>
                <BackButton 
                href={backButtonHref}
                label={backButtonLabel}
                />
            </CardFooter>
        </Card>
        
     );
}