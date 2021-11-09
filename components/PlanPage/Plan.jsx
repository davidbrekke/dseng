import { Droppable } from 'react-beautiful-dnd'

import { PlusIcon, SaveIcon } from '@heroicons/react/solid'
import { useMutation } from 'react-query'

import Course from './Course'
import { useCreateTerm } from '@lib/terms'

const Plan = ({ terms, plan }) => {
  const { status, mutateAsync: createTerm } = useMutation(useCreateTerm)

  const handleAdd = () => {
    const term = {
      year: 2021,
      season: 'fall',
      planId: plan.id,
    }
    try {
      createTerm(term)
    } catch (err) {
      console.log('handleCreateTermError', err)
    }
  }

  return (
    <div className="w-2/3 h-full ml-6 rounded-lg p-4 flex flex-row items-start justify-start space-x-3 bg-gray-100 overflow-scroll">
      {terms.map((term) => (
        <div key={term.id} className="p-2 rounded-lg bg-gray-200">
          <div className="flex items-center space-x-8 justify-around">
            <h1>{term.season}</h1>
            <h2>{term.year}</h2>
          </div>
          <Droppable droppableId={term.id}>
            {(provided) => (
              <div
                innerref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-col items-center"
              >
                {term.courses.map((course, i) => (
                  <Course key={course.id} course={course} index={i} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      ))}
      <Plus onClick={handleAdd} />
    </div>
  )
}

export default Plan

const Plus = ({ onClick }) => {
  return (
    <div className="flex items-center justify-center cursor-pointer p-1 rounded-lg bg-gray-200 hover:bg-gray-300 transition">
      <PlusIcon width={20} height={20} onClick={onClick} />
    </div>
  )
}
