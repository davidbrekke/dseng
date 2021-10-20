import { useState } from 'react'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BackspaceIcon } from '@heroicons/react/outline'
import { useMutation } from 'react-query'
import axios from 'axios'

import { useCreateCourse } from '@lib/courses'
import { prisma } from '@lib/db'
import Layout from '@components/layout'
import CourseCard from '@components/CourseCard'
import PageAnimate from '@components/PageAnimate'

export default function NewCourse({ user }) {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [code, setCode] = useState('')
  const [credits, setCredits] = useState(null)
  const [clockHours, setClockHours] = useState(null)
  const [required, setRequired] = useState(false)
  const [description, setDescription] = useState('')

  const { status, mutateAsync: createCourse } = useMutation(useCreateCourse, {
    onSuccess: () => router.push('/courses'),
  })

  const handleCreate = (e) => {
    e.preventDefault()
    if (title != '' && code != '' && credits != null && clockHours != null) {
      const course = {
        title: title,
        code: code,
        credits: parseInt(credits),
        clockHours: parseInt(clockHours),
        required: required,
        description: description,
      }
      try {
        createCourse(course)
      } catch (err) {
        console.log('handleCreateCourseError', err)
      }
    }
  }

  return (
    <Layout user={user} title="new course">
      <PageAnimate classes="w-full h-full flex flex-col bg-gray-50 items-center justify-start space-y-5 overflow-scroll">
        <div className="flex w-full items-center justify-center ">
          <h1 className="text-5xl mt-12 ml-12 font-bold text-gray-800 w-full">
            new course
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
                required
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
                required
              />
            </div>
          </section>
          <section className="flex space-x-6 space-y-0">
            <div className="bg-white shadow p-4 rounded-lg text-gray-800 flex flex-col space-y-4 transition">
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
                required
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
                required
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
            <label htmlFor="description" className="text-3xl font-bold ml-6">
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
            onClick={handleCreate}
            className="px-4 py-2 shadow transition bg-red-800 text-gray-50 hover:shadow-xl rounded-lg font-bold"
            disabled={status === 'loading'}
            type="submit"
          >
            create
          </button>
        </form>
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

  return {
    props: {
      user,
    },
  }
}
