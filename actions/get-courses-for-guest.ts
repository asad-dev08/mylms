import { db } from "@/lib/db";
import { Course, Category } from "@prisma/client";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

type GetCourses = {
  title?: string;
  categoryId?: string;
};

export const getCoursesForGuest = async ({
  title,
  categoryId,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    let courses: any[];
    if (categoryId) {
      courses = await db.course.findMany({
        where: {
          isPublished: true,
          title: {
            contains: title,
          },
          categoryId,
        },
        include: {
          category: true,
          chapters: {
            where: {
              isPublished: true,
            },
            select: {
              id: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      courses = await db.course.findMany({
        where: {
          isPublished: true,
          title: {
            contains: title,
          },
        },
        include: {
          category: true,
          chapters: {
            where: {
              isPublished: true,
            },
            select: {
              id: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }
    const coursesWithProgress: CourseWithProgressWithCategory[] =
      await Promise.all(
        courses.map(async (course) => {
          const progressPercentage = null;
          return {
            ...course,
            progress: progressPercentage,
          };
        })
      );
    return coursesWithProgress;
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return [];
  }
};
