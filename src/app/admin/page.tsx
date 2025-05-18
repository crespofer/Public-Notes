"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

type Course = {
  id: string;
  name: string;
  code: string;
};

type RequestedCourse = Course & {
  requestCount: number;
};

const ITEMS_PER_PAGE = 10;

// Sample data

const approvedCourses: Course[] = Array.from({ length: 18 }, (_, i) => ({
  id: `app-${i}`,
  name: `Approved Course ${i + 1}`,
  code: `APP${200 + i}`,
}));

export default function AdminDashboard() {
  const [tab, setTab] = useState<"requested" | "approved">("requested");
  const [requestedPage, setRequestedPage] = useState(1);
  const [approvedPage, setApprovedPage] = useState(1);

  const {
    data: approvedCourses,
    isLoading: approvedCoursesLoading, 
    error: approvedCourseserror, 
    refetch: refetchApprovedCourses
    } = api.admin.getAllApprovedCourses.useQuery();
  const {
    data: pendingCourses, 
    isLoading: pendingCoursesLoading, 
    error: pendingCourseserror, 
    refetch: refetchPendingCourses
    } = api.admin.getAllPendingCourses.useQuery();

  const handleApprove = (id: string) => {
    console.log("Approved:", id);
  };

  const handleDeny = (id: string) => {
    console.log("Denied:", id);
  };

  const handleEdit = (id: string) => {
    console.log("Edit:", id);
  };

  const paginate = <T,>(data: T[], page: number) =>
    data.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const renderPagination = (totalItems: number, currentPage: number, setPage: (n: number) => void) => {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`cursor-pointer px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    );
  };

  return (
    <main className="py- mx-auto max-w-6xl px-4 pt-15">
      <h1 className="mb-6 text-2xl font-bold">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => setTab("requested")}
          className={`cursor-pointer rounded px-4 py-2 ${
            tab === "requested" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Requested Courses
        </button>
        <button
          onClick={() => setTab("approved")}
          className={`cursor-pointer rounded px-4 py-2 ${
            tab === "approved" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Approved Courses
        </button>
      </div>

      {/* Requested Courses */}
      {tab === "requested" && (
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
                {pendingCoursesLoading ? (
                  <tr>
                    <td colSpan={4} className="py-4 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : pendingCourseserror ? (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-red-500">
                      Error loading courses
                    </td>
                  </tr>
                ) : pendingCourses && pendingCourses.length > 0 ? (
                  paginate(pendingCourses, requestedPage).map((course) => (
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
                        <button
                          onClick={() => handleDeny(course.id)}
                          className="cursor-pointer rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                        >
                          Deny
                        </button>
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
          {pendingCourses &&
            renderPagination(
              pendingCourses.length,
              requestedPage,
              setRequestedPage,
            )}
        </>
      )}

      {/* Approved Courses */}
      {tab === "approved" && (
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
                {approvedCoursesLoading ? (
                  <tr>
                    <td colSpan={4} className="py-4 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : approvedCourseserror ? (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-red-500">
                      Error loading courses
                    </td>
                  </tr>
                ) : approvedCourses && approvedCourses.length > 0 ? (
                  paginate(approvedCourses, approvedPage).map((course) => (
                    <tr key={course.id} className="border-t">
                      <td className="px-4 py-2">{course.name}</td>
                      <td className="px-4 py-2">{course.code.replace(/^([A-Z]{3})(\d{4})$/, "$1 $2")}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleEdit(course.id)}
                          className="cursor-pointer rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                        >
                          Edit
                        </button>
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
          {approvedCourses &&
            renderPagination(
              approvedCourses.length,
              approvedPage,
              setApprovedPage,
            )}
        </>
      )}
    </main>
  );
}
