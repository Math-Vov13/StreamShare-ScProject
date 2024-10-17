"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Subscriptions = () => {
    const router = useRouter();
    return (
        <div className="w-full h-screen bg-gradient-to-b from-black to-purple-500 flex flex-col items-center">
            <div className="flex flex-col items-center mt-10">
                <Image
                    src="/logo-streamshare.png" // Replace with your logo path
                    alt="Streamshare Logo"
                    width={500}
                    height={500}
                />
            </div>
            <h2 className="text-3xl lg:text-6xl font-mono text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-violet-800 filter backdrop-blur-md mt-6">
                CHOISISSEZ VOTRE FORFAIT.
            </h2>
            <div className="flex flex-col items-centerjustify-center gap-4 mt-10 lg:flex-row overflow-auto">
                <div className="flex flex-col items-center justify-center w-80 bg-zinc-800 rounded-xl shadow-xl p-6 text-center text-white">
                    <div className="w-[100px] h-[100px] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-300 to-violet-500 clip-path-custom-diamond"></div>
                    <h3 className="text-2xl font-semibold text-purple-400 mt-4">Light</h3>
                    <p className="text-xl mt-4">
                        <span className="font-bold">4.99€</span>/mois
                    </p>
                    <p className="text-sm text-gray-500">Sans engagement</p>
                    <hr className="bg-gray-600 border-0 h-px my-4"></hr>
                    <ul className="text-sm mt-4 space-y-2 text-left">
                        <li>✔️ Accès à un large choix de films et séries</li>
                        <li>✔️ Qualité vidéo standard (SD)</li>
                        <li>✔️ Utilisation sur un seul écran à la fois</li>
                        <li>✔️ Idéal pour une utilisation occasionnelle</li>
                        <li>✔️ Downloads limités pour visionnage hors-ligne</li>
                    </ul>
                    <Button className="flex w-full mt-6 justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#a558c8] to-violet-600 hover:opacity-75">
                        CHOISIR CE FORFAIT
                    </Button> 
                </div>
                <div className="flex flex-col items-center justify-center w-80 bg-zinc-800 rounded-xl shadow-xl p-6 text-center text-white">
                    <div className="w-[100px] h-[100px] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-400 to-violet-600 clip-path-custom-pentagon"></div>
                    <h3 className="text-2xl font-semibold text-purple-500 mt-4">Medium</h3>
                    <span className="text-2xl font-extrabold text-red-700 mt-4">(Populaire)</span>
                    <p className="text-xl mt-4">
                        <span className="font-bold">9.99€</span>/mois
                    </p>
                    <p className="text-sm text-gray-500">Sans engagement</p>
                    <hr className="bg-gray-600 border-0 h-px my-4"></hr>
                    <ul className="text-sm mt-4 space-y-2 text-left">
                        <li>✔️ Accès illimité à tout le catalogue</li>
                        <li>✔️ Streaming en haute définition (HD)</li>
                        <li>✔️ Jusqu'à deux écrans en simultané</li>
                        <li>✔️ Contenus exclusifs</li>
                        <li>✔️ + Avantages Light</li>
                    </ul>    
                    <Button className="flex w-full mt-6 justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#a558c8] to-violet-600 hover:opacity-75">
                        CHOISIR CE FORFAIT
                    </Button>   
                </div>
                <div className="flex flex-col items-center justify-center w-80 bg-zinc-800 rounded-xl shadow-xl p-6 text-center text-white">
                    <div className="w-[100px] h-[85px] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-500 to-violet-700 clip-path-custom-hexagon transfrom rotate-90"></div>
                    <h3 className="text-2xl font-semibold text-purple-700 mt-4">Heavy</h3>
                    <p className="text-xl mt-4">
                        <span className="font-bold">14.99€/mois</span>
                    </p>
                    <p className="text-sm text-gray-500">Sans engagement</p>
                    <hr className="bg-gray-600 border-0 h-px my-4"></hr>
                    <ul className="text-sm mt-4 space-y-2 text-left">
                        <li>✔️ Tout le contenu en ultra haute définition (4K)</li>
                        <li>✔️ Jusqu'à quatre écrans en simultané</li>
                        <li>✔️ Accès Grand Ecrans (Plus de 30 utilisateurs)</li>
                        <li>✔️ Partage du compte avec famille ou amis</li>
                        <li>✔️ + Avantages Light + Medium</li>
                    </ul>
                    <Button className="flex w-full mt-6 justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#a558c8] to-violet-600 hover:opacity-75">
                        CHOISIR CE FORFAIT
                    </Button> 
                </div>
            </div>
        </div>
    );
};

export default Subscriptions;