import { useState } from 'react'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { BackspaceIcon } from '@heroicons/react/outline'
import { useMutation } from 'react-query'
import axios from 'axios'
import Link from 'next/link'

import { useUpdateCourse } from '@lib/courses'
import { prisma } from '@lib/db'
import Layout from '@components/layout'
import PageAnimate from '@components/PageAnimate'

const EditCourse = ({ user, course }) => {
  const router = useRouter()

  const [title, setTitle] = useState(course.title)
  const [code, setCode] = useState(course.code)
  const [credits, setCredits] = useState(course.credits)
  const [clockHours, setClockHours] = useState(course.clockHours)
  const [required, setRequired] = useState(course.required)
  const [description, setDescription] = useState(course.description)

  const { status, mutateAsync: updateCourse } = useMutation(useUpdateCourse, {
    onSuccess: () => router.push(`/courses/${course.id}`),
  })

  const handleUpdate = (e) => {
    e.preventDefault()

    if (title != '' && code != '' && credits != null && clockHours != null) {
      try {
        updateCourse({
          id: course.id,
          title: title,
          code: code,
          credits: parseInt(credits),
          clockHours: parseInt(clockHours),
          required: required,
          description: description,
        })
      } catch (err) {
        console.log('handleUpdateCourseError', err)
      }
    }
  }

  return (
    <Layout user={user} title="edit course">
      <PageAnimate classes="w-full h-full flex flex-col bg-gray-50 items-center justify-left space-y-5 overflow-scroll">
        {status === 'loading' ? (
          `updating ${course.title}`
        ) : (
          <>
            <div className="flex w-full items-center justify-center ">
              <h1 className="text-5xl mt-12 ml-12 font-bold text-gray-800 w-full">
                edit course
              </h1>
            </div>
            <form className="w-full p-10 flex flex-col flex-items-2 space-y-6 items-center justify-center">
              <section className="flex flex-col space-x-0 space-y-6 md:flex-row md:space-x-6 md:space-y-0">
                <div className="bg-white p-4 rounded-lg text-gray-800 flex flex-col shadow space-y-4">
                  <label htmlFor="title" className="text-3xl ml-6 font-bold">
                    title
                  </label>
                  <input
                    type="text"
                    className="p-1 rounded-lg text-2xl border-2 border-gray-400 outline-none"
                    placeholder="title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="bg-white shadow p-4 rounded-lg text-gray-800 flex flex-col space-y-4">
                  <label htmlFor="code" className="text-3xl ml-6 font-bold">
                    code
                  </label>
                  <input
                    type="text"
                    className="p-1 rounded-lg text-2xl border-2 border-gray-400 outline-none"
                    placeholder="code..."
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
              </section>

              <section className="flex space-x-6 space-y-0">
                <div className="bg-white shadow p-4 rounded-lg text-gray-800 flex flex-col space-y-4">
                  <label htmlFor="credits" className="text-3xl font-bold">
                    credits
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="6"
                    className="p-1 rounded-lg text-2xl border-2 border-gray-400 outline-none"
                    placeholder="2"
                    value={credits}
                    onChange={(e) => setCredits(e.target.value)}
                  />
                </div>
                <div className="bg-white shadow p-4 rounded-lg text-gray-800 flex flex-col space-y-4">
                  <label htmlFor="clock hours" className="text-3xl font-bold">
                    clock hours
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="200"
                    className="p-1 rounded-lg text-2xl border-2 border-gray-400 outline-none"
                    placeholder="72"
                    value={clockHours}
                    onChange={(e) => setClockHours(e.target.value)}
                  />
                </div>
                <div className="bg-white shadow p-4 rounded-lg text-gray-800 flex items-center flex-col space-y-4">
                  <label htmlFor="required" className="text-3xl font-bold">
                    required
                  </label>
                  <input
                    type="checkbox"
                    className="p-1 rounded-lg text-2xl border-2 border-gray-400 outline-none"
                    checked={required}
                    onChange={(e) => setRequired(e.target.checked)}
                  />
                </div>
              </section>
              <div className="bg-white shadow p-4 rounded-lg text-gray-800 flex flex-col space-y-4">
                <label
                  htmlFor="description"
                  className="text-3xl font-bold ml-6"
                >
                  description
                </label>
                <textarea
                  type="text"
                  className="p-1 rounded-lg text-2xl border-2 border-gray-400 outline-none"
                  placeholder="description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <button
                className="px-4 py-2 shadow transition bg-red-800 text-gray-50 hover:shadow-xl rounded-lg font-bold"
                type="submit"
                onClick={handleUpdate}
              >
                update
              </button>
            </form>
          </>
        )}
      </PageAnimate>
    </Layout>
  )
}

export default EditCourse

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
    console.log(err)
  }
}
