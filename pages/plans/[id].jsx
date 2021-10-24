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

import {} from '@lib/courses'
import { prisma } from '@lib/db'
import Layout from '@components/layout'
import PageAnimate from '@components/PageAnimate'

export default function Plan({ user, plan }) {
  const router = useRouter()
  console.log(plan)

  return (
    <Layout user={user} title={plan.title}>
      <PageAnimate classes="w-full h-full flex flex-col bg-gray-50 text-gray-800 font-bold items-center justify-center space-y-8 overflow-scroll">
        <>
          <h1>{plan.title}</h1>
          <h2>{plan.program.name}</h2>
          <h2>{plan.program.code}</h2>
        </>
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

    const plan = await prisma.plan.findUnique({
      where: { id: params.id },
      include: {
        program: true,
      },
    })

    return {
      props: {
        user,
        plan,
      },
    }
  } catch (err) {
    console.error(err)
  }
}
