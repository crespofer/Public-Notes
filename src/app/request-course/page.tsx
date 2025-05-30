import RequestCourseForm from "~/components/RequestCourseForm";

export default function RequestCourses() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 pt-15">
      <h1 className="mb-6 text-3xl font-bold">Request to add a Course</h1>
      <RequestCourseForm />
    </main>
  );
}
