"use client";

import { useState } from "react";

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
const requestedCourses: RequestedCourse[] = Array.from({ length: 23 }, (_, i) => ({
  id: `req-${i}`,
  name: `Requested Course ${i + 1}`,
  code: `REQ${100 + i}`,
  requestCount: Math.floor(Math.random() * 10) + 1,
}));

const approvedCourses: Course[] = Array.from({ length: 18 }, (_, i) => ({
  id: `app-${i}`,
  name: `Approved Course ${i + 1}`,
  code: `APP${200 + i}`,
}));

export default function AdminDashboard() {
  const [tab, setTab] = useState<"requested" | "approved">("requested");
  const [requestedPage, setRequestedPage] = useState(1);
  const [approvedPage, setApprovedPage] = useState(1);

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
    <main className="max-w-6xl mx-auto px-4 py- pt-15">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => setTab("requested")}
          className={`cursor-pointer px-4 py-2 rounded ${
            tab === "requested" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Requested Courses
        </button>
        <button
          onClick={() => setTab("approved")}
          className={`cursor-pointer px-4 py-2 rounded ${
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
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-2">Name</th>
                  <th className="text-left px-4 py-2">Code</th>
                  <th className="text-left px-4 py-2">Requests</th>
                  <th className="text-left px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginate(requestedCourses, requestedPage).map((course) => (
                  <tr key={course.id} className="border-t">
                    <td className="px-4 py-2">{course.name}</td>
                    <td className="px-4 py-2">{course.code}</td>
                    <td className="px-4 py-2">{course.requestCount}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => handleApprove(course.id)}
                        className="cursor-pointer bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleDeny(course.id)}
                        className="cursor-pointer bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Deny
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {renderPagination(requestedCourses.length, requestedPage, setRequestedPage)}
        </>
      )}

      {/* Approved Courses */}
      {tab === "approved" && (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-2">Name</th>
                  <th className="text-left px-4 py-2">Code</th>
                  <th className="text-left px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginate(approvedCourses, approvedPage).map((course) => (
                  <tr key={course.id} className="border-t">
                    <td className="px-4 py-2">{course.name}</td>
                    <td className="px-4 py-2">{course.code}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleEdit(course.id)}
                        className="cursor-pointer bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {renderPagination(approvedCourses.length, approvedPage, setApprovedPage)}
        </>
      )}
    </main>
  );
}
