import Link from "next/link";

type CourseCardProps = {
  name: string;
  code: string;
  imageUrl: string | null;
};

export default function CourseCard({ name, code, imageUrl }: CourseCardProps) {
  return (
    <Link href={`/courses/${code}`} >
      <div className="cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md">
        <img
          src={imageUrl ?? ""}
          alt={name}
          className="h-40 w-full object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-gray-500">{code}</p>
        </div>
      </div>
    </Link>
  );
}
