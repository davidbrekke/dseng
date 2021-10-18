import { prisma } from '@lib/db'
const getCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany()
    res.status(200).json(courses)
  } catch (err) {
    console.log(err)
  }
}

export default getCourses
