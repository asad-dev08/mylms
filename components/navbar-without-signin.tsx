import { SignInButton, SignUpButton, auth } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

export const NavbarWithoutSignIn = () => {
  const { userId } = auth();
  if (!userId) return redirect("/");
  if (userId) return redirect("/dashboard");
  return (
    <div className="w-full h-[80px] fixed bg-slate-100 shadow-md px-8 flex items-center justify-between">
      <h1 className="font-bold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-600">
        Learning Management
      </h1>
      <div className="flex items-center gap-4">
        <Link href="sign-in">
          <Button>Login</Button>
        </Link>
        <Link href="/sign-up">
          <Button>Sign Up</Button>
        </Link>
      </div>
    </div>
  );
};
