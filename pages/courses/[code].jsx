import { getSession } from 'next-auth/react'

import { prisma } from '@lib/db'
import Layout from '@components/layout'

export default function Courses({ user, course }) {
  return (
    <Layout user={user} title={course.code}>
      <section className="w-full h-full flex flex-col bg-gray-50 text-gray-800 font-bold items-center justify-center space-y-5 overflow-scroll">
        <h1 className="text-4xl text-center px-3">{course.title}</h1>
        <div className="flex items-center space-x-8">
          <h2 className="text-3xl text-gray-700">{course.code}</h2>
          <h3 className="text-red-800 text-2xl">{course.credits} credits</h3>
        </div>
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

  const course = await prisma.course.findUnique({
    where: { code: params.code },
  })

  return {
    props: {
      user,
      course,
    },
  }
}
