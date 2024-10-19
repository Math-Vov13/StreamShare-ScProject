import { Button } from "@/components/ui/button";
import PlanDetails from "./plan-details"; // Import PlanDetails component

interface SubscriptionCardProps {
    title: string;
    price: string;
    features: string[];
    isPopular: boolean | undefined;
    gradientColor: string;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ title, price, features, isPopular, gradientColor }) => (
    <div className="flex flex-col items-center justify-between w-80 min-h-[500px] bg-zinc-800 rounded-xl shadow-xl p-6 text-center text-white">
        <div className={`h-[100px] w-[100px] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] ${gradientColor} clip-path-custom-diamond`}></div>
        <h3 className={`text-2xl font-semibold ${gradientColor.replace("to-", "text-")} mt-4`}>{title}</h3>
        {isPopular && <span className="text-2xl font-extrabold text-red-700 mt-4">(Populaire)</span>}
        <p className="text-xl mt-4">
            <span className="font-bold">{price}</span>/mois
        </p>
        <p className="text-sm text-gray-500">Sans engagement</p>
        <hr className="bg-gray-600 border-0 h-px my-4"></hr>
        <PlanDetails details={features} />
        <Button className="flex w-full mt-6 justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#a558c8] to-violet-600 hover:opacity-75">
            CHOISIR CE FORFAIT
        </Button>
    </div>
);

export default SubscriptionCard;
