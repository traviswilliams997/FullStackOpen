const Total = ({course}) =>{
  const total = course.parts.reduce(function(sum, part){
      return sum + part.exercises
  }, 0)
  return (
    <div>
      <p> <strong>Number of exercises {total}</strong></p> 
    </div>
  )
}

export default Total