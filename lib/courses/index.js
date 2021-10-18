import axios from 'axios'

export const useGetCourses = async () => {
  try {
    const { data: courses } = await axios.get(
      `${process.env.NEXT_PUBLIC_api}/courses`
    )
    return courses
  } catch (err) {
    console.log('useGetCourses ERROR ', err)
  }
}

export const useCreateCourse = async (course) => {
  try {
    return await axios.post(`${process.env.NEXT_PUBLIC_api}/courses`, course)
  } catch (err) {
    console.log('useCreateCourse ERROR ', err)
  }
}

export const useUpdateCourse = async (course) => {
  try {
    const updatedCourse = await axios.put(
      `${process.env.NEXT_PUBLIC_api}/courses/${course.id}`,
      course
    )

    return updatedCourse
  } catch (err) {
    console.log('useUpdateCourse ERROR ', err)
  }
}

export const useDeleteCourse = async (course) => {
  try {
    const deletedCourse = await axios.delete(
      `${process.env.NEXT_PUBLIC_api}/courses/${course.id}`
    )
    return deletedCourse
  } catch (err) {
    console.log('useDeleteCourse ERROR ', err)
  }
}
