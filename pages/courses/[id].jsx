import { getSession } from 'next-auth/react'
import Link from 'next/link'
import {
  TrashIcon,
  PencilAltIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/solid'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import axios from 'axios'

import { useDeleteCourse } from '@lib/courses'
import { prisma } from '@lib/db'
import Layout from '@components/layout'
import PageAnimate from '@components/PageAnimate'

export default function Course({ user, course }) {
  const router = useRouter()

  const { status, mutateAsync: deleteCourse } = useMutation(useDeleteCourse, {
    onSuccess: () => router.push(`/courses`),
  })

  const handleDelete = () => {
    try {
      confirm(`Are you sure you want to delete ${course.title}`) &&
        deleteCourse(course)
    } catch (err) {
      console.log('handleDeleteCourseError', err)
    }
  }

  return (
    <Layout user={user} title={course.code}>
      <PageAnimate classes="w-full h-full flex flex-col bg-gray-50 text-gray-800 font-bold items-center justify-center space-y-8 overflow-scroll">
        {status === 'loading' ? (
          `deleting ${course.title}`
        ) : (
          <>
            <h1 className="text-4xl text-center px-3">{course.title}</h1>
            <div className="flex items-center space-x-8">
              <h2 className="text-3xl text-gray-700">{course.code}</h2>
              <h3 className="text-red-800 text-2xl">
                {course.credits} credits
              </h3>
            </div>
            <div className="flex items-center space-x-8">
              {course.required && (
                <ExclamationCircleIcon width={30} className="text-green-700" />
              )}
              <h2 className="text-xl text-gray-700">
                {course.clockHours} hours
              </h2>
            </div>
            <p className="text-xl text-gray-600">{course.description}</p>
            {user.role === 'advisor' && (
              <div className="flex flex-row items-center justify-center space-x-8">
                <Link href={`/courses/edit/${course.id}`} passHref>
                  <div className="p-2 rounded-lg shadow text-red-800 cursor-pointer hover:shadow-lg hover:text-gray-800 transition">
                    <PencilAltIcon width={25} />
                  </div>
                </Link>
                <button
                  onClick={handleDelete}
                  className="p-2 rounded-lg shadow bg-red-800 cursor-pointer hover:shadow-lg text-gray-50 transition"
                >
                  <TrashIcon width={25} />
                </button>
              </div>
            )}
          </>
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

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    const course = await prisma.course.findUnique({
      where: { id: params.id },
    })

    return {
      props: {
        user,
        course,
      },
    }
  } catch (err) {
    console.error(err)
  }
}
