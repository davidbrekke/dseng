import Link from 'next/link'
import { ExclamationCircleIcon } from '@heroicons/react/solid'

export default function CourseCard({ course }) {
  return (
    <Link href={`/courses/${course.code}`} passHref>
      <div className="p-5 rounded-lg shadow flex flex-col space-y-3 bg-white items-center font-bold cursor-pointer hover:shadow-xl transition">
        <h1 className="text-2xl text-gray-800">{course.title}</h1>
        <div className="flex w-full justify-around space-x-1 items-center">
          <h2 className="text-xl text-gray-700">{course.code}</h2>
          {course.required && (
            <ExclamationCircleIcon width={30} className="text-green-700" />
          )}
        </div>

        <h3 className="text-lg text-red-800">{course.credits} credits</h3>
      </div>
    </Link>
  )
}
