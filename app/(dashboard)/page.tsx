import { CoursesWithoutSignIn } from "@/components/courses-without-signin";
import { Button } from "@/components/ui/button";
import { SignInButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CoursesList } from "@/components/courses-list";
import { db } from "@/lib/db";
import { getCoursesForGuest } from "@/actions/get-courses-for-guest";
import { Categories } from "./_components/guest-categories";
import { SearchInput } from "@/components/guest-search-input";

interface GuestSearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}
const DashboardPage = async ({ searchParams }: GuestSearchPageProps) => {
  const { userId } = auth();
  if (userId) return redirect("/dashboard");
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  const courses = await getCoursesForGuest({
    ...searchParams,
  });
  return (
    <div>
      <div className="w-full h-[80px] fixed bg-slate-100 shadow-md px-8 flex items-center justify-between z-[99]">
        <h1 className="font-bold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-600">
          Learning Management
        </h1>
        <div className="flex items-center gap-4">
          <SignInButton>
            <Button>Login</Button>
          </SignInButton>
          <Link href="/sign-up">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </div>
      <div className="pt-[90px] p-6 min-h-[calc(100vh-50px)]">
        <div className="block pb-6">
          <SearchInput />
        </div>
        <Categories items={categories} />

        <CoursesList items={courses} />
      </div>

      <div className="w-full bg-slate-900 text-white py-6 px-8">
        &copy;Copyright | {new Date().getFullYear()}, Asadullah Sarker
        {/* SoftShore Technology */}
      </div>
    </div>
  );
};
export default DashboardPage;
