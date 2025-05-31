import Link from "next/link";
import { Skeleton } from "~/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 pt-15">
      <h1 className="mb-6 text-3xl font-bold">Courses</h1>
      <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 6 }, (_, i)=> (
          <div key={i} className="overflow-hidden rounded-2xl bg-white shadow-md">
            <Skeleton className="h-40 w-full" />
            <div className="space-y-2 p-4">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-16 text-center">
        <p className="mb-4 text-lg font-medium">{"Don't see your course?"}</p>
        <Link
          href="/request-course"
          className="hover:bg-primary/90 inline-block rounded-full bg-black px-6 py-2 text-white transition"
        >
          Request a Course
        </Link>
      </div>
    </main>
  );
}
