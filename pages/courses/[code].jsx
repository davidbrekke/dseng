import { getSession } from 'next-auth/react'
import Link from 'next/link'
import { prisma } from '@lib/db'
import Layout from '@components/layout'
import PageAnimate from '@components/PageAnimate'

export default function Courses({ user, course }) {
  return (
    <Layout user={user} title={course.code}>
      <PageAnimate classes="w-full h-full flex flex-col bg-gray-50 text-gray-800 font-bold items-center justify-center space-y-8 overflow-scroll">
        <h1 className="text-4xl text-center px-3">{course.title}</h1>
        <div className="flex items-center space-x-8">
          <h2 className="text-3xl text-gray-700">{course.code}</h2>
          <h3 className="text-red-800 text-2xl">{course.credits} credits</h3>
        </div>
        <div className="flex items-center space-x-8">
          <h3 className="text-red-800 text-xl">
            {course.required ? 'required' : 'elective'}
          </h3>
          <h2 className="text-xl text-gray-700">{course.clockHours} hours</h2>
        </div>
        <p className="text-xl text-gray-600">{course.description}</p>
        {user.role === 'advisor' && (
          <Link href={`/courses/edit/${course.code}`} passHref>
            <div className="px-4 py-2 rounded-lg shadow bg-red-800 text-gray-50 cursor-pointer hover:shadow-lg transition">
              edit
            </div>
          </Link>
        )}
      </PageAnimate>
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
