"use client";

import { toast } from "sonner";
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
import { api } from "~/trpc/react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  courseName: z.string().min(1).min(10).max(60),
  courseUrl: z.string().min(1),
  coursePrefix: z.string().min(1).min(3).max(3),
  courseCode: z.string().min(1).min(4).max(4),
});

export default function AdminCreateCourseForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const createCourse = api.admin.createCourse.useMutation({
    onSuccess: (result) => {
      if (result.success) {
        toast.success(`${result.createdCourse?.code} successfully created!`);
      } else {
        toast.error(result.message);
      }
    },
    onError: (error) => {
      toast.error("Something went wrong");
      console.error(error.message, error.data);
    },
    onSettled: () => {
      form.reset({
        courseName: "",
        coursePrefix: "",
        courseCode: "",
        courseUrl: "",
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const capitalPrefix = values.coursePrefix.toUpperCase();
    createCourse.mutate({
      name: values.courseName,
      prefix: capitalPrefix,
      code: values.courseCode,
      url: values.courseUrl,
    });
  }

  return (
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

        <FormField
          control={form.control}
          name="courseUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="" type="text" {...field} />
              </FormControl>
              <FormDescription>
                An image url to display for the course
              </FormDescription>
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
      </form>
    </Form>
  );
}
