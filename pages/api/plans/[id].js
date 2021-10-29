import { prisma } from '@lib/db'

const plan = async (req, res) => {
  //   GET - get plan by id
  if (req.method === 'GET') {
    try {
      const plan = await prisma.plan.findUnique({
        where: { id: req.query.id },
        include: {
          user: true,
      }})
      return res.json(plan)
    } catch (err) {
      console.log('plan GET Error', err)
    }
  }

  //   DELETE - delete plan by id
  if (req.method === 'DELETE') {
    try {
      const plan = await prisma.plan.delete({
        where: { id: req.query.id },
      })
      return res.json(plan)
    } catch (err) {
      console.log('plan DELETE Error', err)
    }
  }

  // PUT - update plan by id
  if (req.method === 'PUT') {
    try {
      const plan = await prisma.plan.update({
        where: { id: req.query.id },
        data: req.body,
      })
      return res.json(plan)
    } catch (err) {
      console.log('plan UPDATE Error', err)
    }
  }
  return res.status(400).json({ message: `${req.method} not supported` })
}

export default plan
