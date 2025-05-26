import Link from "next/link";
import CourseCard from "~/components/ui/CourseCard";
import { api } from "~/trpc/server";

export default async function CoursesPage() {
  const courses = await api.course.fetchCourses();

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 pt-15">
      <h1 className="text-3xl font-bold mb-6">Courses</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {courses.map((course) => (
          <CourseCard
            key={course.code}
            name={course.name}
            code={course.code}
            imageUrl={course.url}
          />
        ))}
      </div>

      <div className="text-center mt-16">
        <p className="text-lg font-medium mb-4">{"Don't see your course?"}</p>
        <Link href="/request-course" className="inline-block bg-black text-white px-6 py-2 rounded-full hover:bg-primary/90 transition">
            Request a Course
        </Link>
      </div>
    </main>
  );
}
