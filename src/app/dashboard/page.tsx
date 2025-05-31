import { redirect } from "next/navigation";
import NoteCard from "~/components/NoteCard";
import { auth } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Dashboard() {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }

  const notes = await api.note.getUserNotes();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 pt-15">
      <h1 className="mb-6 text-3xl font-bold">{`${session.user.name}'s Dashboard`}</h1>
      {notes.length === 0 ? (
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
          <span className="text-lg font-medium">
            You haven't uploaded any notes yet.
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {notes.map((note) => (
            <NoteCard
              id={note.id}
              key={note.id}
              title={note.Title}
              createdAt={note.createdAt}
              showDelete={true}
              fileType={note.fileType}
              url={note.url}
            />
          ))}
        </div>
      )}
    </main>
  );
}
