import axios from 'axios'

export const useGetTerms = async () => {
  try {
    const { data: terms } = await axios.get(
      `${process.env.NEXT_PUBLIC_api}/terms`
    )
    return terms
  } catch (err) {
    console.log('useGetTerms ERROR ', err)
  }
}

export const useCreateTerm = async (term) => {
  try {
    return await axios.post(`${process.env.NEXT_PUBLIC_api}/terms`, term)
  } catch (err) {
    console.log('useCreateTerm ERROR ', err)
  }
}

// export const useUpdateTerm = async (course) => {
//   try {
//     const updatedCourse = await axios.put(
//       `${process.env.NEXT_PUBLIC_api}/courses/${course.id}`,
//       course
//     )

//     return updatedCourse
//   } catch (err) {
//     console.log('useUpdateCourse ERROR ', err)
//   }
// }

// export const useDeleteTerm = async (course) => {
//   try {
//     const deletedCourse = await axios.delete(
//       `${process.env.NEXT_PUBLIC_api}/courses/${course.id}`
//     )
//     return deletedCourse
//   } catch (err) {
//     console.log('useDeleteCourse ERROR ', err)
//   }
// }
