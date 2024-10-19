"use client";

import { useRouter } from "next/navigation";
import Logo from "@/components/subscriptions/logo";
import MainHeader from "@/components/subscriptions/main-header";
import SubscriptionCard from "@/components/subscriptions/subscriptions-card";

const Subscriptions = () => {
    const router = useRouter();

    const plans = [
        {
            title: "Light",
            price: "4.99€",
            features: [
                "Accès à un large choix de films et séries",
                "Qualité vidéo standard (SD)",
                "Utilisation sur un seul écran à la fois",
                "Idéal pour une utilisation occasionnelle",
                "Downloads limités pour visionnage hors-ligne"
            ],
            gradientColor: "from-purple-300 to-violet-500",
        },
        {
            title: "Medium",
            price: "9.99€",
            features: [
                "Accès illimité à tout le catalogue",
                "Streaming en haute définition (HD)",
                "Jusqu'à deux écrans en simultané",
                "Contenus exclusifs",
                "+ Avantages Light"
            ],
            isPopular: true,
            gradientColor: "from-purple-400 to-violet-600",
        },
        {
            title: "Heavy",
            price: "14.99€",
            features: [
                "Tout le contenu en ultra haute définition (4K)",
                "Jusqu'à quatre écrans en simultané",
                "Accès Grand Ecrans (Plus de 30 utilisateurs)",
                "Partage du compte avec famille ou amis",
                "+ Avantages Light + Medium"
            ],
            gradientColor: "from-purple-500 to-violet-700",
        },
    ];

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-black to-purple-500 flex flex-col items-center">
            <Logo />
            <MainHeader />
            <div className="flex flex-col items-center justify-center gap-6 mt-10 lg:flex-row lg:flex-wrap">
                {plans.map((plan, index) => (
                    <SubscriptionCard
                        key={index}
                        title={plan.title}
                        price={plan.price}
                        features={plan.features}
                        isPopular={plan.isPopular}
                        gradientColor={plan.gradientColor}
                    />
                ))}
            </div>
        </div>
    );
};

export default Subscriptions;
