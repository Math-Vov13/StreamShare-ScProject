"use client";

import Image from "next/image";

interface SidebarProps {
    children: React.ReactNode
}

const Sidebar: React.FC<SidebarProps> = ({ 
    children 
}) => {
    return ( 
        <div className="flex h-full">
            <div className="hidden md:flex flex-col gap-y-2 bg-white h-full w-[500px] p-2 gap-4">
                <div className="flex justify-center mb-8">
                    <Image
                        src="/logo.png"
                        alt="logo"
                        width={300}
                        height={300}
                    />
                </div>
                <div className="flex-1 flex justify-center">
                    <h1 className="text-center font-bold text-[#a558c8] text-3xl">Bienvenue sur StreamShare</h1>
                </div>
            </div>
            <main className="h-full flex-1">
                {children} 
            </main>
        </div>
     );
}
 
export default Sidebar;