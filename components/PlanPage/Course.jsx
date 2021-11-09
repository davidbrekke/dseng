import { Draggable } from 'react-beautiful-dnd'

const Course = ({ course, index }) => {
  return (
    <Draggable draggableId={course.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          innerref={provided.innerRef}
          key={course.id}
          className={`px-2 py-1 m-2 rounded-lg text-gray-800 w-max cursor-pointer shadow hover:shadow-lg transition ${
            course.required
              ? 'bg-purple-400 hover:bg-purple-300'
              : 'bg-green-400 hover:bg-green-300'
          }`}
        >
          <h1 className="text-md">{course.title}</h1>
          <div className="flex justify-around items-center">
            <h2 className="text-sm">{course.code}</h2>
            <span> | </span>
            <h3 className="text-sm">{course.credits} credits</h3>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default Course
