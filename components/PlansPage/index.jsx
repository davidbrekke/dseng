import { getSession } from 'next-auth/react'
import Link from 'next/link'
import { PlusIcon } from '@heroicons/react/solid'
import { useQuery } from 'react-query'

import Layout from '@components/layout'
import PlanCard from '@components/PlanCard'
import PageAnimate from '@components/PageAnimate'
import { useGetPlans } from '@lib/plans'

export default function PlansPage({ user }) {
  const {
    data: plans,
    isLoading,
    isError,
    error,
  } = useQuery('plans', useGetPlans)
  return (
    <Layout user={user} title="plans">
      <PageAnimate classes="w-full h-full flex flex-col bg-gray-50 items-center justify-left space-y-5 overflow-scroll">
        <div className="flex w-full items-center justify-center ">
          <h1 className="text-5xl mt-12 ml-12 font-bold text-gray-800 w-full">
            Plans
          </h1>
          {user.role === 'advisor' && (
            <Link href="/plans" passHref>
              <div className="flex items-center space-x-3 mr-10 text-red-800 transition px-4 py-2 rounded-lg font-bold shadow hover:text-gray-800 hover:shadow-xl cursor-pointer">
                <span>new</span>
                <PlusIcon width={30} />
              </div>
            </Link>
          )}
        </div>
        <div className="w-full p-10 flex flex-col md:flex-row items-center justify-center flex-wrap space-y-8 md:space-x-12">
          {isLoading && '...loading'}
          {isError && error.message}
          {plans && plans.map((plan, i) => <PlanCard plan={plan} key={i} />)}
        </div>
      </PageAnimate>
    </Layout>
  )
}
