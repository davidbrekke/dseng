import Link from 'next/link'

export default function CourseCard({ course }) {
  return (
    <Link href={`/courses/${course.code}`}>
      <div className="p-5 rounded-lg shadow flex flex-col space-y-3 bg-white font-bold cursor-pointer hover:shadow-xl transition">
        <h1 className="text-2xl text-gray-800">{course.title}</h1>
        <div className="flex w-full justify-around space-x-1 items-center">
          <h2 className="text-xl text-gray-700">{course.code}</h2>
          <h3 className="text-lg text-red-800">{course.credits} credits</h3>
        </div>
      </div>
    </Link>
  )
}
