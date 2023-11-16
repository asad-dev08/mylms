"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
interface CourseEnrollButtonProps {
  userId: string | null;
  price: number;
  courseId: string;
}
export const CourseEnrollButton = ({
  userId,
  price,
  courseId,
}: CourseEnrollButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    if (!userId) {
      toast.error("Please Log in to purchase a course!");
      router.push("/sign-in");
      return null;
    }
    try {
      setIsLoading(true);
      const res = await axios.post(`/api/courses/${courseId}/checkout`);
      window.location.assign(res.data.url);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      className="w-full md:w-auto"
      size="sm"
      onClick={onClick}
      disabled={isLoading}
    >
      Enroll for {formatPrice(price)}
    </Button>
  );
};
