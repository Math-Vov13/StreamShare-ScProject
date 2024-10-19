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
            <div className="hidden lg:flex flex-col gap-y-2 bg-zinc-900 h-full w-[500px] p-2 gap-4">
                <div className="flex justify-center mb-8">
                    <Image
                        src="/logo-streamshare-form.png"
                        alt="logo"
                        width={500}
                        height={500}
                    />
                </div>
                <div className="flex-1 flex justify-center">
                    <div className="flex flex-col text-center text-5xl font-bold text-white">BIENVENUE SUR 
                        <span className="text-purple-500 italic font-mono"> STREAMSHARE</span>
                    </div>
                </div>
            </div>
            <main className="h-full flex-1 bg-[url('/hero-background.png')] bg-no-repeat bg-center bg-cover">
                {children} 
            </main>
        </div>
     );
}
 
export default Sidebar;