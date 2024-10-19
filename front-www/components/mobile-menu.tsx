interface MobileMenuProps
{
    visible?: boolean
    
}
const MobileMenu: React.FC<MobileMenuProps> = ({
    visible
}) => 
    {
        if (!visible) {
            return null;
        }
    return ( 
        <div className="bg-black rounded-md w-56 absolute top-8 left-0 py-5 px-2 flex-col border-2 border-transparent flex">
            <div className="flex flex-col gap-4">
                <div className="px-3 text-center text-white hover:underline">
                    Home
                </div>
                <div className="px-3 text-center text-white hover:underline">
                    Series
                </div>
                <div className="px-3 text-center text-white hover:underline">
                    Films
                </div>
                <div className="px-3 text-center text-white hover:underline">
                    Tendance du Moment
                </div>
                <div className="px-3 text-center text-white hover:underline">
                    Mes Favories
                </div>
                <div className="px-3 text-center text-white hover:underline">
                    Naviguer par langues
                </div>
            </div>
        </div>
     );
}
 
export default MobileMenu;