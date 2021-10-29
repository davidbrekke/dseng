import { useMutation, useQuery } from 'react-query'

import { useGetCourses } from '@lib/courses'
import Course from './Course'

const CourseList = () => {
  const {
    data: courses,
    isLoading,
    isError,
    error,
  } = useQuery('courses', useGetCourses)
  return (
    <div className="w-1/3 h-full   mx-6 py-1 px-2 rounded-lg bg-gray-100 overflow-scroll">
      <header className="mt-2 mx-2 py-1 px-2 bg-gray-200 rounded-lg flex justify-around items-center text-2xl text-gray-800">
        <h1 className="text-2xl">courses</h1>
        <div className="flex space-x-3">
          <span className="text-xs py-1 px-2 rounded bg-purple-400">
            required
          </span>
          <span className="text-xs py-1 px-2 rounded bg-green-400">
            elective
          </span>
        </div>
      </header>
      <div className="flex flex-row flex-wrap p-2 items-center justify-center">
        {isLoading && 'loading courses'}
        {isError && `courses error: ${error.message}`}
        {courses &&
          courses.map((course) => <Course key={course.id} course={course} />)}
      </div>
    </div>
  )
}

export default CourseList
