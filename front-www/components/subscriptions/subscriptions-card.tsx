import React from "react";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

interface SubscriptionCardProps {
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  gradientColor: string;
  onSelectPlan: (title: string) => void;
  isPending: boolean;
}

const PlanDetails: React.FC<{ details: string[] }> = ({ details }) => (
  <ul className="text-left text-sm text-white space-y-2 mt-4">
    {details.map((detail, index) => (
      <li key={index}>&bull; {detail}</li>
    ))}
  </ul>
);

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  title,
  price,
  features,
  isPopular,
  gradientColor,
  onSelectPlan,
  isPending,
}) => (
  <div className="flex flex-col items-center justify-between w-full lg:w-[350px] min-h-[600px] bg-zinc-600 rounded-xl shadow-xl p-6 text-center text-white"> {/* Adjust width */}
    <div className={`h-[100px] w-[100px] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] ${gradientColor} clip-path-custom-diamond`}></div>
    <h3 className={`text-2xl font-semibold ${gradientColor.replace("to-", "text-")} mt-4`}>{title}</h3>
    {isPopular && <span className="text-2xl font-extrabold text-red-700 mt-4">(Populaire)</span>}
    <p className="text-xl mt-4">
      <span className="font-bold">{price}</span>/mois
    </p>
    <p className="text-sm text-white">Sans engagement</p>
    <hr className="bg-white w-full border-0 h-px my-4"></hr>
    <PlanDetails details={features} />
    <Button 
      className="flex w-full mt-6 justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#a558c8] to-violet-600 hover:opacity-75"
      onClick={() => onSelectPlan(title)}
      disabled={isPending}
    >    
      {isPending ? "Chargement..." : "CHOISIR CE FORFAIT"}
    </Button>
  </div>
);

export default SubscriptionCard;
