import { notFound } from "next/navigation";

export default async function CoursePage({ params }: {params: {courseCode: string} }) {

    return (
        <div className="pt-15">{params.courseCode}</div>
    );
}