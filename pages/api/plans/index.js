import { prisma } from '@lib/db'

const plans = async (req, res) => {
  // GET - send all plans
  if (req.method === 'GET') {
    try {
      const plans = await prisma.plan.findMany()
      return res.json(plans)
    } catch (err) {
      console.log('plans GET Error', err)
    }
  }

  // // POST - create new course
  // if (req.method === 'POST') {
  //   try {
  //     const course = await prisma.course.create({
  //       data: req.body,
  //     })
  //     return res.json(course)
  //   } catch (err) {
  //     console.log('courses POST Error', err)
  //   }
  // }
  // return res.status(400).json({ message: `${req.method} not supported` })
}

export default plans
