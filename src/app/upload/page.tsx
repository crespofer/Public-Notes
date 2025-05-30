import { redirect } from "next/navigation";
import UploadNoteForm from "~/components/UploadNoteForm";
import { auth } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function UploadPage() {
  const session = await auth();
  if(!session) {
    redirect("/api/auth/signin");
  }
  
  const courses = await api.course.fetchCourses();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 pt-15">
      <h1 className="mb-6 text-3xl font-bold">Upload a Note</h1>
      <UploadNoteForm courses={courses}/>
    </main>
  );
}
