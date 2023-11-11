import { cn } from "@/lib/utils";
import { Clock, LucideIcon } from "lucide-react";

interface InfoCardProps {
  numberOfItems: number;
  variant?: "default" | "success";
  label: string;
  icon: LucideIcon;
}
export const InfoCard = ({
  numberOfItems,
  variant,
  label,
  icon: Icon,
}: InfoCardProps) => {
  return (
    <div className="border rounded-md flex items-center gap-x-2 p-3">
      <div className="flex items-center gap-x-2">
        <div
          className={cn(
            "rounded-full h-12 w-12 p-2 flex items-center justify-center",
            variant === "default"
              ? " bg-sky-100 text-sky-800"
              : " bg-emerald-100 text-emerald-800"
          )}
        >
          <Icon width={22} />
        </div>
      </div>
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-gray-500 text-sm">
          {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
        </p>
      </div>
    </div>
  );
};
