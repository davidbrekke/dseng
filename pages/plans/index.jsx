import { getSession } from 'next-auth/react'

import { prisma } from '@lib/db'
import PlansPage from '@components/PlansPage'

export default function Plans({ user }) {
  return <PlansPage user={user} />
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

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  return {
    props: {
      user,
    },
  }
}
