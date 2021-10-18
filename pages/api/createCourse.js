import { prisma } from '@lib/db'
const createCourse = async (req, res) => {
  try {
    const course = await prisma.course.create({
      data: req.body,
    })
    if (!course) {
      res.status(404)
    }
    res.status(200).json(course)
  } catch (err) {
    console.log('createCourse Error', err)
  }
}

export default createCourse
