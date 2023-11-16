"use client";

import { UserButton, auth, useAuth } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { isTeacher } from "@/lib/teacher";

export const NavbarRoutes = () => {
  const pathname = usePathname();
  const isTeacherPage = pathname?.startsWith("/dashboard/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname?.includes("/search");
  const { userId } = useAuth();

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex items-center gap-x-2 ml-auto">
        {(isTeacherPage || isCoursePage) && userId ? (
          <Link href="/">
            <Button variant="destructive">
              <LogOut className="h-4 w-4 mr-2" /> Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/dashboard/teacher/courses">
            <Button size="sm" variant="outline">
              Teacher Mode
            </Button>
          </Link>
        ) : null}
        <UserButton afterSignOutUrl="/" />
        {!userId && (
          <Button variant="ghost" className="text-red-400">
            Visitor, Log in to buy a course
          </Button>
        )}
      </div>
    </>
  );
};
