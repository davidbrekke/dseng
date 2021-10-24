import { prisma } from '@lib/db'

const plans = async (req, res) => {
  // GET - send all plans
  if (req.method === 'GET') {
    try {
      const plans = await prisma.plan.findMany({
        include: {
          program: true,
        },
      })
      return res.json(plans)
    } catch (err) {
      console.log('plans GET Error', err)
    }
  }

  // POST - create new plsn
  if (req.method === 'POST') {
    try {
      const plan = await prisma.plan.create({
        data: req.body,
      })
      return res.json(plan)
    } catch (err) {
      console.log('plans POST Error', err)
    }
  }
  return res.status(400).json({ message: `${req.method} not supported` })
}

export default plans
