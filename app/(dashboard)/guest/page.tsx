import { CoursesWithoutSignIn } from "@/components/courses-without-signin";
import { NavbarWithoutSignIn } from "@/components/navbar-without-signin";

const GuestPage = () => {
  return (
    <div>
      <NavbarWithoutSignIn />
      <CoursesWithoutSignIn />
    </div>
  );
};
export default GuestPage;
