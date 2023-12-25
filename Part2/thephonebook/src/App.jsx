import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Personform from './components/Personform'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
  .getAll()
  .then(initialPersons => {
    setPersons(initialPersons)
  })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const allNames = persons.map(person => person.name)

    if(allNames.includes(newName)){
      alert(`${newName} name already added to phone book`)
    }else{
      const personObject = { 
        name: newName, 
        number: newNumber,
        id: persons.length + 1 
      }
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
   }    

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }


  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const filteredPersons =  newFilter === '' ?  persons :  persons.filter(person => person.name.toLowerCase() === newFilter.toLowerCase())

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange}/>
      <h3>add a new</h3>
      <Personform 
        onSubmit={addPerson} 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
      />    
      <h3>Numbers</h3>    
      <Persons persons={filteredPersons}/>
    </div>
  )
}

export default App