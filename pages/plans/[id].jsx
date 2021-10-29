import { getSession } from 'next-auth/react'

import { prisma } from '@lib/db'
import PlanPage from '@components/PlanPage'

export default function Plan({ user, plan }) {
  return <PlanPage user={user} plan={plan} />
}

export async function getServerSideProps({ params, req, res }) {
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: '/landing',
        permanent: false,
      },
    }
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    const plan = await prisma.plan.findUnique({
      where: { id: params.id },
      include: {
        program: true,
        terms: {
          include: {
            courses: true,
          },
        },
      },
    })

    return {
      props: {
        user,
        plan,
      },
    }
  } catch (err) {
    console.error(err)
  }
}
