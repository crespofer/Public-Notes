"use client";
import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { CloudUpload, Paperclip } from "lucide-react";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "~/components/ui/file-upload";

import type { Course } from "@prisma/client";

const formSchema = z.object({
  noteTitle: z.string().min(1).min(5),
  noteCourse: z.string(),
  noteFile: z.any(),
});

export default function UploadNoteForm({ courses }: { courses: Course[] }) {
  const [files, setFiles] = useState<File[] | null>(null);
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: false,
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values.noteFile);
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>,
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-3xl space-y-8 py-10"
      >
        <FormField
          control={form.control}
          name="noteTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Linked Lists" type="text" {...field} />
              </FormControl>
              <FormDescription>Title of the note</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="noteCourse"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Computer Science 1" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select what course this note belongs to
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="noteFile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select File</FormLabel>
              <FormControl>
                <FileUploader
                  value={files}
                  onValueChange={(files) => {
                    setFiles(files);
                    field.onChange(files && files[0] ? files[0] : null);

                    if (fileUrl) {
                      URL.revokeObjectURL(fileUrl);
                    }

                    if (files && files[0]) {
                      const url = URL.createObjectURL(files[0]);
                      setFileUrl(url);
                    } else {
                      setFileUrl(undefined);
                    }
                  }}
                  dropzoneOptions={dropZoneConfig}
                  className="bg-background relative rounded-lg p-2"
                >
                  <FileInput
                    id="fileInput"
                    className="outline-1 outline-slate-500 outline-dashed"
                  >
                    <div className="flex w-full flex-col items-center justify-center p-8">
                      <CloudUpload className="h-10 w-10 text-gray-500" />
                      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                        &nbsp; or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG, or PDF
                      </p>
                    </div>
                  </FileInput>
                  <FileUploaderContent>
                    {files &&
                      files.length > 0 &&
                      files.map((file, i) => (
                        <FileUploaderItem key={i} index={i}>
                          <Paperclip className="h-4 w-4 stroke-current" />
                          <span>{file.name}</span>
                        </FileUploaderItem>
                      ))}
                  </FileUploaderContent>
                </FileUploader>
              </FormControl>
              <FormDescription>Select a file to upload.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {fileUrl && files && files[0] && (
          <div className="my-6 flex justify-center">
            <div className="flex h-56 w-56 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-lg">
              <img
                className="h-full w-full object-cover"
                src={fileUrl}
                alt={files[0].name}
              />
            </div>
          </div>
        )}
        <Button className="cursor-pointer" type="submit">Submit</Button>
      </form>
    </Form>
  );
}
