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
import { useState } from "react";

const formSchema = z.object({
  courseName: z.string().min(1).min(10).max(60),
  courseUrl: z.string().min(1),
  coursePrefix: z.string().min(1).min(3).max(3),
  courseCode: z.string().min(1).min(4).max(4),
});

interface EditButtonProps {
  course: Course;
  refetch: () => void;
}

export default function EditButton({ course, refetch }: EditButtonProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseName: course.name,
      coursePrefix: course.code.slice(0, 3),
      courseCode: course.code.slice(3),
      courseUrl: course.url ? course.url : undefined,
    },
  });

  const editCourse = api.admin.editCourse.useMutation({
    onSuccess: (result) => {
      if (result.succes) {
        toast.success(`${result.updatedCourse?.code} successfully edited`);
        refetch();
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
        courseCode: "",
        coursePrefix: "",
        courseUrl: "",
      });
      setOpen(false);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const capitalPrefix = values.coursePrefix.toUpperCase();
    editCourse.mutate({
      id: course.id,
      name: values.courseName,
      prefix: capitalPrefix,
      code: values.courseCode,
      url: values.courseUrl,
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button onClick={() => {setOpen(true)}} className="cursor-pointer rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600">
          Edit
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Course</DialogTitle>
          <DialogDescription>
            Make any changes to the course here.
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
              {editCourse.isPending ? (
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
