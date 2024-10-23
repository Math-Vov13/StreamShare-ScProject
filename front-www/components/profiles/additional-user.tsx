import { useRouter } from "next/navigation";

const AdditionalUser = () => {
    const router = useRouter();
  
    return (
      <div
        onClick={() => router.push('/create-user')} // Navigate to create user page
        className="
          w-44 
          h-44 
          flex items-center 
          justify-center 
          rounded-full 
          border-2 
          border-dashed 
          border-white 
          hover:border-purple-400 
          hover:cursor-pointer 
          transition duration-300 ease-in-out
          bg-transparent
        "
      >
        {/* "+" Icon */}
        <span className="text-6xl text-white">+</span>
      </div>
    );
};

export default AdditionalUser;