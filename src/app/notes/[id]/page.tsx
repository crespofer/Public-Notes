import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { api } from "~/trpc/server";

type paramsType = Promise<{ id: string }>;

export default async function Note(props: { params: paramsType }) {
  const { id } = await props.params;
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const note = await api.note.getNoteById({ id: id });
  if (!note) {
    notFound();
  }

  const isImage = note.fileType.startsWith("image/");

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gray-50 p-6 pt-15">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-lg bg-white p-4 shadow-md">
        <h1 className="mb-4 text-center text-2xl font-semibold">
          {note.Title}
        </h1>

        <div className="flex min-h-[500px] w-full items-center justify-center bg-gray-100">
          {isImage ? (
            <div className="relative h-[80vh] w-full">
              <Image
                src={note.url}
                alt={note.Title}
                fill
                className="rounded object-contain"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
            </div>
          ) : (
            <iframe
              src={note.url}
              className="h-[80vh] w-full rounded border"
              allow="fullscreen"
            />
          )}
        </div>

        <div className="mt-6 flex justify-center">
          <a
            href={note.url}
            download={note.Title}
            rel="noopener noreferrer"
            className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            Download Note
          </a>
        </div>
      </div>
    </main>
  );
}