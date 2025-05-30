"use client";

import { useState } from "react";
import EditButton from "~/components/EditButton";
import { api } from "~/trpc/react";

const ITEMS_PER_PAGE = 10;

export default function ApprovedCourseTable() {
  const [approvedPage, setApprovedPage] = useState(1);

  const {data: courses, isLoading, error, refetch } = api.admin.getAllApprovedCourses.useQuery();

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
              paginate(courses, approvedPage).map((course) => (
                <tr key={course.id} className="border-t">
                  <td className="px-4 py-2">{course.name}</td>
                  <td className="px-4 py-2">
                    {course.code.replace(/^([A-Z]{3})(\d{4})$/, "$1 $2")}
                  </td>
                  <td className="px-4 py-2">
                    <EditButton course={course} refetch={refetch} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-4 text-center">
                  No Approved Courses
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {courses &&
        renderPagination(courses.length, approvedPage, setApprovedPage)}
    </>
  );
}