import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Personform from './components/Personform'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
      setPersons(persons.concat(personObject))
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