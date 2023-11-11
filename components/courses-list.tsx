import { Category, Course } from "@prisma/client";
import { CourseCard } from "./course-card";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};
interface CoursesListProps {
  items: CourseWithProgressWithCategory[];
}
export const CoursesList = ({ items }: CoursesListProps) => {
  return (
    <div className="my-10">
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            imgUrl={item.imageUrl!}
            chaptersLength={item.chapters.length}
            price={item.price!}
            progress={item.progress}
            category={item?.category?.name!}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No Course Found
        </div>
      )}
    </div>
  );
};
