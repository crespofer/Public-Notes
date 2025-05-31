import { notFound, redirect } from "next/navigation";
import NoteCard from "~/components/NoteCard";
import { auth } from "~/server/auth";
import { api } from "~/trpc/server";

type paramsType = Promise<{ courseCode: string }>;

export default async function CoursePage(props: { params: paramsType }) {
  const { courseCode } = await props.params;
  const isValid = /^[A-Z]{3}\d{4}$/.test(courseCode);

  if (!isValid) {
    notFound();
  }

  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }

  const course = await api.note.getNotesByCourse({ code: courseCode });
  if (!course) {
    notFound();
  }

return (
  <main className="mx-auto max-w-7xl px-4 py-8 pt-15">
    <h1 className="mb-6 text-3xl font-bold">{course.name}</h1>
    {course.notes.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <svg
          className="mb-4 h-16 w-16 text-gray-300"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 17v.01M12 13v.01M12 9v.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
          />
        </svg>
        <span className="text-lg font-medium">No notes have been uploaded for this course yet.</span>
      </div>
    ) : (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {course.notes.map((note) => (
          <NoteCard
            id={note.id}
            title={note.Title}
            createdAt={note.createdAt}
            key={note.id}
          />
        ))}
      </div>
    )}
  </main>
);
}
