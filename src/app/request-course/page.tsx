import { redirect } from "next/navigation";
import RequestCourseForm from "~/components/RequestCourseForm";
import { auth } from "~/server/auth";

export default async function RequestCourses() {
  const session = await auth();

  if(!session) {
    redirect("/api/auth/signin");
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 pt-15">
      <h1 className="mb-6 text-3xl font-bold">Request to add a Course</h1>
      <RequestCourseForm />
    </main>
  );
}
