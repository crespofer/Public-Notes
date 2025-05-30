import UploadNoteForm from "~/components/UploadNoteForm";
import { api } from "~/trpc/server";

export default async function UploadPage() {
  const courses = await api.course.fetchCourses();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 pt-15">
      <h1 className="mb-6 text-3xl font-bold">Upload a Note</h1>
      <UploadNoteForm courses={courses}/>
    </main>
  );
}
