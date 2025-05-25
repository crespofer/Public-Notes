import { notFound } from "next/navigation";

export default async function CoursePage({params}: {params: { courseCode: string }}) {
  const { courseCode } = await params;
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
    </main>
  );
}