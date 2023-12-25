const Person = ({name, number, deletePerson}) => {
  return (
    <div>
      <p>
        {name} {number} 
        <button onClick={deletePerson}> remove</button>
      </p>
    </div>
  )
}

export default Person