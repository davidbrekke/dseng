import { DragDropContext } from 'react-beautiful-dnd'
import Layout from '@components/layout'
import PageAnimate from '@components/PageAnimate'
import Plan from './Plan'
import CourseList from './CourseList'

export default function PlanPage({ user, plan }) {
  const onDragEnd = () => {}
  return (
    <Layout user={user} title={plan.title}>
      <PageAnimate classes="w-full max-h-screen flex flex-col bg-gray-50 text-gray-800 font-bold items-center justify-start space-y-8 overflow-scroll">
        <header className="flex items-center w-full justify-around mt-10 sticky">
          <h1 className="text-4xl text-gray-800">{plan.title}</h1>
          <div>
            <h2 className="text-lg text-red-800">{plan.program.code}</h2>
            <h2 className="text-md text-gray-700">{plan.program.name}</h2>
          </div>
        </header>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex flex-row justify-around h-full w-full">
            <Plan terms={plan.terms} plan={plan} />
            <CourseList />
          </div>
        </DragDropContext>
      </PageAnimate>
    </Layout>
  )
}
