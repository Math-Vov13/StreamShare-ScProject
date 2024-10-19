import React from "react";

interface NavbarItemProps {
    label: string;

}

const NavbarItem: React.FC<NavbarItemProps> = ({
    label
}) => {
    
    return ( 
        <div className="text-white cursor-pointer font-semibold hover:text-violet-300">
            {label}
        </div>
     );
}
 
export default NavbarItem;