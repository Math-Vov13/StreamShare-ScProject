import NavBarItem from "@/components/navbar-item";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import MobileMenu from "@/components/mobile-menu";
import { useEffect, useCallback, useState } from "react";
import AccountMenu from "@/components/account-menu";
import { useUser } from "@/context/UserContext";
import axios from "@/utils/axiosConfig"; // Make sure to import your axios config

const TOP_OFFSET = 66;

const Navbar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);
    
    const { user } = useUser(); // Access user context
    const [profile, setProfile] = useState({ name: "", thumbnail: "" }); // State for profile data

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current);
    }, []);
    
    const toggleAccountMenu = useCallback(() => {
        setShowAccountMenu((current) => !current);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
                setShowBackground(true);
            } else {
                setShowBackground(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    // Fetch user profile data when the component mounts
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/groups/users'); // Updated the URL
                if (response.data.response) {
                    const { name, thumbnail } = response.data.response; // Destructure the data
                    setProfile({ name, thumbnail }); // Update state with user profile
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        if (user) { // Only fetch if user is logged in (i.e., user context is available)
            fetchUserProfile();
        }
    }, [user]);

    return ( 
        <nav className="w-full fixed z-40">
            <div 
                className={`w-full px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}`}
            >
                <img src="/logo-streamshare-form.png" alt="logo" className="h-[85px] lg:h-[125px]" />
                <div className="flex-row ml-8 gap-7 hidden lg:flex">
                    <NavBarItem label="Accueil"/>
                    <NavBarItem label="Series"/>
                    <NavBarItem label="Films"/>
                    <NavBarItem label="Tendance du Moment"/>
                    <NavBarItem label="Mes Favoris"/>
                    <NavBarItem label="Naviguer par langues"/>
                </div>
                <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                    <p className="text-white">Naviguer</p>
                    <BsChevronDown className={`text-white transition ${showMobileMenu ? "rotate-180" : "rotate-0"}`} />
                    <MobileMenu visible={showMobileMenu}/>
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-violet-200 hover:text-violet-300 cursor-pointer transition">
                        <BsSearch />
                    </div>
                    <div className="text-violet-200 hover:text-violet-300 cursor-pointer transition">
                        <BsBell />
                    </div>
                    <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-full overflow-hidden">
                            <img src={profile.thumbnail || "/goku-pp.jpg"} alt="account profile picture" /> {/* Default to a placeholder if thumbnail is not available */}
                        </div>
                        <BsChevronDown className={`text-violet-200 transition ${showAccountMenu ? "rotate-180" : "rotate-0"}`}/>
                        {/* Pass the user's name to the AccountMenu */}
                        <AccountMenu visible={showAccountMenu}/> {/* Fallback to "Guest" if name is not available */}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
