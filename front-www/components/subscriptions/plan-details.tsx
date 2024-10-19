interface PlanDetailsProps {
    details: string[];
}

const PlanDetails: React.FC<PlanDetailsProps> = ({ details }) => (
    <ul className="text-sm mt-4 space-y-2 text-left">
        {details.map((detail, index) => (
            <li key={index}>✔️ {detail}</li>
        ))}
    </ul>
);

export default PlanDetails;