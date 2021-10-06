import { getSession } from 'next-auth/react'

import { prisma } from '@lib/db'
import Layout from '@components/layout'

export default function App({ user }) {
  return (
    <Layout>
      <section className="w-full h-full flex flex-col items-center justify-center space-y-5">
        <h1>
          hello{' '}
          <span className="text-red-800">
            {user.name.split(',')[1].split(' ')[1]}
          </span>
          !
        </h1>
        <h2>you are a {user.role}!</h2>
      </section>
    </Layout>
  )
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
