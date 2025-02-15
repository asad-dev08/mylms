import { db } from "@/lib/db";
import { Categories } from "./categories";
import { SearchInput } from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CoursesList } from "@/components/courses-list";

interface GuestSearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const GuestSearchPage = async ({ searchParams }: GuestSearchPageProps) => {
  const { userId } = auth();
  if (!userId) return redirect("/");
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  const courses = await getCourses({
    userId,
    ...searchParams,
  });
  return (
    <>
      <div className="block px-6 pt-6 md:!hidden md:mb-0 ">
        <SearchInput />
      </div>
      <div className="p-6">
        <Categories items={categories} />

        <CoursesList items={courses} />
      </div>
    </>
  );
};
export default GuestSearchPage;
