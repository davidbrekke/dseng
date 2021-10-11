import { prisma } from '@lib/db'
const updateCourse = async (req, res) => {
  try {
    const course = await prisma.course.update({
      where: {
        id: req.body.id,
      },
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

export default updateCourse
