import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import SubscriptionCard from "@/components/subscriptions/subscriptions-card";
import { Button } from "@/components/ui/button";
import { MdSubscriptions } from "react-icons/md";

interface SubscriptionDialogProps {
  handleSelectPlan: (plan: string) => void;
}

const SubscriptionDialog: React.FC<SubscriptionDialogProps> = ({ handleSelectPlan }) => {
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = React.useState<string | null>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const plans = [
    {
      title: "Light",
      price: "4.99€",
      features: [
        "Accès à un large choix de films et séries",
        "Qualité vidéo standard (SD)",
        "Utilisation sur un seul écran à la fois",
        "Idéal pour une utilisation occasionnelle",
        "Downloads limités pour visionnage hors-ligne",
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
        "+ Avantages Light",
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
        "+ Avantages Light + Medium",
      ],
      gradientColor: "from-purple-500 to-violet-700",
    },
  ];

  const handlePlanSelection = (planTitle: string) => {
    setIsPending(true);
    setSelectedPlan(planTitle);
    handleSelectPlan(planTitle); // Call the parent function to update the subscription state

    setTimeout(() => {
      setIsPending(false);
      setIsOpen(false);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex flex-row items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-400">
          <MdSubscriptions />
          <span>Choisir un abonnement</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-6xl mx-auto bg-zinc-800 border-none">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white text-center">Sélectionner un abonnement</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 mt-6">
          {plans.map((plan, index) => (
            <SubscriptionCard
              key={index}
              title={plan.title}
              price={plan.price}
              features={plan.features}
              isPopular={plan.isPopular}
              gradientColor={plan.gradientColor}
              onSelectPlan={handlePlanSelection}
              isPending={isPending && selectedPlan === plan.title}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionDialog;
