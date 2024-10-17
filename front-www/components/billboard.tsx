import React from "react";
import { Button } from "@/components/ui/button";

const Billboard = () => {
    return (
        <div className="relative h-[56.25vw]">
            <img src="/billboard-image.png" alt="billboard" className="w-full h-full object-cover" />
            <div className="absolute top-1/2 left-[20%] transform -translate-x-1/2 -translate-y-1/2 max-h-[250px]">
                <img src="/Initial_D_Logo.png" alt="Initial_D_Logo" className="h-[150px]" />
            </div>
            <div className="absolute top-[60%] left-[20%] transform -translate-x-1/2 mt-4">
                <Button variant={"outline"} className="w-[200px]" size={"lg"}>
                    Lecture
                </Button>
            </div>
            
        </div>
    )
}

export default Billboard;