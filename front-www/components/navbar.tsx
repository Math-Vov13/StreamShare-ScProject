
import NavBarItem from "@/components/navbar-item";
import { BsChevronDown, BsSearch, BsBell  } from "react-icons/bs";

import  MobileMenu  from "@/components/mobile-menu";
import { useEffect, useCallback, useState } from "react";
import  AccountMenu  from "@/components/account-menu";

const TOP_OFFSET = 66;

const Navbar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false)

    const toogleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current);
    }, []);
    const toogleAccountMenu = useCallback(() => {
        setShowAccountMenu((current) => !current);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
                setShowBackground(true);
            } else {
                setShowBackground(false);
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])
    return ( 
        <nav className="w-full fixed z-40">
            <div 
            className="
                w-full 
                px-4 
                md:px-16 
                py-6 
                flex 
                flex-row 
                items-center 
                transition 
                duration-500 
                ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}
            "
            >
                <img src="/logo.png" alt="logo" className="h-[100px] lg:h-[150px]" />
                <div
                    className="
                    flex-row
                    ml-8
                    gap-7
                    hidden
                    lg:flex
                "
                >
                    <NavBarItem label="Accueil"/>
                    <NavBarItem label="Series"/>
                    <NavBarItem label="Films"/>
                    <NavBarItem label="Tendance du Moment"/>
                    <NavBarItem label="Mes Favoris"/>
                    <NavBarItem label="Naviguer par langues"/>
                </div>
                <div onClick={toogleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
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
                    <div onClick={toogleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-full overflow-hidden">
                            <img src="/goku-pp.jpg" alt="account profile picture" />
                        </div>
                        <BsChevronDown className={`text-violet-200 transition ${showAccountMenu ? "rotate-180" : "rotate-0"}`}/>
                        <AccountMenu visible={showAccountMenu}/>
                    </div>
                </div>
            </div>
        </nav>
     );
}
 
export default Navbar;