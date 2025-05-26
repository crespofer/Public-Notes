import { notFound } from "next/navigation";
import NoteCard from "~/components/NoteCard";

type paramsType = Promise<{courseCode: string}>;

export default async function CoursePage(props: { params: paramsType}) {
  const { courseCode } = await props.params;
  const isValid = /^[A-Z]{3}\d{4}$/.test(courseCode);

  if (!isValid) {
    notFound();
  }

  // const notes = trpc
  // if(!notes) notFound()
  // if notes.length < 0

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 pt-15">
      <h1 className="mb-6 text-3xl font-bold">{courseCode}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <NoteCard id="1" title="Lecture 1" createdAt=""/>
      <NoteCard id="1" title="Lecture 1" createdAt=""/>
      <NoteCard id="1" title="Lecture 1" createdAt=""/>
      <NoteCard id="1" title="Lecture 1" createdAt=""/>

      </div>
    </main>
  );
}