import Image from "next/image";
import Link from "next/link";
import blurredNote from "../../public/blurredNote.png";
import DeleteNoteButton from "./DeleteNoteButton";

type NoteCardProps = {
  id: string;
  title: string;
  createdAt: Date;
  showDelete?: boolean;
  fileType: string;
  url: string;
};

export default function NoteCard({ id, title, createdAt, showDelete, fileType, url }: NoteCardProps) {
  return (
    <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow hover:shadow-md transition-shadow duration-200">
      <Link href={`/notes/${id}`} className="block group">
        <div className="relative h-48 w-full bg-gray-100">
          {fileType === "application/pdf" ? (
                      <Image
            src={blurredNote}
            alt={`Preview of ${title}`}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover group-hover:scale-105 transition-transform"
          />
          ) : (
          <Image
            src={url}
            alt={`Preview of ${title}`}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover group-hover:scale-105 transition-transform"
          />
          )}
        </div>
        <div className="p-4">
          <h2 className="text-md font-semibold text-gray-900 truncate">{title}</h2>
          <p className="text-sm text-gray-500 mt-1">{createdAt.toLocaleDateString()}</p>
        </div>
      </Link>
      {showDelete && (
        <div className="px-4 pb-4">
          <DeleteNoteButton id={id} />
        </div>
      )}
    </div>
  );
}