import { useState } from 'react'
import { getSession } from 'next-auth/react'
import { BackspaceIcon } from '@heroicons/react/outline'

import Link from 'next/link'
import { prisma } from '@lib/db'
import Layout from '@components/layout'
import PageAnimate from '@components/PageAnimate'

const EditCourse = ({ user, course }) => {
  const [title, setTitle] = useState(course.title)
  const [code, setCode] = useState(course.code)
  const [credits, setCredits] = useState(course.credits)
  const [clockHours, setClockHours] = useState(course.clockHours)
  const [required, setRequired] = useState(course.required)
  const [description, setDescription] = useState(course.description)

  const handleUpdate = () => {
    if (title != '' && code != '' && credits != null && clockHours != null) {
      // TODO: update course
      alert(`title: ${title}`)
    }
  }

  return (
    <Layout user={user} title="edit course">
      <PageAnimate classes="w-full h-full flex flex-col bg-gray-50 items-center justify-left space-y-5 overflow-scroll">
        <div className="flex w-full items-center justify-center ">
          <h1 className="text-5xl mt-12 ml-12 font-bold text-gray-800 w-full">
            edit course
          </h1>
        </div>
        <div className="w-full p-10 flex flex-col md:flex-row md:space-x-8 items-center justify-center md:flex-wrap">
          <div className="bg-white p-4 rounded-lg text-gray-800 flex flex-col shadow space-y-4">
            <label htmlFor="title" className="text-3xl ml-6 font-bold">
              title
            </label>
            <input
              type="text"
              className="p-1 rounded text-2xl border"
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
              className="p-1 rounded text-2xl border"
              placeholder="code..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full p-10 flex flex-col md:flex-row md:space-x-8 items-center justify-center md:flex-wrap">
          <div className="bg-white shadow p-4 rounded-lg text-gray-800 flex flex-col space-y-4">
            <label htmlFor="credits" className="text-3xl font-bold">
              credits
            </label>
            <input
              type="number"
              min="0"
              max="6"
              className="p-1 rounded text-2xl border"
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
              className="p-1 rounded text-2xl border"
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
              className="p-1 rounded text-2xl"
              checked={required}
              onChange={(e) => setRequired(e.target.checked)}
            />
          </div>
        </div>
        <div className="bg-white shadow p-4 rounded-lg text-gray-800 flex flex-col space-y-4">
          <label htmlFor="description" className="text-3xl font-bold ml-6">
            description
          </label>
          <textarea
            type="text"
            className="p-1 rounded text-2xl border"
            placeholder="description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          onClick={handleUpdate}
          className="px-4 py-2 shadow transition bg-red-800 text-gray-50 hover:shadow-xl rounded-lg font-bold"
        >
          update
        </button>
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
