import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const allNames = persons.map(person => person.name)

    if(allNames.includes(newName)){
      alert(`${newName} name already added to phone book`)
    }else{
      const personObject = { name: newName }
      setPersons(persons.concat(personObject))
   }    
   
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input  
                  value={newName} 
                  onChange={handleNameChange}
                 />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>    
      {persons.map(person =>
          <Person key={person.name} name={person.name} />
        )}
    </div>
  )
}

export default App