import { CoursesWithoutSignIn } from "@/components/courses-without-signin";
import { NavbarWithoutSignIn } from "@/components/navbar-without-signin";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const GuestLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default GuestLayout;
