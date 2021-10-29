import { prisma } from '@lib/db'

const terms = async (req, res) => {
  // GET - send all terms
  if (req.method === 'GET') {
    try {
      const terms = await prisma.term.findMany({
        include: {
          courses: true,
        },
      })
      return res.json(terms)
    } catch (err) {
      console.log('terms GET Error', err)
    }
  }

  // POST - create new term
  if (req.method === 'POST') {
    try {
      const term = await prisma.term.create({
        data: req.body,
      })
      return res.json(term)
    } catch (err) {
      console.log('term POST Error', err)
    }
  }
  return res.status(400).json({ message: `${req.method} not supported` })
}

export default terms
