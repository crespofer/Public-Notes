import Image from "next/image";

type CourseCardProps = {
    name: string;
    code: string;
    imageUrl: string;
  };
  
  export default function CourseCard({ name, code, imageUrl }: CourseCardProps) {
    return (
      <div className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer">
        <Image src={imageUrl} alt={name} className="w-full h-40 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-gray-500">{code}</p>
        </div>
      </div>
    );
  }
  