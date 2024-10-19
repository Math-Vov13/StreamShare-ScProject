import { CheckCircleIcon } from "lucide-react";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) {
    return null;
  }
  return (
    <div
      className="bg-emerald-500/15 text-emerald-500 flex items-center p-3 
        rounded-md gap-x-2 text-sm"
    >
      <CheckCircleIcon className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
};