import { getSession } from 'next-auth/react'
import Link from 'next/link'
import { PlusIcon } from '@heroicons/react/solid'

import { prisma } from '@lib/db'
import Layout from '@components/layout'
import CourseCard from '@components/CourseCard'
import PageAnimate from '@components/PageAnimate'

export default function Courses({ user, courses }) {
  return (
    <Layout user={user} title="courses">
      <PageAnimate classes="w-full h-full flex flex-col bg-gray-50 items-center justify-left space-y-5 overflow-scroll">
        <div className="flex w-full items-center justify-center ">
          <h1 className="text-5xl mt-12 ml-12 font-bold text-gray-800 w-full">
            Courses
          </h1>
          {user.role === 'advisor' && (
            <Link href="/courses/new" passHref>
              <div className="flex items-center space-x-3 mr-10 text-red-800 transition px-4 py-2 rounded-lg font-bold shadow hover:text-gray-800 hover:shadow-xl cursor-pointer">
                <span>new</span>
                <PlusIcon width={30} />
              </div>
            </Link>
          )}
        </div>
        <div className="w-full p-10 flex flex-col md:flex-row items-center justify-center flex-wrap space-y-8 md:space-x-12">
          {courses.map((course, i) => (
            <CourseCard course={course} key={i} />
          ))}
        </div>
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

  const courses = await prisma.course.findMany()

  return {
    props: {
      user,
      courses,
    },
  }
}
