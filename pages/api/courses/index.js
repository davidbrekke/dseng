import { prisma } from '@lib/db'

const courses = async (req, res) => {
  // GET - send all courses
  if (req.method === 'GET') {
    try {
      const courses = await prisma.course.findMany()
      return res.json(courses)
    } catch (err) {
      console.log('courses GET Error', err)
    }
  }

  // POST - create new course
  if (req.method === 'POST') {
    try {
      const course = await prisma.course.create({
        data: req.body,
      })
      return res.json(course)
    } catch (err) {
      console.log('courses POST Error', err)
    }
  }
  return res.status(400).json({ message: `${req.method} not supported` })
}

export default courses
