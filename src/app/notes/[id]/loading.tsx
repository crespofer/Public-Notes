import { Skeleton } from "~/components/ui/skeleton";

export default function NotePageSkeleton() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gray-50 p-6 pt-15">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-lg bg-white p-4 shadow-md">
        <Skeleton className="mb-4 h-8 w-2/3 mx-auto" /> 
        <div className="flex min-h-[500px] w-full items-center justify-center bg-gray-100">
          <Skeleton className="h-[80vh] w-full rounded" />
        </div>
        <div className="mt-6 flex justify-center">
          <Skeleton className="h-10 w-40 rounded" /> 
        </div>
      </div>
    </main>
  );
}