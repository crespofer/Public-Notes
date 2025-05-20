"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

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
import type { Course } from "@prisma/client";
import { api } from "~/trpc/react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  courseName: z.string().min(1).min(10).max(60),
  courseUrl: z.string().min(1),
  coursePrefix: z.string().min(1).min(3).max(3),
  courseCode: z.string().min(1).min(4).max(4),
});

interface ApproveButtonProps {
    course: Course;
    refetch: () => void;
}


export default function ApproveButton({course, refetch}: ApproveButtonProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        courseName: course.name,
        coursePrefix: course.code.slice(0, 3),
        courseCode: course.code.slice(3),
    }
  });

  const approveCourse = api.admin.approveCourse.useMutation({
    onSuccess: (result) => {
        toast.success(`${result.code} successfully approved!`);
        refetch();
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
            courseUrl: "",
        })
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const capitalPrefix = values.coursePrefix.toUpperCase();
    approveCourse.mutate({
        courseId: course.id,
        courseName: values.courseName,
        coursePrefix: values.coursePrefix,
        courseCode: values.courseCode,
        courseUrl: values.courseUrl,
    });


  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="cursor-pointer rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600">
          Approve
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Approve Course</DialogTitle>
          <DialogDescription>
            Make any changes to the course here and add an image url.
          </DialogDescription>
        </DialogHeader>
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
                    <Input placeholder="" type="text" {...field} />
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
                        <Input placeholder="" type="text" {...field} />
                      </FormControl>

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
                        <Input placeholder="" type="text" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <DialogClose asChild>
                <Button type="button" className="cursor-pointer">
                  Close
                </Button>
              </DialogClose>
              {approveCourse.isPending ? (
            <Button disabled>
              <Loader2 className="animate-spin" />
              Loading
            </Button>
              ) : (
              <Button className="cursor-pointer" type="submit">
                Submit
              </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
