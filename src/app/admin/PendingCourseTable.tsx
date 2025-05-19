"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog"
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "~/components/ui/button";


const ITEMS_PER_PAGE = 10;

export default function PendingCourseTable() {
  const [requestedPage, setRequestedPage] = useState(1);
  const {data: courses, isLoading, error } = api.admin.getAllPendingCourses.useQuery();

  const denyCourse = api.admin.denyCourse.useMutation({
    onSuccess: (result) => {
        toast.success(`${result.code.replace(/^([A-Z]{3})(\d{4})$/, "$1 $2")} successfully denied`);
    },
    onError: (error) => {
        toast.error("Something went wrong");
        console.error(error.message, error.data);
    },
  });

  const handleApprove = (id: string) => {
    console.log("Approved:", id);
  };

  const handleDeny = (id: string) => {
    denyCourse.mutate({courseId: id});
  };

  const paginate = <T,>(data: T[], page: number) =>
    data.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const renderPagination = (
    totalItems: number,
    currentPage: number,
    setPage: (n: number) => void,
  ) => {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    if (totalPages <= 1) return null;

    return (
      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`cursor-pointer rounded border px-3 py-1 ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-lg border border-gray-200 bg-white shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Code</th>
              <th className="px-4 py-2 text-left">Requests</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={4} className="py-4 text-center text-red-500">
                  Error loading courses
                </td>
              </tr>
            ) : courses && courses.length > 0 ? (
              paginate(courses, requestedPage).map((course) => (
                <tr key={course.id} className="border-t">
                  <td className="px-4 py-2">{course.name}</td>
                  <td className="px-4 py-2">
                    {course.code.replace(/^([A-Z]{3})(\d{4})$/, "$1 $2")}
                  </td>
                  <td className="px-4 py-2">{course.count}</td>
                  <td className="space-x-2 px-4 py-2">
                    <button
                      onClick={() => handleApprove(course.id)}
                      className="cursor-pointer rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="cursor-pointer rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600">
                          Deny
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            {`Are you sure you wan't to deny ${course.code.replace(/^([A-Z]{3})(\d{4})$/, "$1 $2")}`}
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            remove this course from pending requests.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="cursor-pointer">
                            Cancel
                          </AlertDialogCancel>
                          {denyCourse.isPending ? (
                            <Button disabled>
                              <Loader2 className="animate-spin" />
                              Loading...
                            </Button>
                          ) : (
                            <AlertDialogAction
                              onClick={() => handleDeny(course.id)}
                              className="cursor-pointer"
                            >
                              Continue
                            </AlertDialogAction>
                          )}
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-4 text-center">
                  No pending courses
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {courses &&
        renderPagination(courses.length, requestedPage, setRequestedPage)}
    </>
  );
}
