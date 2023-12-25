import Course from './components/Course'

const App = () => {
  const course = {
    courseid: 1,
    name: 'Half Stack application development',
    parts: [
      { 
        partid: 1,
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        partid: 2,
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        partid: 3,
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
   
 
  return (
    <div>
       <Course course={course}/>
    </div>
  )
}

export default App