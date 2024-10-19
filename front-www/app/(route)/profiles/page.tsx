"use client";
import Image from "next/image";
import { Text } from "react-font";
import { useRouter } from "next/navigation";
// Adjust the path to your authOptions
const Profiles = () => {
  const router = useRouter();
  
  return (
    <div className="flex items-center h-full justify-center bg-gradient-to-b from-black to-purple-500">
      <div className="flex flex-col items-center justify-center">
        <Image 
          src="/logo-streamshare-form.png" 
          alt="logo" 
          width={500} 
          height={500}>

        </Image>
        <Text family="Poppins" italic weight={700} className="text-3xl md:text-6xl text-white text-center">QUI EST-CE ?</Text>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div>
            <div className="flex-row w-44 mx-auto">
              <div
                onClick={() => router.push('/')}
                className="
                w-44 
                h-44 
                rounded-full
                flex items-center 
                justify-center 
                border-2 
                border-transparent 
                hover:cursor-pointer
                hover:border-purple-400
                overflow-hidden
                "
              >
                <Image src="/goku-pp.jpg" alt="Profile" width={180} height={180}></Image>
              </div>
              <div className="flex flex-row items-center justify-center border-2 rounded-md bg-gradient-to-r from-purple-200 to-purple-400 mt-4">
                <div className="
                  text-2xl
                  text-center
                text-purple-800
                ">
                  S7VENST4RS
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-purple-300 hover:text-purple-800">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profiles;
