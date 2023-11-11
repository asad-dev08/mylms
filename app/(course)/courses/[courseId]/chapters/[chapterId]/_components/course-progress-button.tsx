"use client";

import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/react-confetti-store";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseProgressButtonProps {
  chapterId: string;
  courseId: string;
  nextChapterId?: string;
  isComplete?: boolean;
}

export const CourseProgressButton = ({
  chapterId,
  courseId,
  nextChapterId,
  isComplete,
}: CourseProgressButtonProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        { isComplete: !isComplete }
      );
      if (!isComplete && !nextChapterId) {
        confetti.onOpen();
      }
      if (!isComplete && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }
      toast.success("Progress Update!");
      router.refresh();
    } catch (error) {
      toast.error("Someting went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  const Icon = isComplete ? XCircle : CheckCircle;
  return (
    <Button
      type="button"
      variant={isComplete ? "outline" : "success"}
      className="w-full md:w-auto"
      onClick={onClick}
    >
      {isComplete ? "Not Completed" : "Mark as Complete"}
      <Icon className="h-4 w-4 ml-2" />
    </Button>
  );
};
