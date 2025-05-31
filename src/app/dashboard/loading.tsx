import { Skeleton } from "~/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 pt-15">
      <h1 className="mb-6 text-3xl font-bold"></h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow">
            <div className="relative h-48 w-full bg-gray-100">
              <Skeleton className="h-full w-full" />
            </div>
            <div className="p-4">
              <Skeleton className="mb-2 h-6 w-3/4" />
              <Skeleton className="mb-4 h-4 w-1/3" />
              <Skeleton className="h-8 w-20" /> 
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}