"use client";
import { cn } from "@/lib/utils";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface CourseSidebarItemProps {
  label: string;
  id: string;
  isComplete: boolean;
  courseId: string;
  isLocked: boolean;
}
export const CourseSidebarItem = ({
  label,
  id,
  isComplete,
  courseId,
  isLocked,
}: CourseSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = isLocked ? Lock : isComplete ? CheckCircle : PlayCircle;
  const isActive = pathname?.includes(id);
  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive &&
          "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
        isComplete && "text-emerald-700 hover:text-emerald-700",
        isComplete && isActive && "bg-emerald-200/20"
      )}
    >
      <div className="flex items-center justify-start gap-x-2 py-4">
        <Icon
          size={20}
          className={cn(
            "text-slate-500",
            isActive && "text-slate-700",
            isComplete && "text-emerald-700"
          )}
        />
        <span className="text-left">{label}</span>
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-blue-700 h-full transition-all",
          isActive && "opacity-100",
          isComplete && "border-emerald-700"
        )}
      />
    </button>
  );
};
