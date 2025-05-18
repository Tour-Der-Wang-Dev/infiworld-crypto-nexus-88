
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

const FeatureCard = ({ title, description, icon, className }: FeatureCardProps) => {
  return (
    <div className={cn("infinity-card p-6 h-full flex flex-col", className)}>
      <div className="mb-4 text-infi-gold w-12 h-12 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 gold-gradient-text">{title}</h3>
      <p className="text-gray-300 flex-grow">{description}</p>
    </div>
  );
};

export default FeatureCard;
