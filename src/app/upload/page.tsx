import UploadNoteForm from "~/components/UploadNoteForm";

export default function UploadPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 pt-15">
      <h1 className="mb-6 text-3xl font-bold">Upload a Note</h1>
      <UploadNoteForm />
    </main>
  );
}
