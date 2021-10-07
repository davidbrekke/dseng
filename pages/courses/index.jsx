import { getSession } from 'next-auth/react'
import Link from 'next/link'

import { prisma } from '@lib/db'
import Layout from '@components/layout'
import CourseCard from '@components/CourseCard'

export default function Courses({ user, courses }) {
  return (
    <Layout user={user} title="courses">
      <section className="w-full h-full flex flex-col bg-gray-50 items-center justify-left space-y-5 overflow-scroll">
        <h1 className="text-5xl mt-10 font-bold text-gray-800 w-full justify-start ml-12">
          Courses
        </h1>
        <div className="w-full p-10 flex flex-row items-center justify-center flex-wrap space-y-10 space-x-12">
          {courses.map((course, i) => (
            <CourseCard course={course} key={i} />
          ))}
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

  const courses = await prisma.course.findMany()

  return {
    props: {
      user,
      courses,
    },
  }
}
