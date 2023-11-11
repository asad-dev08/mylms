import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import ImageForm from "./_components/image-form";
import CategoryForm from "./_components/category-form";
import PriceForm from "./_components/price-form";
import AttachmentForm from "./_components/attachment-form";
import ChaptersForm from "./_components/chapters-form";
import { Actions } from "./_components/actions";
import { Banner } from "@/components/banner";

const CourseIdPage = async ({ params }: { params: { courseId: String } }) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: { id: params.courseId.toString(), userId },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: { orderBy: { createdAt: "desc" } },
    },
  });
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  if (!course) {
    return redirect("/");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapters.some((ch) => ch.isPublished),
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!course.isPublished && (
        <Banner
          variant="warning"
          label="This course is not published yet. This course will be invisible to the students/viewers"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl text-black font-medium">Course Setup</h1>
            <span className="text-xs text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            courseId={params.courseId}
            isPublished={course.isPublished}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-16 items-start">
          <div>
            <div className="flex items-center gap-x-2">
              <div className="rounded-full h-12 w-12 p-2 bg-sky-100 text-sky-800 flex items-center justify-center">
                <LayoutDashboard width={22} />
              </div>
              <h2 className="text-xl">Customize your course</h2>
            </div>
            <TitleForm initialData={course} courseId={course.id} />
            <DescriptionForm initialData={course} courseId={course.id} />
            <ImageForm initialData={course} courseId={course.id} />
            <CategoryForm
              initialData={course}
              courseId={course.id}
              options={categories.map((cat) => ({
                label: cat.name,
                value: cat.id,
              }))}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <div className="rounded-full h-12 w-12 p-2 bg-sky-100 text-sky-800 flex items-center justify-center">
                  <ListChecks width={22} />
                </div>
                <h2 className="text-xl">Course Lectures</h2>
              </div>
              <ChaptersForm initialData={course} courseId={course.id} />
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-x-2">
                  <div className="rounded-full h-12 w-12 p-2 bg-sky-100 text-sky-800 flex items-center justify-center">
                    <CircleDollarSign width={22} />
                  </div>
                  <h2 className="text-xl">Cource price</h2>
                </div>
                <PriceForm initialData={course} courseId={course.id} />
              </div>
              <div>
                <div className="flex items-center gap-x-2">
                  <div className="rounded-full h-12 w-12 p-2 bg-sky-100 text-sky-800 flex items-center justify-center">
                    <File width={22} />
                  </div>
                  <h2 className="text-xl">Files And Attachments</h2>
                </div>
                <AttachmentForm initialData={course} courseId={course.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CourseIdPage;
