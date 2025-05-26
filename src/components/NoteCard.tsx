import Image from "next/image";
import Link from "next/link";
import blurredNote from "../../public/blurredNote.png"
//import { format } from "date-fns";

type NoteCardProps = {
  id: string;
  title: string;
  createdAt: string;
};

export default function NoteCard({ id, title, createdAt }: NoteCardProps) {
  return (
    <Link href={`/notes/${id}`} className="block group">
      <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow hover:shadow-md transition-shadow duration-200">
        <div className="relative h-48 w-full bg-gray-100">
          <Image
            src={blurredNote}
            alt={`Preview of ${title}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
          />
        </div>
        <div className="p-4">
          <h2 className="text-md font-semibold text-gray-900 truncate">{title}</h2>
          <p className="text-sm text-gray-500 mt-1">{"May 4, 2025, MMM d, yyyy"}</p>
          {/* <p className="text-sm text-gray-500 mt-1">{format(new Date(createdAt), "MMM d, yyyy")}</p> */}
        </div>
      </div>
    </Link>
  );
}
