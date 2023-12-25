const Total = ({course}) =>{
  const total = course.parts.reduce(function(sum, part){
      return sum + part.exercises
  }, 0)
  return (
    <div>
      <p>Number of exercises {total}</p> 
    </div>
  )
}

export default Total