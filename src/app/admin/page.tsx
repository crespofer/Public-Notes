import AdminCreateCourseForm from "~/components/AdminCreateCourseForm";
import ApprovedCourseTable from "./ApprovedCourseTable";
import PendingCourseTable from "./PendingCourseTable";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"

export default function AdminDashboard() {
  
  return (
    <main className="py- mx-auto max-w-6xl px-4 pt-15">
      <h1 className="mb-6 text-2xl font-bold">Admin Dashboard</h1>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger className="cursor-pointer" value="pending">Pending Courses</TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="approved">Approved Courses</TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="create">Create Course</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <PendingCourseTable/>
        </TabsContent>
        <TabsContent value="approved">
          <ApprovedCourseTable />
        </TabsContent>
        <TabsContent value="create">
          <AdminCreateCourseForm />
        </TabsContent>
      </Tabs>

    </main>
  );
}