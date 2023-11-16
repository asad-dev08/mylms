import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import {
  Chapter,
  Course,
  PrismaClient,
  Prisma,
  UserProgress,
  Purchase,
} from "@prisma/client";
import { redirect } from "next/navigation";
import { CourseSidebarItem } from "./course-sidebar-item";
import { CourseProgress } from "@/components/course-progress";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}
export const CourseSidebar = async ({
  course,
  progressCount,
}: CourseSidebarProps) => {
  const { userId } = auth();
  //if (!userId) return redirect("/");
  const prisma = new PrismaClient();
  let purchase: Purchase | null = null;
  if (userId) {
    purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: course.id,
        },
      },
    });
  } else {
    purchase = null;
  }

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex-col border-b">
        <h1 className="font-semibold">{course.title}</h1>
        {/* Check Purchase and add progress */}
        {purchase && (
          <div className="mt-10">
            <CourseProgress variant="success" value={progressCount} />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isComplete={
              userId ? !!chapter.userProgress?.[0]?.isComplete : false
            }
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  );
};
