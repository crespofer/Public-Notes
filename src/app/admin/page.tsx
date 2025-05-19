import { api } from "~/trpc/server";
import ApprovedCourseTable from "./ApprovedCourseTable";
import PendingCourseTable from "./PendingCourseTable";

export default async function AdminDashboard() {

  const pendingCourses = await api.admin.getAllPendingCourses();
  const approvedCourses = await api.admin.getAllApprovedCourses();
  
  return (
    <main className="py- mx-auto max-w-6xl px-4 pt-15">
      <h1 className="mb-6 text-2xl font-bold">Admin Dashboard</h1>

      <ApprovedCourseTable courses={approvedCourses} />
      <PendingCourseTable courses={pendingCourses}/>
      
    </main>
  );
}