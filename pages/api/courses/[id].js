import { prisma } from '@lib/db'

const course = async (req, res) => {
  //   GET - get course by id
  if (req.method === 'GET') {
    try {
      const course = await prisma.course.findUnique({
        where: { id: req.query.id },
      })
      return res.json(course)
    } catch (err) {
      console.log('course GET Error', err)
    }
  }

  //   DELETE - delete course by id
  if (req.method === 'DELETE') {
    try {
      const course = await prisma.course.delete({
        where: { id: req.query.id },
      })
      return res.json(course)
    } catch (err) {
      console.log('course DELETE Error', err)
    }
  }

  // PUT - update course by id
  if (req.method === 'PUT') {
    try {
      const course = await prisma.course.update({
        where: { id: req.query.id },
        data: req.body,
      })
      return res.json(course)
    } catch (err) {
      console.log('course UPDATE Error', err)
    }
  }
  return res.status(400).json({ message: `${req.method} not supported` })
}

export default course
