import Link from 'next/link'

const PlanCard = ({ plan }) => {
  return (
    <Link href={`/plans/${plan.id}`} passHref>
      <div className="p-5 rounded-lg shadow flex flex-col space-y-3 bg-white items-center font-bold cursor-pointer hover:shadow-xl transition">
        <h1 className="text-2xl text-gray-800">{plan.title}</h1>
      </div>
    </Link>
  )
}

export default PlanCard
