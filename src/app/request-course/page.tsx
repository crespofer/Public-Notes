"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner"

import { api } from "~/trpc/react";
import { useState } from "react";

const formSchema = z.object({
  courseName: z.string().min(1).min(10).max(60),
  coursePrefix: z.string().min(1).min(3).max(3),
  courseCode: z.string().min(1).min(4).max(4),
});

export default function RequestCourses() {
  const [message, setMessage] = useState<null | String>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const createCourse = api.course.requestCourse.useMutation({
    onSuccess: (result) => {
      if (result.message) {
        setMessage(result.message);
      } else if (result.newCourse) {
        toast.success(`${result.newCourse.code} successfully requested`)
      }
    },
    onError: (error) => {
      toast.error("Something went wrong");
      console.error(error.message, error.data);
    },
    onSettled: () => {
      form.reset({
      courseName: "",
      courseCode: "",
      coursePrefix: "",
    })}
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const capitalPrefix = values.coursePrefix.toUpperCase();
    createCourse.mutate({
      name: values.courseName,
      prefix: capitalPrefix,
      code: values.courseCode,
    });
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 pt-15">
      <h1 className="mb-6 text-3xl font-bold">Request to add a Course</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto max-w-3xl space-y-8 py-10"
        >
          <FormField
            control={form.control}
            name="courseName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Computer Science 1"
                    type="text"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="coursePrefix"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Prefix</FormLabel>
                    <FormControl>
                      <Input placeholder="COP" type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      This should be the three letters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-6">
              <FormField
                control={form.control}
                name="courseCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Code</FormLabel>
                    <FormControl>
                      <Input placeholder="3502" type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      This should be the numbers following the course prefix
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {createCourse.isPending ? (
            <Button disabled>
              <Loader2 className="animate-spin" />
              Loading
            </Button>
          ) : (
            <Button className="cursor-pointer" type="submit">
              Submit
            </Button>
          )}
          {message && <p className="text-red-600">{message}</p>}
        </form>
      </Form>
    </main>
  );
}
