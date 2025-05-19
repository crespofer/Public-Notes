import { api } from "~/trpc/server";
import ApprovedCourseTable from "./ApprovedCourseTable";
import PendingCourseTable from "./PendingCourseTable";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"

export default async function AdminDashboard() {

  const approvedCourses = await api.admin.getAllApprovedCourses();
  
  return (
    <main className="py- mx-auto max-w-6xl px-4 pt-15">
      <h1 className="mb-6 text-2xl font-bold">Admin Dashboard</h1>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger className="cursor-pointer" value="pending">Pending Courses</TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="approved">ApprovedCourses</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <PendingCourseTable/>
        </TabsContent>
        <TabsContent value="approved">
          <ApprovedCourseTable courses={approvedCourses} />
        </TabsContent>
      </Tabs>

    </main>
  );
}