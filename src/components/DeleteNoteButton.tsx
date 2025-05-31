"use client";

import { api } from "~/trpc/react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DeleteNoteButton({ id }: { id: string }) {
  const router = useRouter();
  const deleteNote = api.note.deleteNote.useMutation({
    onSuccess: () => {
      console.log("Note deleted")
      router.refresh();
    },
    onError: (error) => {
      toast.error("Something went wrong, try again");
      console.error("Error deleting note:", error.data, error.message);
    }
  });

  return (
    <>
      {deleteNote.isPending ? (
        <Button variant="destructive" disabled>
          <Loader2 className="animate-spin" />
          Loading
        </Button>
      ) : (
        <Button onClick={() => {deleteNote.mutate({noteId: id})}} className="cursor-pointer mt-1" variant="destructive">
          Delete
        </Button>
      )}
    </>
  );
}
